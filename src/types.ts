/**
 * Core Data Types for Gym Management Portal
 * Day 2 Frontend Prototype
 */

export type MembershipTier = 'Basic' | 'Premium' | 'Elite';

export interface MembershipPlan {
  id: string;
  name: MembershipTier;
  tagline: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  colorTheme: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  availability: string;
  availableToday: boolean;
  avatarUrl: string;
  badge?: string;
  bio: string;
}

export interface WorkoutSlot {
  id: string;
  label: string;
  time: string;
  category: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  capacityStatus: 'Available' | 'Filling Fast' | 'Limited';
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  membershipPlan: MembershipTier;
  preferredTrainerId: string;
  preferredSlotId: string;
  fitnessGoal: string;
}

export interface EnrollmentErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  membershipPlan?: string;
  preferredSlotId?: string;
}

export type DashboardRole = 'member' | 'admin' | 'trainer';

export interface RecentRegistration {
  id: string;
  memberName: string;
  plan: MembershipTier;
  date: string;
  status: 'Approved' | 'Reviewing';
  assignedTrainer: string;
}

export interface ScheduledSession {
  id: string;
  title: string;
  time: string;
  trainerOrMember: string;
  room: string;
  status: 'Confirmed' | 'Upcoming';
}

export interface GymAnnouncement {
  id: string;
  title: string;
  date: string;
  tag: string;
  message: string;
}

// ==========================================
// Authoritative Firestore Day 3 Schema Types
// ==========================================

export interface FirestoreUser {
  uid: string;
  display_name: string;
  email: string;
  role: 'member' | 'trainer' | 'admin';
  linked_entity_id?: string;
  active_status: boolean;
  created_at?: any;
  updated_at?: any;
}

export interface FirestoreMember {
  member_id: string;
  full_name: string;
  authentication_email_source: string;
  contact_phone_string: string;
  selected_membership_tier: string;
  enrollment_timestamp_date: any;
  baseline_attendance_active_status_boolean: boolean;
  registration_validation_payload_object: Record<string, any>;
  created_at?: any;
  updated_at?: any;
  created_by?: string;
  updated_by?: string;
}

export interface FirestoreTrainer {
  trainer_id: string;
  certified_coach_display_name: string;
  core_specialization_tags: string[];
  assigned_workout_slots_arrays: Array<{
    slot_id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    slot_status: string;
  }>;
  maximum_capacity_limits: number;
  tracking_status_activity_flag: boolean;
  experience_years?: number;
  bio?: string;
  photo_url?: string;
  contact_email?: string;
  created_at?: any;
  updated_at?: any;
}

export interface FirestoreMembershipPlan {
  plan_id: string;
  package_title_string: string;
  tier_pricing_rate_value: number;
  expiration_cycle_duration_months: number;
  feature_entitlements_list_arrays: string[];
  currency_code?: string;
  description?: string;
  popular_flag?: boolean;
  active_status?: 'active' | 'inactive' | 'archived';
  display_order?: number;
  created_at?: any;
  updated_at?: any;
  created_by?: string;
}

export interface FirestoreAnnouncement {
  announcement_id: string;
  title?: string;
  release_timestamp_date: any;
  warning_alert_message_body: string;
  publisher_clearance_level_role: string;
  baseline_visibility_scope_flag: boolean;
  audience?: string;
  publication_status?: 'draft' | 'published' | 'archived';
  created_at?: any;
  updated_at?: any;
  created_by?: string;
}

export interface FirestoreEnrollmentRequest {
  request_id: string;
  full_name: string;
  contact_email: string;
  contact_phone_string: string;
  selected_membership_plan_id: string;
  preferred_trainer_id: string | null;
  preferred_workout_slot: Record<string, any> | null;
  fitness_goal: string | null;
  validation_status: 'submitted' | 'validated' | 'under_review' | 'approved' | 'rejected';
  submitted_at: any;
  reviewed_at?: any;
  reviewed_by?: string;
  created_at?: any;
  updated_at?: any;
}

