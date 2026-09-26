/**
 * Top Navigation Bar Component
 * Responsive with mobile hamburger drawer and quick CTA
 */

import React, { useState } from 'react';
import { Dumbbell, Menu, X, ArrowRight, LogIn, LogOut, User, Shield, Award, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, role, isAdmin, isTrainer, logout, openAuthModal } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'plans', label: 'Membership' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'facilities', label: 'About & Facilities' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            id="nav-brand-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg p-1 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-600 via-pink-500 to-rose-400 flex items-center justify-center text-black shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                PULSE<span className="text-pink-500 font-extrabold">FIT</span>
              </span>
              <span className="text-[11px] block font-medium tracking-wider text-zinc-400 uppercase">
                Gym Management Portal
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-pink-400 bg-zinc-900 border border-pink-500/40 shadow-sm shadow-pink-500/15'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Auth State */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-1.5 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 flex items-center justify-center text-xs font-bold overflow-hidden">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="w-4 h-4 text-pink-400" />
                  )}
                </div>
                <div className="text-left leading-tight pr-1">
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0] || 'Athlete'}
                  </div>
                  <div className="text-[10px] text-pink-400 font-mono uppercase tracking-wider flex items-center gap-1">
                    {isAdmin ? (
                      <>
                        <Shield className="w-2.5 h-2.5 text-pink-400" />
                        <span>Admin</span>
                      </>
                    ) : isTrainer ? (
                      <>
                        <Award className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Trainer</span>
                      </>
                    ) : (
                      <>
                        <Dumbbell className="w-2.5 h-2.5 text-pink-400" />
                        <span>Member</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  id="nav-logout-btn"
                  onClick={logout}
                  className="p-1 text-zinc-400 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-signin-btn"
                  onClick={() => openAuthModal('login', 'member')}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-pink-500/50 text-zinc-200 hover:text-pink-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-pink-400" />
                  <span>Log In</span>
                </button>

                <button
                  id="nav-register-btn"
                  onClick={() => openAuthModal('register', 'member')}
                  className="px-3.5 py-2 rounded-xl bg-black hover:bg-zinc-900 border border-pink-500/40 text-pink-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-pink-400" />
                  <span>Register</span>
                </button>
              </div>
            )}

            <button
              id="nav-join-now-btn"
              onClick={() => handleLinkClick('enrollment')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Enroll Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-b border-zinc-800 bg-zinc-950/98 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-zinc-800/80 text-xs text-zinc-400">
            <span>Navigation Menu</span>
            <span className="text-pink-400 font-medium">Firestore Connected</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                activeSection === link.id
                  ? 'bg-zinc-900 text-pink-400 border border-pink-500/40'
                  : 'text-zinc-200 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-zinc-800 space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-400" />
                  <span>{currentUser.displayName || currentUser.email}</span>
                  <span className="text-[10px] font-mono text-pink-400 uppercase">({role})</span>
                </div>
                <button
                  onClick={logout}
                  className="text-zinc-400 hover:text-rose-400 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('login', 'member');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-700 text-pink-300 font-semibold text-center flex items-center justify-center gap-2 text-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-pink-400" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register', 'member');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-black border border-pink-500/40 text-zinc-200 font-semibold text-center flex items-center justify-center gap-1.5 text-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-pink-400" />
                  <span>Register</span>
                </button>
              </div>
            )}

            <button
              id="mobile-nav-join-now-btn"
              onClick={() => handleLinkClick('enrollment')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25"
            >
              <span>Enroll Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

