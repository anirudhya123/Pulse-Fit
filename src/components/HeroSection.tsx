/**
 * Hero Section Component
 * High-energy fitness banner, value proposition, and primary calls-to-action
 */

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Zap, Calendar, Sparkles, Play } from 'lucide-react';

interface HeroSectionProps {
  onJoinClick: () => void;
  onExplorePlansClick: () => void;
  onViewDashboardClick: () => void;
  onWatchTourClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onExplorePlansClick,
  onViewDashboardClick,
  onWatchTourClick,
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brown-900/90 border border-gold-500/30 text-xs font-semibold text-gold-400 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-gold-400"></span>
              <span>One Gym • One System • Less Manual Work</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05]">
                Forged in Discipline.{' '}
                <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-yellow-500 drop-shadow-[0_2px_16px_rgba(245,158,11,0.25)]">
                  Defined by Strength.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed font-normal">
                Welcome to the centralized Gym Management Portal. No more scattered WhatsApp chats,
                misplaced schedules, or lost registrations. Connect members, elite trainers, and
                management in one synchronized fitness club experience.
              </p>
            </div>

            {/* Key Value Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-stone-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Instant Online Enrollment</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Synchronized Schedules</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Dedicated Coach Pairing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-join-now-btn"
                onClick={onJoinClick}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-brown-950 font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-explore-plans-btn"
                onClick={onExplorePlansClick}
                className="px-7 py-4 rounded-xl bg-brown-900/90 hover:bg-brown-850 text-white font-semibold text-base border border-brown-700/80 hover:border-gold-500/40 transition-all cursor-pointer text-center"
              >
                Explore Membership Plans
              </button>

              <button
                id="hero-preview-dashboard-btn"
                onClick={onViewDashboardClick}
                className="px-5 py-4 rounded-xl text-stone-400 hover:text-gold-400 font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Portal Demo</span>
                <Sparkles className="w-4 h-4 text-gold-400" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-brown-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
                <div className="text-xs sm:text-sm font-medium text-stone-400">Active Members</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gold-400">100%</div>
                <div className="text-xs sm:text-sm font-medium text-stone-400">Digital Tracking</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
                <div className="text-xs sm:text-sm font-medium text-stone-400">Certified Coaches</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Interactive Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-brown-800 bg-brown-900/80 shadow-2xl">
              {/* Main Fitness Atmosphere Image */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Gym Training Environment"
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-950 via-brown-950/40 to-transparent"></div>

                {/* Floating Highlight Tag & Video Tour Trigger */}
                <button
                  id="hero-watch-tour-badge"
                  onClick={onWatchTourClick}
                  className="absolute top-4 left-4 bg-brown-900/90 hover:bg-brown-850 backdrop-blur-md border border-gold-500/40 hover:border-gold-400 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer group"
                  title="Watch Facility Video Tour"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="flex items-center gap-1.5 text-gold-300 group-hover:text-gold-200">
                    <Play className="w-3 h-3 text-gold-400 fill-gold-400" />
                    Watch Video Tour
                  </span>
                </button>
              </div>

              {/* Centralized System Contrast Card */}
              <div className="p-6 bg-brown-950/90 space-y-4 border-t border-brown-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Why Fitness Clubs Switch
                  </span>
                  <span className="text-xs text-stone-400 font-mono">DAY 2 ARCHITECTURE</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-brown-900/90 border border-red-900/30">
                    <span className="text-[11px] font-bold text-red-400 uppercase block mb-1">
                      Before (Manual)
                    </span>
                    <p className="text-xs text-stone-400 leading-snug">
                      Lost WhatsApp requests, duplicate spreadsheets & missed slot times.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-brown-900/90 border border-gold-500/30">
                    <span className="text-[11px] font-bold text-gold-400 uppercase block mb-1">
                      Now (Portal)
                    </span>
                    <p className="text-xs text-stone-300 leading-snug">
                      Instant enrollment, transparent schedules & live coach rosters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 bg-brown-900/95 border border-brown-700 p-3.5 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Live Slot Availability</div>
                <div className="text-[11px] text-stone-400">Real-time gym capacity updates</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
