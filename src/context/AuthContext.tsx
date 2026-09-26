/**
 * Firebase Authentication and Role Context
 * Implements Section 13 & 14 of the Day 3 Architecture
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import {
  getUserRecord,
  syncUserRecord,
  getMemberProfile,
  createOrUpdateMemberProfile,
  getTrainerProfile,
  createOrUpdateTrainerProfile,
} from '../services/gymFirestoreService';
import { FirestoreMember, FirestoreTrainer, FirestoreUser } from '../types';

export interface SignUpParams {
  email: string;
  password: string;
  displayName: string;
  role: 'member' | 'trainer' | 'admin';
  phone?: string;
  // Role-specific fields
  membershipTier?: string;
  fitnessGoal?: string;
  specialization?: string;
  experienceYears?: number;
  bio?: string;
  adminPasscode?: string;
}

export interface AuthModalState {
  isOpen: boolean;
  mode: 'login' | 'register';
  defaultRole: 'member' | 'trainer' | 'admin';
}

interface AuthContextType {
  currentUser: User | null;
  userRecord: FirestoreUser | null;
  memberProfile: FirestoreMember | null;
  trainerProfile: FirestoreTrainer | null;
  role: 'member' | 'trainer' | 'admin';
  loading: boolean;
  isAdmin: boolean;
  isTrainer: boolean;
  isMember: boolean;
  authModalState: AuthModalState;
  openAuthModal: (mode?: 'login' | 'register', defaultRole?: 'member' | 'trainer' | 'admin') => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (params: SignUpParams) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRecord, setUserRecord] = useState<FirestoreUser | null>(null);
  const [memberProfile, setMemberProfile] = useState<FirestoreMember | null>(null);
  const [trainerProfile, setTrainerProfile] = useState<FirestoreTrainer | null>(null);
  const [role, setRole] = useState<'member' | 'trainer' | 'admin'>('member');
  const [loading, setLoading] = useState<boolean>(true);

  const [authModalState, setAuthModalState] = useState<AuthModalState>({
    isOpen: false,
    mode: 'login',
    defaultRole: 'member',
  });

  const openAuthModal = (mode: 'login' | 'register' = 'login', defaultRole: 'member' | 'trainer' | 'admin' = 'member') => {
    setAuthModalState({
      isOpen: true,
      mode,
      defaultRole,
    });
  };

  const closeAuthModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const isAdmin =
    role === 'admin' ||
    currentUser?.email === 'anirudhyad54@gmail.com';

  const isTrainer = role === 'trainer';
  const isMember = role === 'member';

  const loadUserData = async (user: User) => {
    try {
      const isBootstrapAdmin = user.email === 'anirudhyad54@gmail.com';

      // 1. Fetch or ensure users/{uid}
      let existingUser = await getUserRecord(user.uid);
      if (!existingUser) {
        const newUser: FirestoreUser = {
          uid: user.uid,
          display_name: user.displayName || user.email?.split('@')[0] || 'Athlete',
          email: user.email || '',
          role: isBootstrapAdmin ? 'admin' : 'member',
          active_status: true,
        };
        await syncUserRecord(newUser);
        existingUser = newUser;
      }

      const assignedRole = isBootstrapAdmin ? 'admin' : existingUser.role || 'member';
      setRole(assignedRole);
      setUserRecord(existingUser);

      // 2. Fetch role-specific document
      if (assignedRole === 'trainer') {
        const existingTrainer = await getTrainerProfile(user.uid);
        if (existingTrainer) {
          setTrainerProfile(existingTrainer);
        } else {
          // Initialize trainer doc
          const newTrainer: FirestoreTrainer = {
            trainer_id: user.uid,
            certified_coach_display_name: user.displayName || 'Certified Coach',
            core_specialization_tags: ['Functional Strength', 'Conditioning'],
            assigned_workout_slots_arrays: [
              {
                slot_id: `slot-${user.uid}-1`,
                day_of_week: 'Monday',
                start_time: '07:00',
                end_time: '15:00',
                slot_status: 'active',
              },
            ],
            maximum_capacity_limits: 25,
            tracking_status_activity_flag: true,
            experience_years: 4,
            bio: 'PulseFit verified performance coach.',
            contact_email: user.email || '',
          };
          await createOrUpdateTrainerProfile(newTrainer);
          setTrainerProfile(newTrainer);
        }
      } else {
        // Member or Admin member profile
        const existingMember = await getMemberProfile(user.uid);
        if (existingMember) {
          setMemberProfile(existingMember);
        } else if (assignedRole === 'member' || isBootstrapAdmin) {
          const newMember: FirestoreMember = {
            member_id: user.uid,
            full_name: user.displayName || 'PulseFit Member',
            authentication_email_source: user.email || '',
            contact_phone_string: '(555) 000-0000',
            selected_membership_tier: 'Premium',
            enrollment_timestamp_date: new Date(),
            baseline_attendance_active_status_boolean: true,
            registration_validation_payload_object: {
              source: 'firebase_auth_login',
              validation_status: 'approved',
            },
          };
          await createOrUpdateMemberProfile(newMember);
          setMemberProfile(newMember);
        }
      }
    } catch (err) {
      console.warn('Error synchronizing user profile with Firestore:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserData(user);
      } else {
        setUserRecord(null);
        setMemberProfile(null);
        setTrainerProfile(null);
        setRole('member');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        await loadUserData(res.user);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (res.user) {
        await loadUserData(res.user);
      }
    } catch (error) {
      console.error('Email sign-in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (params: SignUpParams) => {
    try {
      setLoading(true);

      // Verify admin passcode if attempting to register as Admin
      if (params.role === 'admin') {
        const isAdminAuthorized =
          params.email.trim().toLowerCase() === 'anirudhyad54@gmail.com' ||
          params.adminPasscode?.trim() === 'PULSEFIT_ADMIN_2025' ||
          params.adminPasscode?.trim() === 'ADMIN2025';

        if (!isAdminAuthorized) {
          throw new Error(
            'Unauthorized admin registration. Please provide a valid Administrative Security Passcode or register under your authorized admin email.'
          );
        }
      }

      // 1. Create Firebase Auth user
      const res = await createUserWithEmailAndPassword(auth, params.email.trim(), params.password);
      const user = res.user;

      // 2. Set Firebase Auth Display Name
      await updateProfile(user, {
        displayName: params.displayName.trim(),
      });

      // 3. Create Firestore authoritative user record
      const newUser: FirestoreUser = {
        uid: user.uid,
        display_name: params.displayName.trim(),
        email: params.email.trim().toLowerCase(),
        role: params.role,
        active_status: true,
      };
      await syncUserRecord(newUser);
      setUserRecord(newUser);
      setRole(params.role);

      // 4. Create role-specific entity record
      if (params.role === 'trainer') {
        const newTrainer: FirestoreTrainer = {
          trainer_id: user.uid,
          certified_coach_display_name: params.displayName.trim(),
          core_specialization_tags: params.specialization?.trim()
            ? [params.specialization.trim(), 'Certified Coach']
            : ['Strength & Conditioning', 'Functional Athleticism'],
          assigned_workout_slots_arrays: [
            {
              slot_id: `slot-${user.uid}-1`,
              day_of_week: 'Monday',
              start_time: '06:30',
              end_time: '14:30',
              slot_status: 'active',
            },
            {
              slot_id: `slot-${user.uid}-2`,
              day_of_week: 'Wednesday',
              start_time: '06:30',
              end_time: '14:30',
              slot_status: 'active',
            },
          ],
          maximum_capacity_limits: 25,
          tracking_status_activity_flag: true,
          experience_years: params.experienceYears || 5,
          bio: params.bio?.trim() || `Certified coach specializing in ${params.specialization || 'athletic conditioning'}.`,
          contact_email: params.email.trim(),
        };
        await createOrUpdateTrainerProfile(newTrainer);
        setTrainerProfile(newTrainer);
      } else {
        // Member or Admin profile
        const newMember: FirestoreMember = {
          member_id: user.uid,
          full_name: params.displayName.trim(),
          authentication_email_source: params.email.trim().toLowerCase(),
          contact_phone_string: params.phone?.trim() || '(555) 234-5678',
          selected_membership_tier: params.membershipTier || 'Premium',
          enrollment_timestamp_date: new Date(),
          baseline_attendance_active_status_boolean: true,
          registration_validation_payload_object: {
            source: 'email_password_registration',
            fitness_goal: params.fitnessGoal || 'Strength & Conditioning',
            validation_status: 'approved',
            registered_role: params.role,
          },
        };
        await createOrUpdateMemberProfile(newMember);
        setMemberProfile(newMember);
      }
    } catch (error) {
      console.error('Email sign-up failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRecord(null);
      setMemberProfile(null);
      setTrainerProfile(null);
      setRole('member');
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await loadUserData(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRecord,
        memberProfile,
        trainerProfile,
        role,
        loading,
        isAdmin,
        isTrainer,
        isMember,
        authModalState,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
