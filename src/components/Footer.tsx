/**
 * Footer Component
 * Contains gym branding, quick navigation, contact details, and portal status
 */

import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Vision Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-pink-500 to-rose-400 flex items-center justify-center text-black shadow-md shadow-pink-500/25">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                PULSE<span className="text-pink-500 font-extrabold">FIT</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              One gym. One system. Less manual work. A centralized management and member experience
              portal uniting club management, coaching staff, and athletes.
            </p>

            <div className="pt-2 text-xs font-mono text-pink-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>Day 2 Class Demonstration Architecture</span>
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plans')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Membership Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Dashboard Preview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trainers')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Trainers & Coaches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('enrollment')}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Member Enrollment
                </button>
              </li>
            </ul>
          </div>

          {/* Hours Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Facility Hours</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Monday – Friday</div>
                  <div className="text-zinc-400">5:30 AM – 10:30 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Saturday & Sunday</div>
                  <div className="text-zinc-400">7:00 AM – 8:00 PM</div>
                </div>
              </li>
              <li className="text-[11px] text-pink-400 pt-1">
                *Elite tier keycards have 24/7 designated portal access.
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Club Reception</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>482 Ironworks Parkway, Athletic District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <span>(555) 839-4021</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>support@pulsefitgym.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-10 mt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 PulseFit Gym Management Portal. Built for fitness center efficiency.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-pink-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
