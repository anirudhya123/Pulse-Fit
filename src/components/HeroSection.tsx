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
      {/* Subtle background ambient pink glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-pink-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-pink-500/40 text-xs font-semibold text-pink-400 shadow-sm shadow-pink-500/10">
              <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
              <span>One Gym • One System • Less Manual Work</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05]">
                Forged in Discipline.{' '}
                <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 drop-shadow-[0_2px_16px_rgba(236,72,153,0.35)]">
                  Defined by Strength.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-normal">
                Welcome to the centralized Gym Management Portal. No more scattered WhatsApp chats,
                misplaced schedules, or lost registrations. Connect members, elite trainers, and
                management in one synchronized fitness club experience.
              </p>
            </div>

            {/* Key Value Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                <span>Instant Online Enrollment</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                <span>Synchronized Schedules</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                <span>Dedicated Coach Pairing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-join-now-btn"
                onClick={onJoinClick}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-explore-plans-btn"
                onClick={onExplorePlansClick}
                className="px-7 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-semibold text-base border border-zinc-700/80 hover:border-pink-500/50 transition-all cursor-pointer text-center"
              >
                Explore Membership Plans
              </button>

              <button
                id="hero-preview-dashboard-btn"
                onClick={onViewDashboardClick}
                className="px-5 py-4 rounded-xl text-zinc-400 hover:text-pink-400 font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Portal Demo</span>
                <Sparkles className="w-4 h-4 text-pink-400" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400">Active Members</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-pink-500">100%</div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400">Digital Tracking</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">15+</div>
                <div className="text-xs sm:text-sm font-medium text-zinc-400">Certified Coaches</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Interactive Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/80 shadow-2xl">
              {/* Main Fitness Atmosphere Image */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Gym Training Environment"
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Floating Highlight Tag & Video Tour Trigger */}
                <button
                  id="hero-watch-tour-badge"
                  onClick={onWatchTourClick}
                  className="absolute top-4 left-4 bg-black/80 hover:bg-zinc-900 backdrop-blur-md border border-pink-500/40 hover:border-pink-400 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer group"
                  title="Watch Facility Video Tour"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                  <span className="flex items-center gap-1.5 text-pink-200 group-hover:text-white">
                    <Play className="w-3 h-3 text-pink-400 fill-pink-400" />
                    Watch Video Tour
                  </span>
                </button>
              </div>

              {/* Centralized System Contrast Card */}
              <div className="p-6 bg-black/95 space-y-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                    Why Fitness Clubs Switch
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">DAY 2 ARCHITECTURE</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-red-900/30">
                    <span className="text-[11px] font-bold text-red-400 uppercase block mb-1">
                      Before (Manual)
                    </span>
                    <p className="text-xs text-zinc-400 leading-snug">
                      Lost WhatsApp requests, duplicate spreadsheets & missed slot times.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-pink-500/40">
                    <span className="text-[11px] font-bold text-pink-400 uppercase block mb-1">
                      Now (Portal)
                    </span>
                    <p className="text-xs text-zinc-300 leading-snug">
                      Instant enrollment, transparent schedules & live coach rosters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 bg-zinc-900/95 border border-zinc-800 p-3.5 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Live Slot Availability</div>
                <div className="text-[11px] text-zinc-400">Real-time gym capacity updates</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
