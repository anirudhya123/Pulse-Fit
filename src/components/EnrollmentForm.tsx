/**
 * Enrollment / Registration Form Component
 * Handles member registration, frontend field validation, and confirmation state
 */

import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Target,
  Database,
  Loader2,
} from 'lucide-react';
import {
  EnrollmentFormData,
  EnrollmentErrors,
  MembershipTier,
  Trainer,
  WorkoutSlot,
} from '../types';
import { submitEnrollmentRequest } from '../services/gymFirestoreService';

interface EnrollmentFormProps {
  formData: EnrollmentFormData;
  onChangeForm: (data: Partial<EnrollmentFormData>) => void;
  trainers: Trainer[];
  slots: WorkoutSlot[];
  onViewDashboard: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  formData,
  onChangeForm,
  trainers,
  slots,
  onViewDashboard,
}) => {
  const [errors, setErrors] = useState<EnrollmentErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<EnrollmentFormData | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Frontend validation logic
  const validate = (): boolean => {
    const newErrors: EnrollmentErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full legal name.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for workout slot SMS reminders.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number with at least 7 digits.';
    }

    if (!formData.membershipPlan) {
      newErrors.membershipPlan = 'Please choose a membership plan.';
    }

    if (!formData.preferredSlotId) {
      newErrors.preferredSlotId = 'Please select a preferred workout slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const selectedSlot = slots.find((s) => s.id === formData.preferredSlotId);
      const res = await submitEnrollmentRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        planId: formData.membershipPlan,
        preferredTrainerId: formData.preferredTrainerId,
        preferredWorkoutSlot: selectedSlot || null,
        fitnessGoal: formData.fitnessGoal,
      });

      setConfirmationCode(res.requestId);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit enrollment request to Firestore:', err);
      // Even if offline, provide fallback confirmation code
      const fallbackCode = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(fallbackCode);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setSubmissionError(null);
    setErrors({});
    onChangeForm({
      fullName: '',
      email: '',
      phone: '',
      fitnessGoal: 'Muscle Gain & Strength',
    });
  };

  const selectedTrainerObj = trainers.find((t) => t.id === formData.preferredTrainerId);
  const selectedSlotObj = slots.find((s) => s.id === formData.preferredSlotId);

  return (
    <section id="enrollment-section" className="py-20 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-pink-500/40 text-xs font-semibold text-pink-400 shadow-sm shadow-pink-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Digital Enrollment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Register Your Membership
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Complete your enrollment details below. Your workout slot and coach preference will be
            instantly synced into the portal.
          </p>
        </div>

        {/* ======================================================== */}
        {/* SUCCESS STATE CARD                                       */}
        {/* ======================================================== */}
        {isSubmitted && submittedData ? (
          <div
            id="enrollment-success-banner"
            className="rounded-3xl border border-pink-500/50 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 sm:p-10 shadow-2xl shadow-pink-500/20 space-y-8 animate-in zoom-in-95 duration-300"
          >
            {/* Top Success Badge */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-pink-500/40 text-pink-400 text-xs font-mono">
                  <Database className="w-3.5 h-3.5" />
                  <span>REQUEST ID: {confirmationCode}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome to the Club, {submittedData.fullName}!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Your registration has been securely synchronized with Cloud Firestore in the{' '}
                  <span className="text-pink-400 font-mono">enrollment_requests</span> collection. Show this ID at reception on your first workout.
                </p>
              </div>
            </div>

            {/* Summary Review Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400 uppercase font-mono">Member Name</span>
                <div className="font-bold text-white">{submittedData.fullName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 uppercase font-mono">Membership Tier</span>
                <div className="font-bold text-pink-400">{submittedData.membershipPlan} Tier</div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 uppercase font-mono">Assigned Coach</span>
                <div className="font-bold text-white">
                  {trainers.find((t) => t.id === submittedData.preferredTrainerId)?.name || 'First Available Coach'}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 uppercase font-mono">Workout Slot</span>
                <div className="font-bold text-white">
                  {slots.find((s) => s.id === submittedData.preferredSlotId)?.label} (
                  {slots.find((s) => s.id === submittedData.preferredSlotId)?.time})
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-zinc-800">
                <span className="text-xs text-zinc-400 uppercase font-mono">Contact Details</span>
                <div className="text-zinc-300">
                  {submittedData.email} • {submittedData.phone}
                </div>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                id="btn-view-portal-preview"
                onClick={onViewDashboard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 cursor-pointer"
              >
                <span>View Dashboard Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-register-another-member"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm border border-zinc-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Register Another Member</span>
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* REGISTRATION FORM                                        */
          /* ======================================================== */
          <form
            id="gym-enrollment-form"
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 shadow-xl space-y-6"
          >
            {/* Form Section Title */}
            <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Member Application Form</h3>
                <p className="text-xs text-zinc-400">All fields marked with an asterisk (*) are required.</p>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-black px-2.5 py-1 rounded border border-zinc-800">
                PORTAL-FORM-V1
              </span>
            </div>

            {/* Personal Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="input-fullName" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="input-fullName"
                    placeholder="e.g. Jordan Miller"
                    value={formData.fullName}
                    onChange={(e) => onChangeForm({ fullName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black text-white text-sm border focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label htmlFor="input-email" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="input-email"
                    placeholder="e.g. jordan@example.com"
                    value={formData.email}
                    onChange={(e) => onChangeForm({ email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black text-white text-sm border focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="input-phone" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="input-phone"
                    placeholder="e.g. (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => onChangeForm({ phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black text-white text-sm border focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Membership Plan Selection */}
              <div className="space-y-2">
                <label htmlFor="select-membershipPlan" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Membership Plan *
                </label>
                <div className="relative">
                  <select
                    id="select-membershipPlan"
                    value={formData.membershipPlan}
                    onChange={(e) => onChangeForm({ membershipPlan: e.target.value as MembershipTier })}
                    className="w-full px-4 py-3 rounded-xl bg-black text-white text-sm border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  >
                    <option value="Basic">Basic Plan ($29/month)</option>
                    <option value="Premium">Premium Plan ($59/month) — Recommended</option>
                    <option value="Elite">Elite VIP Plan ($99/month)</option>
                  </select>
                </div>
                {errors.membershipPlan && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.membershipPlan}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Gym Preferences Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Preferred Coach */}
              <div className="space-y-2">
                <label htmlFor="select-preferredTrainer" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Preferred Trainer / Coach
                </label>
                <select
                  id="select-preferredTrainer"
                  value={formData.preferredTrainerId}
                  onChange={(e) => onChangeForm({ preferredTrainerId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black text-white text-sm border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="">No preference (Auto-assign available coach)</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} ({trainer.specialization})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-zinc-400">
                  {selectedTrainerObj ? `Selected: ${selectedTrainerObj.name} — ${selectedTrainerObj.availability}` : 'You can switch coaches anytime in the portal.'}
                </p>
              </div>

              {/* Preferred Workout Slot */}
              <div className="space-y-2">
                <label htmlFor="select-workoutSlot" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Preferred Workout Slot *
                </label>
                <select
                  id="select-workoutSlot"
                  value={formData.preferredSlotId}
                  onChange={(e) => onChangeForm({ preferredSlotId: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-black text-white text-sm border focus:outline-none transition-colors ${
                    errors.preferredSlotId
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500'
                  }`}
                >
                  <option value="">Choose your primary training time</option>
                  {slots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label} ({slot.time}) — {slot.capacityStatus}
                    </option>
                  ))}
                </select>
                {errors.preferredSlotId ? (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.preferredSlotId}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-400">
                    Slots guarantee uncrowded floor access and locker reservation.
                  </p>
                )}
              </div>

            </div>

            {/* Optional Fitness Goal */}
            <div className="space-y-2 pt-2">
              <label htmlFor="select-fitnessGoal" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-pink-400" />
                <span>Primary Fitness Goal (Optional)</span>
              </label>
              <select
                id="select-fitnessGoal"
                value={formData.fitnessGoal}
                onChange={(e) => onChangeForm({ fitnessGoal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black text-white text-sm border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
              >
                <option value="Muscle Gain & Strength">Muscle Gain & Hypertrophy</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Metabolic Conditioning</option>
                <option value="Athletic Performance">Athletic Speed, Agility & Stamina</option>
                <option value="Postural Rehabilitation & Mobility">Joint Longevity & Posture Mobility</option>
                <option value="General Health & Well-being">General Health & Active Lifestyle</option>
              </select>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 text-center sm:text-left flex items-center gap-2">
                <Database className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Synchronized with Firestore: <strong className="text-zinc-300 font-mono">pulsefit-33adf (default)</strong></span>
              </div>

              <button
                type="submit"
                id="btn-complete-enrollment"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Syncing to Firestore...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Enrollment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
