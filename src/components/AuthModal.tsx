import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Shield,
  Dumbbell,
  Award,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  KeyRound,
  Briefcase,
  Target,
} from 'lucide-react';
import { useAuth, SignUpParams } from '../context/AuthContext';
import { MEMBERSHIP_PLANS } from '../data/gymData';

export const AuthModal: React.FC = () => {
  const {
    authModalState,
    closeAuthModal,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalState.mode);
  const [selectedRole, setSelectedRole] = useState<'member' | 'trainer' | 'admin'>(
    authModalState.defaultRole
  );

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipTier, setMembershipTier] = useState('Premium');
  const [fitnessGoal, setFitnessGoal] = useState('Muscle Gain & Strength');
  const [specialization, setSpecialization] = useState('Strength & Conditioning');
  const [experienceYears, setExperienceYears] = useState(5);
  const [bio, setBio] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);

  if (!authModalState.isOpen) return null;

  // Sync mode if changed from props
  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessNotice(null);
    setForgotPasswordActive(false);
  };

  const handleRoleSelect = (role: 'member' | 'trainer' | 'admin') => {
    setSelectedRole(role);
    setErrorMsg(null);
    if (role === 'admin' && !adminPasscode) {
      setAdminPasscode('PULSEFIT_ADMIN_2025');
    }
  };

  const formatFirebaseError = (error: unknown): string => {
    const errStr = String(error);
    if (errStr.includes('auth/email-already-in-use')) {
      return 'This email is already registered. Please switch to Log In.';
    }
    if (
      errStr.includes('auth/wrong-password') ||
      errStr.includes('auth/invalid-credential') ||
      errStr.includes('auth/user-not-found')
    ) {
      return 'Invalid email or password. Please verify your credentials or register a new account.';
    }
    if (errStr.includes('auth/weak-password')) {
      return 'Password is too weak. Please use at least 6 characters.';
    }
    if (errStr.includes('auth/invalid-email')) {
      return 'Please provide a valid email address.';
    }
    if (errStr.includes('auth/popup-closed-by-user')) {
      return 'Google sign-in popup was closed before completion.';
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Authentication operation failed. Please check your credentials and network connection.';
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessNotice(null);

    try {
      await signInWithEmail(email, password);
      setSuccessNotice(`Successfully signed in as ${selectedRole.toUpperCase()}!`);
      setTimeout(() => {
        closeAuthModal();
      }, 1200);
    } catch (err) {
      setErrorMsg(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setErrorMsg('Please complete all required fields (Name, Email, Password).');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessNotice(null);

    const signUpData: SignUpParams = {
      email,
      password,
      displayName,
      role: selectedRole,
      phone,
      membershipTier,
      fitnessGoal,
      specialization,
      experienceYears,
      bio,
      adminPasscode,
    };

    try {
      await signUpWithEmail(signUpData);
      setSuccessNotice(`Welcome to PulseFit! Your ${selectedRole} account was created successfully.`);
      setTimeout(() => {
        closeAuthModal();
      }, 1400);
    } catch (err) {
      setErrorMsg(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      setSuccessNotice('Signed in with Google successfully!');
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err) {
      setErrorMsg(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your account email address above to receive a password reset link.');
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await resetPassword(email);
      setSuccessNotice(`Password reset link sent to ${email}. Check your inbox.`);
      setForgotPasswordActive(false);
    } catch (err) {
      setErrorMsg(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Quick preset helper to test all three roles seamlessly
  const fillPreset = (role: 'member' | 'trainer' | 'admin') => {
    setSelectedRole(role);
    setErrorMsg(null);
    if (role === 'member') {
      setEmail('member.demo@pulsefit.local');
      setPassword('PulseFit2025!');
      setDisplayName('Marcus Member');
      setPhone('(555) 345-9876');
      setMembershipTier('Premium');
    } else if (role === 'trainer') {
      setEmail('coach.vance@pulsefit.local');
      setPassword('CoachPass2025!');
      setDisplayName('Coach Vance');
      setSpecialization('Strength & Conditioning');
      setExperienceYears(8);
      setBio('Specialized in barbell mechanics and athletic power.');
    } else {
      setEmail('anirudhyad54@gmail.com');
      setPassword('AdminPulse2025!');
      setDisplayName('Anirudh Admin');
      setAdminPasscode('PULSEFIT_ADMIN_2025');
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        id="auth-modal-card"
        className="relative w-full max-w-xl my-8 rounded-3xl bg-zinc-950 border border-pink-500/40 shadow-2xl shadow-black overflow-hidden"
      >
        {/* Header Ribbon */}
        <div className="p-6 pb-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-black">
              PF
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>{mode === 'login' ? 'Portal Log In' : 'Create Account'}</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  Firebase Auth
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                PulseFit Cloud Authentication &bull; pulsefit-33adf
              </p>
            </div>
          </div>

          <button
            id="btn-close-auth-modal"
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-800"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-black border border-zinc-800">
            <button
              id="tab-auth-login"
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-auth-register"
              type="button"
              onClick={() => handleSwitchMode('register')}
              className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Registration
            </button>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
              Select Account Role:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                id="role-select-member"
                type="button"
                onClick={() => handleRoleSelect('member')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-1.5 ${
                  selectedRole === 'member'
                    ? 'bg-pink-500/15 border-pink-500 text-white shadow-sm shadow-pink-500/15'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Dumbbell className={`w-4 h-4 ${selectedRole === 'member' ? 'text-pink-400' : 'text-zinc-400'}`} />
                  <span className="font-bold text-xs">Member</span>
                </div>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">
                  Athletes & Pass Holders
                </span>
              </button>

              <button
                id="role-select-trainer"
                type="button"
                onClick={() => handleRoleSelect('trainer')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-1.5 ${
                  selectedRole === 'trainer'
                    ? 'bg-pink-500/15 border-pink-500 text-white shadow-sm shadow-pink-500/15'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Award className={`w-4 h-4 ${selectedRole === 'trainer' ? 'text-pink-400' : 'text-zinc-400'}`} />
                  <span className="font-bold text-xs">Trainer</span>
                </div>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">
                  Coaches & Instructors
                </span>
              </button>

              <button
                id="role-select-admin"
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-pink-500/15 border-pink-500 text-white shadow-sm shadow-pink-500/15'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Shield className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-pink-400' : 'text-zinc-400'}`} />
                  <span className="font-bold text-xs">Admin</span>
                </div>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">
                  Gym Management
                </span>
              </button>
            </div>
          </div>

          {/* Quick Demo Autofill Helpers */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1 border-b border-zinc-800/80">
            <span className="text-[11px] text-zinc-400 font-mono">Quick Autofill:</span>
            <button
              type="button"
              onClick={() => fillPreset('member')}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-black hover:bg-zinc-900 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
            >
              Demo Member
            </button>
            <button
              type="button"
              onClick={() => fillPreset('trainer')}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-black hover:bg-zinc-900 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
            >
              Demo Trainer
            </button>
            <button
              type="button"
              onClick={() => fillPreset('admin')}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-black hover:bg-zinc-900 text-pink-400 border border-pink-500/40 transition-colors cursor-pointer"
            >
              Owner Admin (anirudhyad54)
            </button>
          </div>

          {/* Alerts / Error Feedback */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* FORM: SIGN IN OR REGISTER */}
          <form
            onSubmit={mode === 'login' ? handleEmailSignIn : handleEmailSignUp}
            className="space-y-4"
          >
            {/* Display Name (Only in Registration) */}
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Full Name / Display Name <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-auth-name"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={
                      selectedRole === 'trainer'
                        ? 'Coach Jordan Hayes'
                        : selectedRole === 'admin'
                        ? 'Admin Operations'
                        : 'Alex Rivera'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Email Address <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@pulsefit.local"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-zinc-300">
                  Password <span className="text-pink-500">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Dynamic Registration Fields for Member */}
            {mode === 'register' && selectedRole === 'member' && (
              <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">
                      Membership Tier
                    </label>
                    <select
                      value={membershipTier}
                      onChange={(e) => setMembershipTier(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white outline-none transition-colors"
                    >
                      {MEMBERSHIP_PLANS.map((plan) => (
                        <option key={plan.id} value={plan.name} className="bg-black text-white">
                          {plan.name} (${plan.price}/mo)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-300">
                    Primary Fitness Goal
                  </label>
                  <div className="relative">
                    <Target className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value)}
                      placeholder="e.g. Muscle Gain, Conditioning, Marathon Prep"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Registration Fields for Trainer */}
            {mode === 'register' && selectedRole === 'trainer' && (
              <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">
                      Core Specialization
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="Strength & Conditioning"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-300">
                    Coach Bio / Philosophy
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Brief intro for athlete roster..."
                    className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-xs text-white placeholder:text-zinc-500 outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Registration Fields for Admin */}
            {mode === 'register' && selectedRole === 'admin' && (
              <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-pink-400" />
                    <span>Administrative Clearance Protection</span>
                  </p>
                  <p className="text-zinc-300 text-[11px]">
                    Project owner email (<span className="text-pink-400 font-mono">anirudhyad54@gmail.com</span>) is pre-authorized. For other administrative accounts, provide the admin setup passcode.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-zinc-300">
                    Admin Passcode <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      placeholder="PULSEFIT_ADMIN_2025"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-pink-500 text-sm text-white placeholder:text-zinc-500 font-mono outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-auth"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {mode === 'login' ? 'Authenticating...' : 'Creating Firestore Account...'}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login'
                      ? `Sign In as ${selectedRole.toUpperCase()}`
                      : `Complete ${selectedRole.toUpperCase()} Registration`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social / Google Auth Section */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-zinc-950 text-zinc-400 font-mono text-[11px]">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <button
            id="btn-auth-google"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-900 border border-zinc-800 hover:border-pink-500/40 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.56 0 2.96.54 4.07 1.43l3.05-3.05C17.27 1.7 14.81 1 12 1 7.48 1 3.63 3.6 1.77 7.37l3.65 2.83C6.3 7.38 8.92 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.93 3.71-8.7z"
              />
              <path
                fill="#FBBC05"
                d="M5.42 14.8c-.24-.71-.37-1.48-.37-2.8s.13-2.09.37-2.8L1.77 6.37C1.04 7.82.63 9.47.63 12s.41 4.18 1.14 5.63l3.65-2.83z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.22 1.16-3.08 0-5.7-2.38-6.58-5.2L1.77 15.99C3.63 19.76 7.48 23 12 23z"
              />
            </svg>
            <span>Google Account Sign-In</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-black/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Role-Based Access Control</span>
          </div>
          <div>
            {mode === 'login' ? (
              <span>
                Need an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('register')}
                  className="text-pink-400 font-bold hover:underline cursor-pointer"
                >
                  Register
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="text-pink-400 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
