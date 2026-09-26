/**
 * About / Facilities Summary Component
 * Showcases club equipment, training zones, clean facilities, and community values
 */

import React from 'react';
import { Dumbbell, Activity, Users, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { GYM_FACILITIES } from '../data/gymData';

export const FacilitiesSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Dumbbell: <Dumbbell className="w-5 h-5 text-gold-400" />,
    Activity: <Activity className="w-5 h-5 text-gold-400" />,
    Users: <Users className="w-5 h-5 text-gold-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-gold-400" />,
  };

  return (
    <section id="facilities-section" className="py-20 bg-brown-900/40 border-t border-brown-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-900 border border-brown-700 text-xs font-semibold text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>World-Class Fitness Facility</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Built for Performance. Designed for Discipline.
            </h2>
            <p className="text-stone-300 text-base leading-relaxed">
              We eliminated overcrowding and broken machines. PulseFit is engineered to deliver an
              uncompromising fitness atmosphere where dedicated athletes and beginners train side by
              side in a supportive, hygienic environment.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-brown-950 border border-brown-800">
                <div className="text-xl font-bold text-white">12,000 sq ft</div>
                <div className="text-xs text-stone-400">Dedicated Training Floor</div>
              </div>
              <div className="p-4 rounded-xl bg-brown-950 border border-brown-800">
                <div className="text-xl font-bold text-gold-400">Zero Wait Time</div>
                <div className="text-xs text-stone-400">Managed Slot Capacities</div>
              </div>
            </div>
          </div>

          {/* Video Showcase Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-brown-800 bg-brown-950 shadow-2xl p-3 sm:p-4 space-y-3">
              {/* Video Header Bar */}
              <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-brown-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                    Facility & Training Tour
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gold-400 bg-brown-900 px-2.5 py-0.5 rounded border border-gold-500/30">
                  HD Experience
                </span>
              </div>

              {/* YouTube Embed Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brown-900 border border-brown-800 shadow-inner">
                <iframe
                  id="pulsefit-youtube-tour-video"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/iUtnZpzkbG8?rel=0&modestbranding=1"
                  title="PulseFit Workout & Facility Video Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Video Subtitle & Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-stone-300 font-medium">Inside look at coaching & workout energy</span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Tap play to watch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Facility Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GYM_FACILITIES.map((facility, index) => (
            <div
              key={index}
              id={`facility-card-${index}`}
              className="p-6 rounded-2xl bg-brown-950 border border-brown-800/90 space-y-3 hover:border-brown-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-brown-900 border border-brown-800 flex items-center justify-center">
                {iconMap[facility.iconName]}
              </div>
              <h3 className="text-base font-bold text-white">{facility.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
