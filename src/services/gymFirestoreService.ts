/**
 * Firestore Service Layer for PulseFit Gym Management Portal
 * Implements Day 3 NoSQL Schemas and Error-Handled Operations
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  FirestoreMember,
  FirestoreTrainer,
  FirestoreMembershipPlan,
  FirestoreAnnouncement,
  FirestoreEnrollmentRequest,
  FirestoreUser,
} from '../types';
import { MEMBERSHIP_PLANS, TRAINERS, GYM_ANNOUNCEMENTS } from '../data/gymData';

// Collection path constants matching Day 3 Architecture
export const COLLECTIONS = {
  USERS: 'users',
  MEMBERS: 'members',
  TRAINERS: 'trainers',
  MEMBERSHIP_PLANS: 'membership_plans',
  ANNOUNCEMENTS: 'announcements',
  ENROLLMENT_REQUESTS: 'enrollment_requests',
} as const;

/**
 * 1. MEMBERSHIP PLANS
 */
export async function getMembershipPlans(): Promise<FirestoreMembershipPlan[]> {
  try {
    const plansCol = collection(db, COLLECTIONS.MEMBERSHIP_PLANS);
    const q = query(plansCol, orderBy('tier_pricing_rate_value', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Return default blueprint seed if remote collection is empty
      return MEMBERSHIP_PLANS.map((p, idx) => ({
        plan_id: p.id,
        package_title_string: p.name,
        tier_pricing_rate_value: p.price,
        expiration_cycle_duration_months: 1,
        feature_entitlements_list_arrays: p.features,
        currency_code: 'USD',
        description: p.tagline,
        popular_flag: Boolean(p.popular),
        active_status: 'active' as const,
        display_order: idx + 1,
      }));
    }

    return snapshot.docs.map((d) => d.data() as FirestoreMembershipPlan);
  } catch (error) {
    console.warn('Falling back to local plans data due to Firestore read state:', error);
    return MEMBERSHIP_PLANS.map((p, idx) => ({
      plan_id: p.id,
      package_title_string: p.name,
      tier_pricing_rate_value: p.price,
      expiration_cycle_duration_months: 1,
      feature_entitlements_list_arrays: p.features,
      currency_code: 'USD',
      description: p.tagline,
      popular_flag: Boolean(p.popular),
      active_status: 'active' as const,
      display_order: idx + 1,
    }));
  }
}

/**
 * 2. TRAINERS
 */
export async function getTrainers(): Promise<FirestoreTrainer[]> {
  try {
    const trainersCol = collection(db, COLLECTIONS.TRAINERS);
    const snapshot = await getDocs(trainersCol);

    if (snapshot.empty) {
      return TRAINERS.map((t) => ({
        trainer_id: t.id,
        certified_coach_display_name: t.name,
        core_specialization_tags: [t.specialization, t.role],
        assigned_workout_slots_arrays: [
          {
            slot_id: `slot-${t.id}-1`,
            day_of_week: 'Monday',
            start_time: '06:00',
            end_time: '14:00',
            slot_status: 'active',
          },
        ],
        maximum_capacity_limits: 25,
        tracking_status_activity_flag: true,
        experience_years: parseInt(t.experience) || 5,
        bio: t.bio,
        photo_url: t.avatarUrl,
      }));
    }

    return snapshot.docs.map((d) => d.data() as FirestoreTrainer);
  } catch (error) {
    console.warn('Falling back to local trainer data due to Firestore read state:', error);
    return TRAINERS.map((t) => ({
      trainer_id: t.id,
      certified_coach_display_name: t.name,
      core_specialization_tags: [t.specialization, t.role],
      assigned_workout_slots_arrays: [],
      maximum_capacity_limits: 25,
      tracking_status_activity_flag: true,
      experience_years: parseInt(t.experience) || 5,
      bio: t.bio,
      photo_url: t.avatarUrl,
    }));
  }
}

/**
 * 3. ANNOUNCEMENTS
 */
export async function getAnnouncements(): Promise<FirestoreAnnouncement[]> {
  try {
    const annCol = collection(db, COLLECTIONS.ANNOUNCEMENTS);
    const snapshot = await getDocs(annCol);

    if (snapshot.empty) {
      return GYM_ANNOUNCEMENTS.map((a) => ({
        announcement_id: a.id,
        title: a.title,
        release_timestamp_date: new Date(),
        warning_alert_message_body: a.message,
        publisher_clearance_level_role: 'admin',
        baseline_visibility_scope_flag: true,
        audience: 'all_members',
        publication_status: 'published' as const,
      }));
    }

    return snapshot.docs.map((d) => d.data() as FirestoreAnnouncement);
  } catch (error) {
    console.warn('Falling back to local announcements due to Firestore read state:', error);
    return GYM_ANNOUNCEMENTS.map((a) => ({
      announcement_id: a.id,
      title: a.title,
      release_timestamp_date: new Date(),
      warning_alert_message_body: a.message,
      publisher_clearance_level_role: 'admin',
      baseline_visibility_scope_flag: true,
      audience: 'all_members',
      publication_status: 'published' as const,
    }));
  }
}

/**
 * 4. ENROLLMENT REQUEST WORKFLOW
 * Follows Section 11.3 & 11.4 of the Day 3 specification
 */
export async function submitEnrollmentRequest(params: {
  fullName: string;
  email: string;
  phone: string;
  planId: string;
  preferredTrainerId?: string | null;
  preferredWorkoutSlot?: Record<string, any> | null;
  fitnessGoal?: string | null;
}): Promise<{ success: boolean; requestId: string }> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const path = `${COLLECTIONS.ENROLLMENT_REQUESTS}/${requestId}`;

  const requestPayload: FirestoreEnrollmentRequest = {
    request_id: requestId,
    full_name: params.fullName.trim(),
    contact_email: params.email.trim().toLowerCase(),
    contact_phone_string: params.phone.trim(),
    selected_membership_plan_id: params.planId,
    preferred_trainer_id: params.preferredTrainerId || null,
    preferred_workout_slot: params.preferredWorkoutSlot || null,
    fitness_goal: params.fitnessGoal?.trim() || null,
    validation_status: 'submitted',
    submitted_at: serverTimestamp(),
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, COLLECTIONS.ENROLLMENT_REQUESTS, requestId), requestPayload);
    return { success: true, requestId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * 5. MEMBER PROFILE
 * Authoritative record mapped by Firebase Auth UID (Section 5.1 & 13.2)
 */
export async function getMemberProfile(memberId: string): Promise<FirestoreMember | null> {
  const path = `${COLLECTIONS.MEMBERS}/${memberId}`;
  try {
    const memberDoc = await getDoc(doc(db, COLLECTIONS.MEMBERS, memberId));
    if (memberDoc.exists()) {
      return memberDoc.data() as FirestoreMember;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function createOrUpdateMemberProfile(member: FirestoreMember): Promise<void> {
  const path = `${COLLECTIONS.MEMBERS}/${member.member_id}`;
  try {
    await setDoc(
      doc(db, COLLECTIONS.MEMBERS, member.member_id),
      {
        ...member,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * 6. USER RECORD
 * Supporting collection linking Auth UID with application role
 */
export async function syncUserRecord(user: FirestoreUser): Promise<void> {
  const path = `${COLLECTIONS.USERS}/${user.uid}`;
  try {
    await setDoc(
      doc(db, COLLECTIONS.USERS, user.uid),
      {
        ...user,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserRecord(uid: string): Promise<FirestoreUser | null> {
  const path = `${COLLECTIONS.USERS}/${uid}`;
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    if (userDoc.exists()) {
      return userDoc.data() as FirestoreUser;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * 7. TRAINER PROFILE
 * Authoritative record mapped by Firebase Auth UID for coach roles
 */
export async function getTrainerProfile(trainerId: string): Promise<FirestoreTrainer | null> {
  const path = `${COLLECTIONS.TRAINERS}/${trainerId}`;
  try {
    const trainerDoc = await getDoc(doc(db, COLLECTIONS.TRAINERS, trainerId));
    if (trainerDoc.exists()) {
      return trainerDoc.data() as FirestoreTrainer;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function createOrUpdateTrainerProfile(trainer: FirestoreTrainer): Promise<void> {
  const path = `${COLLECTIONS.TRAINERS}/${trainer.trainer_id}`;
  try {
    await setDoc(
      doc(db, COLLECTIONS.TRAINERS, trainer.trainer_id),
      {
        ...trainer,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * SEEDING UTILITY
 * Initializes the default membership plans, coaches, and announcements in Firestore
 * when administrative setup or initial sync is invoked.
 */
export async function seedDefaultGymDataToFirestore(): Promise<{ seeded: boolean; message: string }> {
  try {
    const plansCol = collection(db, COLLECTIONS.MEMBERSHIP_PLANS);
    const existingPlans = await getDocs(plansCol);

    if (!existingPlans.empty) {
      return { seeded: false, message: 'Firestore already contains membership plans.' };
    }

    // Seed Plans
    for (let i = 0; i < MEMBERSHIP_PLANS.length; i++) {
      const p = MEMBERSHIP_PLANS[i];
      const planDoc: FirestoreMembershipPlan = {
        plan_id: p.id,
        package_title_string: p.name,
        tier_pricing_rate_value: p.price,
        expiration_cycle_duration_months: 1,
        feature_entitlements_list_arrays: p.features,
        currency_code: 'USD',
        description: p.tagline,
        popular_flag: Boolean(p.popular),
        active_status: 'active',
        display_order: i + 1,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        created_by: 'system_admin',
      };
      await setDoc(doc(db, COLLECTIONS.MEMBERSHIP_PLANS, p.id), planDoc);
    }

    // Seed Trainers
    for (const t of TRAINERS) {
      const trainerDoc: FirestoreTrainer = {
        trainer_id: t.id,
        certified_coach_display_name: t.name,
        core_specialization_tags: [t.specialization, t.role],
        assigned_workout_slots_arrays: [
          {
            slot_id: `slot-${t.id}-1`,
            day_of_week: 'Monday',
            start_time: '06:00',
            end_time: '14:00',
            slot_status: 'active',
          },
        ],
        maximum_capacity_limits: 25,
        tracking_status_activity_flag: true,
        experience_years: parseInt(t.experience) || 6,
        bio: t.bio,
        photo_url: t.avatarUrl,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      await setDoc(doc(db, COLLECTIONS.TRAINERS, t.id), trainerDoc);
    }

    // Seed Announcements
    for (const a of GYM_ANNOUNCEMENTS) {
      const annDoc: FirestoreAnnouncement = {
        announcement_id: a.id,
        title: a.title,
        release_timestamp_date: serverTimestamp(),
        warning_alert_message_body: a.message,
        publisher_clearance_level_role: 'admin',
        baseline_visibility_scope_flag: true,
        audience: 'all_members',
        publication_status: 'published',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        created_by: 'system_admin',
      };
      await setDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, a.id), annDoc);
    }

    return { seeded: true, message: 'Default gym collections successfully synchronized to Firestore!' };
  } catch (error) {
    console.error('Failed to seed default gym data to Firestore:', error);
    throw error;
  }
}
