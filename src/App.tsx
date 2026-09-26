/**
 * Gym Management Portal — Day 2 Frontend Prototype
 *
 * Single-system centralized portal connecting Members, Admins, and Coaches.
 * Designed for beginner-friendly demonstration with clean state management,
 * modular components, and accessible responsive layouts.
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MembershipPlans } from './components/MembershipPlans';
import { DashboardPreview } from './components/DashboardPreview';
import { TrainerHighlights } from './components/TrainerHighlights';
import { FacilitiesSection } from './components/FacilitiesSection';
import { EnrollmentForm } from './components/EnrollmentForm';
import { Footer } from './components/Footer';
import {
  MEMBERSHIP_PLANS,
  TRAINERS,
  WORKOUT_SLOTS,
} from './data/gymData';
import { EnrollmentFormData, MembershipTier } from './types';
import { Check } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('home');

  // Shared Enrollment Form State
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    membershipPlan: 'Premium',
    preferredTrainerId: 'trainer-marcus',
    preferredSlotId: 'slot-evening-prime',
    fitnessGoal: 'Muscle Gain & Strength',
  });

  // Temporary toast notification when choosing plan or trainer
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Smooth scroll navigation helper
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetEl: HTMLElement | null = null;

    if (sectionId === 'home') targetEl = document.getElementById('hero-section');
    else if (sectionId === 'plans') targetEl = document.getElementById('plans-section');
    else if (sectionId === 'dashboard') targetEl = document.getElementById('dashboard-section');
    else if (sectionId === 'trainers') targetEl = document.getElementById('trainers-section');
    else if (sectionId === 'facilities') targetEl = document.getElementById('facilities-section');
    else if (sectionId === 'enrollment') targetEl = document.getElementById('enrollment-section');

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // When a user selects a plan from the Membership Plans section
  const handleSelectPlan = (planName: MembershipTier) => {
    setFormData((prev) => ({
      ...prev,
      membershipPlan: planName,
    }));
    showToast(`Selected the ${planName} Membership! Form updated below.`);
    scrollToSection('enrollment');
  };

  // When a user clicks "Train with [Name]" on a coach card
  const handleSelectTrainer = (trainerId: string) => {
    const coach = TRAINERS.find((t) => t.id === trainerId);
    setFormData((prev) => ({
      ...prev,
      preferredTrainerId: trainerId,
    }));
    if (coach) {
      showToast(`Selected Coach ${coach.name}! Form updated below.`);
    }
    scrollToSection('enrollment');
  };

  // Update specific fields of the form
  const handleUpdateFormData = (updates: Partial<EnrollmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-pink-500 selection:text-white flex flex-col">
        
        {/* 1. TOP NAVIGATION */}
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        {/* Floating Selection Feedback Toast */}
        {toastMessage && (
          <aside
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-xs shadow-2xl shadow-pink-500/30 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300 border border-pink-400/50"
          >
            <div className="w-5 h-5 rounded-full bg-black/80 text-pink-300 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </aside>
        )}

        {/* MAIN CONTENT RUNTIME SECTIONS */}
        <main className="flex-1">
          {/* 2. HERO SECTION */}
          <HeroSection
            onJoinClick={() => scrollToSection('enrollment')}
            onExplorePlansClick={() => scrollToSection('plans')}
            onViewDashboardClick={() => scrollToSection('dashboard')}
            onWatchTourClick={() => scrollToSection('facilities')}
          />

          {/* 3. MEMBERSHIP PLANS SECTION */}
          <MembershipPlans
            plans={MEMBERSHIP_PLANS}
            selectedPlan={formData.membershipPlan}
            onSelectPlan={handleSelectPlan}
          />

          {/* 4. DASHBOARD PREVIEW (Member, Admin, and Trainer Tabs) */}
          <DashboardPreview />

          {/* 5. TRAINER / COACH HIGHLIGHTS */}
          <TrainerHighlights
            trainers={TRAINERS}
            selectedTrainerId={formData.preferredTrainerId}
            onSelectTrainer={handleSelectTrainer}
          />

          {/* 6. REGISTRATION / ENROLLMENT FORM */}
          <EnrollmentForm
            formData={formData}
            onChangeForm={handleUpdateFormData}
            trainers={TRAINERS}
            slots={WORKOUT_SLOTS}
            onViewDashboard={() => scrollToSection('dashboard')}
          />

          {/* 7. ABOUT & FACILITIES SUMMARY */}
          <FacilitiesSection />
        </main>

        {/* 8. FOOTER */}
        <Footer onNavigate={scrollToSection} />

        {/* 9. FIREBASE AUTH MODAL (Log In / Registration for Member, Trainer, Admin) */}
        <AuthModal />

      </div>
    </AuthProvider>
  );
}
