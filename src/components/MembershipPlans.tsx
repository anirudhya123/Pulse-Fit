/**
 * Membership Plans Section Component
 * Displays tiered membership cards with feature comparisons and direct plan selection
 */

import React from 'react';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';
import { MembershipPlan, MembershipTier } from '../types';

interface MembershipPlansProps {
  plans: MembershipPlan[];
  selectedPlan: MembershipTier;
  onSelectPlan: (planName: MembershipTier) => void;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  return (
    <section id="plans-section" className="py-20 bg-zinc-950/60 border-y border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-pink-500/40 text-xs font-semibold text-pink-400 shadow-sm shadow-pink-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Fitness Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Choose the Plan That Fits Your Goals
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            No hidden fees. No complicated contracts. Select your tier below to begin your instant
            enrollment with assigned coaching and dedicated workout slots.
          </p>
        </div>

        {/* 3 Reusable Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.name.toLowerCase()}`}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-zinc-900 to-black border-2 border-pink-500 shadow-2xl shadow-pink-500/20 lg:-translate-y-2'
                    : 'bg-zinc-950 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Popular / Best Value Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-pink-500/30">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Plan Header & Price */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    {isSelected && (
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[11px] font-bold">
                        Active Selection
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-zinc-400 min-h-[36px] mb-6">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-zinc-800">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-medium text-zinc-400">/{plan.period}</span>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="py-6 space-y-3.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      What is included:
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            isPopular ? 'bg-pink-500 text-white' : 'bg-zinc-900 text-pink-400 border border-zinc-800'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Choose Plan CTA */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  <button
                    id={`btn-choose-plan-${plan.name.toLowerCase()}`}
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-700 hover:border-pink-500/50'
                    }`}
                  >
                    <span>{isSelected ? 'Selected in Form' : `Choose ${plan.name} Plan`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-zinc-500 mt-2">
                    Cancels anytime • Instant confirmation
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
