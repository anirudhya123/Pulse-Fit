/**
 * Trainer / Coach Highlights Section Component
 * Displays certified coaches, credentials, availability badges, and direct pairing
 */

import React from 'react';
import { Award, Clock, CheckCircle, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { Trainer } from '../types';

interface TrainerHighlightsProps {
  trainers: Trainer[];
  selectedTrainerId: string;
  onSelectTrainer: (trainerId: string) => void;
}

export const TrainerHighlights: React.FC<TrainerHighlightsProps> = ({
  trainers,
  selectedTrainerId,
  onSelectTrainer,
}) => {
  return (
    <section id="trainers-section" className="py-20 bg-brown-900/40 border-t border-brown-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brown-900 border border-brown-700 text-xs font-semibold text-gold-400">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Coaching Staff</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Meet Your Expert Trainers
          </h2>
          <p className="text-base sm:text-lg text-stone-400 leading-relaxed">
            Our certified coaches specialize in strength, conditioning, injury rehabilitation, and
            metabolic performance. Select a coach to pair with your membership enrollment.
          </p>
        </div>

        {/* 4 Reusable Trainer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => {
            const isSelected = selectedTrainerId === trainer.id;

            return (
              <div
                key={trainer.id}
                id={`trainer-card-${trainer.id}`}
                className={`rounded-3xl bg-brown-950 border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isSelected
                    ? 'border-gold-500 shadow-xl shadow-gold-950/40 ring-2 ring-gold-500/20'
                    : 'border-brown-800 hover:border-brown-700'
                }`}
              >
                <div>
                  {/* Coach Photo Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-brown-900">
                    <img
                      src={trainer.avatarUrl}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-950 via-transparent to-transparent"></div>

                    {/* Badge Pill */}
                    {trainer.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brown-900/90 backdrop-blur-md border border-brown-700/80 text-[11px] font-bold text-gold-400 flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                        <span>{trainer.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Details Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                        {trainer.role}
                      </span>
                      <span className="text-xs font-medium text-stone-400 bg-brown-900 px-2 py-0.5 rounded border border-brown-800">
                        {trainer.experience}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white">{trainer.name}</h3>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                        <Dumbbell className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{trainer.specialization}</span>
                      </div>
                      <div className="text-xs text-stone-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>{trainer.availability}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 pt-2 leading-relaxed border-t border-brown-800/80">
                      {trainer.bio}
                    </p>
                  </div>
                </div>

                {/* Trainer Action Button */}
                <div className="p-6 pt-0">
                  <button
                    id={`btn-select-trainer-${trainer.id}`}
                    onClick={() => onSelectTrainer(trainer.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-brown-950 shadow-md shadow-gold-500/20'
                        : 'bg-brown-900 hover:bg-brown-850 text-stone-200 border border-brown-700 hover:border-gold-500/40'
                    }`}
                  >
                    <span>{isSelected ? 'Coach Selected' : `Train with ${trainer.name.split(' ')[0]}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
