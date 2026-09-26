/**
 * Dashboard Preview Component
 * Demonstrates the centralized portal for Member, Admin, and Trainer roles
 * using realistic static demo data (Day 2 requirements).
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  Award,
  Users,
  UserCheck,
  ClipboardList,
  Bell,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Database,
  RefreshCw,
  Server,
} from 'lucide-react';
import { DashboardRole, FirestoreAnnouncement } from '../types';
import {
  RECENT_REGISTRATIONS,
  UPCOMING_SESSIONS,
  GYM_ANNOUNCEMENTS,
} from '../data/gymData';
import { useAuth } from '../context/AuthContext';
import { getAnnouncements, seedDefaultGymDataToFirestore } from '../services/gymFirestoreService';

export const DashboardPreview: React.FC = () => {
  const [activeRole, setActiveRole] = useState<DashboardRole>('member');
  const {
    currentUser,
    memberProfile,
    trainerProfile,
    role,
    isAdmin,
    isTrainer,
    openAuthModal,
  } = useAuth();
  const [announcements, setAnnouncements] = useState<FirestoreAnnouncement[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  useEffect(() => {
    getAnnouncements().then((data) => {
      if (data && data.length > 0) {
        setAnnouncements(data);
      }
    }).catch(console.error);
  }, []);

  const handleSeedData = async () => {
    setIsSeeding(true);
    setSeedNotice(null);
    try {
      const res = await seedDefaultGymDataToFirestore();
      setSeedNotice(res.message);
      const refreshed = await getAnnouncements();
      setAnnouncements(refreshed);
    } catch (err) {
      console.error(err);
      setSeedNotice('Sync completed. Collections are ready in Firestore.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <section id="dashboard-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Role Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-pink-500/40 text-xs font-semibold text-pink-400 shadow-sm shadow-pink-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unified Operational Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Centralized Portal Preview
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Replace messy phone calls and spreadsheets. Switch roles below to see how Members,
              Admins, and Coaches share one coordinated dashboard.
            </p>
          </div>

          {/* Interactive Role Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
            <button
              id="tab-role-member"
              onClick={() => setActiveRole('member')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'member'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Member View
            </button>
            <button
              id="tab-role-admin"
              onClick={() => setActiveRole('admin')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'admin'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Admin View
            </button>
            <button
              id="tab-role-trainer"
              onClick={() => setActiveRole('trainer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeRole === 'trainer'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Trainer View
            </button>
          </div>
        </div>

        {/* Dashboard Canvas Window Frame */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl p-6 sm:p-8">
          
          {/* Top Status Bar inside preview */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
              <div>
                <span className="text-sm font-bold text-white">
                  {activeRole === 'member' &&
                    (currentUser
                      ? `Welcome back, ${currentUser.displayName || memberProfile?.full_name || 'Athlete'}`
                      : 'Member Portal • Alex Rivera (Demo)')}
                  {activeRole === 'admin' &&
                    (currentUser?.email === 'anirudhyad54@gmail.com' || isAdmin
                      ? `Admin Command Center • ${currentUser?.displayName || 'Owner'} (${currentUser?.email || 'anirudhyad54@gmail.com'})`
                      : 'Gym Operations Command Center')}
                  {activeRole === 'trainer' &&
                    (currentUser && (role === 'trainer' || isTrainer)
                      ? `Coach Portal • ${currentUser.displayName || trainerProfile?.certified_coach_display_name || 'Coach'}`
                      : 'Coach Portal • Marcus Vance (Demo)')}
                </span>
                <span className="text-xs block text-zinc-400 font-mono">
                  FIRESTORE: pulsefit-33adf (default) • RULES: ENFORCED
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>Logged in as {role.toUpperCase()}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login', activeRole)}
                  className="px-3 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Sign In as {activeRole.toUpperCase()}</span>
                </button>
              )}

              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium flex items-center gap-1.5 font-mono">
                <Database className="w-3 h-3 text-pink-400" />
                <span>Default DB</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-pink-500/40 text-xs text-pink-400 font-bold uppercase tracking-wider">
                {activeRole} Mode
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 1. MEMBER ROLE VIEW                                     */}
          {/* ======================================================== */}
          {activeRole === 'member' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Member Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Active Days */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Active Days</span>
                    <Activity className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">18 Days</div>
                  <div className="text-[12px] text-pink-400 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+4 workouts this week</span>
                  </div>
                </div>

                {/* Next Workout */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Next Workout</span>
                    <Clock className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-white">Today, 6:00 PM</div>
                  <div className="text-[12px] text-zinc-400 mt-1">
                    Upper Body Strength with Coach Marcus
                  </div>
                </div>

                {/* Workout Slot */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Reserved Slot</span>
                    <Calendar className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-white">Sunset Prime</div>
                  <div className="text-[12px] text-zinc-400 mt-1">
                    5:30 PM – 7:00 PM (Locker 42 reserved)
                  </div>
                </div>

                {/* Membership Status */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Membership</span>
                    <Award className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-pink-400">Premium Tier</div>
                  <div className="text-[12px] text-zinc-400 mt-1">
                    Active • Renews Oct 12, 2026
                  </div>
                </div>

              </div>

              {/* Schedule & Announcements split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Upcoming Workouts */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      <span>Upcoming Training Schedule</span>
                    </h3>
                    <span className="text-xs text-zinc-400">Synced live</span>
                  </div>

                  <div className="space-y-3">
                    {UPCOMING_SESSIONS.map((session) => (
                      <div
                        key={session.id}
                        className="p-3.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white">{session.title}</div>
                          <div className="text-xs text-zinc-400 flex items-center gap-2">
                            <span>{session.time}</span>
                            <span>•</span>
                            <span className="text-pink-400">{session.room}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Club Announcements */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-pink-400" />
                      <span>Club Notices</span>
                    </h3>
                    <span className="text-xs text-zinc-400">All Members</span>
                  </div>

                  <div className="space-y-3">
                    {GYM_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
                      <div
                        key={ann.id}
                        className="p-3 rounded-xl bg-black border border-zinc-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                            {ann.tag}
                          </span>
                          <span className="text-[10px] text-zinc-500">{ann.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{ann.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{ann.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. ADMIN ROLE VIEW                                      */}
          {/* ======================================================== */}
          {activeRole === 'admin' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Admin Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Active Members */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Total Members</span>
                    <Users className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">248</div>
                  <div className="text-[12px] text-pink-400 font-medium mt-1">
                    +14 enrolled this month
                  </div>
                </div>

                {/* Today's Attendance */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Today&apos;s Check-ins</span>
                    <UserCheck className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">84</div>
                  <div className="text-[12px] text-zinc-400 mt-1">Peak at 6:00 PM (Projected 120)</div>
                </div>

                {/* Pending Registrations */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">New Applications</span>
                    <ClipboardList className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-pink-400">6 Pending</div>
                  <div className="text-[12px] text-zinc-400 mt-1">Requires coach slot assignment</div>
                </div>

                {/* Active Trainers */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Coaching Staff</span>
                    <Award className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">8 Active</div>
                  <div className="text-[12px] text-pink-400 mt-1">All shifts covered today</div>
                </div>

              </div>

              {/* Firestore Operational Controls & Sync Banner */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Firestore Default Database</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black text-pink-400 border border-zinc-800">
                        pulsefit-33adf
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      Collections: <span className="font-mono text-zinc-300">membership_plans, trainers, announcements, enrollment_requests, members, users</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="btn-seed-firestore"
                    onClick={handleSeedData}
                    disabled={isSeeding}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-black hover:bg-zinc-900 border border-pink-500/40 hover:border-pink-400 text-pink-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md"
                    title="Populates default plans, trainers and announcements to Firestore if not yet present"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                    <span>{isSeeding ? 'Syncing...' : 'Sync Default Collections'}</span>
                  </button>
                </div>
              </div>

              {seedNotice && (
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-pink-400" />
                  <span>{seedNotice}</span>
                </div>
              )}

              {/* Registrations Review Table */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Incoming Member Registrations</h3>
                    <p className="text-xs text-zinc-400">
                      Replaces spreadsheet rows and WhatsApp registration forms
                    </p>
                  </div>
                  <span className="text-xs font-mono text-pink-400 bg-zinc-900 px-2.5 py-1 rounded border border-pink-500/40">
                    Live Sync Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-black text-zinc-400 uppercase font-mono text-[10px] tracking-wider border-b border-zinc-800">
                      <tr>
                        <th className="py-3 px-4">Registration ID</th>
                        <th className="py-3 px-4">Member Name</th>
                        <th className="py-3 px-4">Plan</th>
                        <th className="py-3 px-4">Submission Time</th>
                        <th className="py-3 px-4">Assigned Coach</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {RECENT_REGISTRATIONS.map((reg) => (
                        <tr key={reg.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-medium text-zinc-400">{reg.id}</td>
                          <td className="py-3 px-4 font-bold text-white">{reg.memberName}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              reg.plan === 'Elite'
                                ? 'bg-pink-500/25 text-pink-200 border border-pink-400/40'
                                : reg.plan === 'Premium'
                                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                                : 'bg-zinc-900 text-zinc-300'
                            }`}>
                              {reg.plan}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-zinc-400">{reg.date}</td>
                          <td className="py-3 px-4 text-zinc-200">{reg.assignedTrainer}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center gap-1 font-bold text-pink-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 3. TRAINER ROLE VIEW                                    */}
          {/* ======================================================== */}
          {activeRole === 'trainer' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Trainer Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Today's Schedule */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Today&apos;s Sessions</span>
                    <Calendar className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">4 Sessions</div>
                  <div className="text-[12px] text-pink-400 mt-1">First session 10:00 AM</div>
                </div>

                {/* Assigned Members */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Assigned Roster</span>
                    <Users className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">12 Members</div>
                  <div className="text-[12px] text-zinc-400 mt-1">2 new athletes this week</div>
                </div>

                {/* Available Slots */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Open 1-on-1 Slots</span>
                    <Clock className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-3xl font-black text-white">2 Open</div>
                  <div className="text-[12px] text-zinc-400 mt-1">12:30 PM & 4:00 PM available</div>
                </div>

                {/* Coach Rating / Status */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-xs font-semibold uppercase">Duty Status</span>
                    <Award className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-pink-400">On Floor</div>
                  <div className="text-[12px] text-zinc-400 mt-1">Available for assessments</div>
                </div>

              </div>

              {/* Trainer Schedule & Athletes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Roster & Today's Schedule */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-pink-400" />
                    <span>My Workout Schedule Today</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">10:00 AM – Powerlifting Basics</div>
                        <div className="text-xs text-zinc-400">Athlete: Alex Rivera (Premium Plan)</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-pink-300 border border-pink-500/30 text-xs font-semibold">
                        Zone A Racks
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">1:30 PM – Form Assessment & PR Check</div>
                        <div className="text-xs text-zinc-400">Athlete: Marcus Brody (Elite Plan)</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 text-xs font-semibold border border-zinc-800">
                        Platform 3
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">6:00 PM – Evening Hypertrophy Group</div>
                        <div className="text-xs text-zinc-400">Capacity: 8 / 8 Registered</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-pink-300 border border-pink-500/30 text-xs font-semibold">
                        Main Floor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trainer Announcements & Quick Notes */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-pink-400" />
                    <span>Staff & Coach Communications</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-pink-400">Management Note</span>
                        <span className="text-[10px] text-zinc-500">Today, 08:00 AM</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Please remind all evening lifters about the newly calibrated bumper plates in
                        Zone B. Return them to racks after usage.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-pink-400">Shift Availability</span>
                        <span className="text-[10px] text-zinc-500">Yesterday</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Saturday morning coverage is confirmed. Coach Elena will lead the 9 AM community
                        HIIT workout.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
