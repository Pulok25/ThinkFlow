import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Phone } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [method, setMethod] = useState('email');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    if (!name.trim()) {
      setError('Name not sent');
      return;
    }
    if (method === 'email' && !email) {
      setError('Email not sent');
      return;
    }
    if (password.length < 8) {
      setError('Password atleast 8 character');
      return;
    }
    if (password !== confirm) {
      setError('Passwords are not the same ');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name.trim() });
      navigate('/dashboard');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email have already an account');
          break;
        case 'auth/invalid-email':
          setError('Invalid Email');
          break;
        case 'auth/weak-password':
          setError('Strong Your Password add latin words number');
          break;
        default:
          setError('Account not created please try again ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">

      <div className="fixed -top-20 -left-20 w-72 h-72 bg-[#6f7bf7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-20 -right-20 w-72 h-72 bg-[#84e7c4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-xs font-medium tracking-widest uppercase text-[#1a5a40] bg-white/40 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full">
              ThinkFlow
            </span>
          </Link>
          <h1 className="mt-5 text-3xl sm:text-4xl text-[#0f3d2b] leading-tight">
            <span className="font-sans font-bold">Start </span>
            <span className="font-serif font-bold italic">Writing</span>
          </h1>
          <p className="mt-2 text-sm text-[#2a4a3a] opacity-70">
            Create your free account — no card required
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-xl shadow-[#0f3d2b]/5">

          {/* Tab switcher */}
          <div className="flex bg-white/60 border border-white/80 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMethod('email'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
                method === 'email'
                  ? 'bg-[#6f7bf7] text-white shadow-md shadow-[#6f7bf7]/30'
                  : 'text-[#2a4a3a] opacity-60 hover:opacity-90'
              }`}
            >
              <Mail size={14} /> Email
            </button>
            <button
              onClick={() => { setMethod('phone'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
                method === 'phone'
                  ? 'bg-[#6f7bf7] text-white shadow-md shadow-[#6f7bf7]/30'
                  : 'text-[#2a4a3a] opacity-60 hover:opacity-90'
              }`}
            >
              <Phone size={14} /> Phone
            </button>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl pl-11 pr-4 py-3 text-sm text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
              />
            </div>
          </div>

          {/* Email or Phone */}
          {method === 'email' ? (
            <div className="mb-5">
              <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl pl-11 pr-4 py-3 text-sm text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
                />
              </div>
            </div>
          ) : (
            <div className="mb-5">
              <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 bg-white/60 border border-white/80 rounded-xl px-3 text-sm text-[#0f3d2b] font-medium shrink-0">
                  <span className="text-base leading-none">🇧🇩</span>
                  <span className="opacity-70">+880</span>
                </div>
                <div className="relative flex-1">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl pl-11 pr-4 py-3 text-sm text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
                  />
                </div>
              </div>
              
            </div>
          )}

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl pl-11 pr-11 py-3 text-sm text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50 hover:opacity-80 transition-opacity"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                className="w-full bg-white/60 border border-white/80 focus:border-[#6f7bf7] focus:outline-none focus:ring-2 focus:ring-[#6f7bf7]/20 rounded-xl pl-11 pr-11 py-3 text-sm text-[#0f3d2b] placeholder:text-[#2a4a3a]/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50 hover:opacity-80 transition-opacity"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50/80 border border-red-200/60 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="btn w-full bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] shadow-lg shadow-[#6f7bf7]/30 rounded-xl gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? <span className="loading loading-spinner loading-sm" />
              : <>Create Account <ArrowRight size={16} /></>
            }
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-[#2a4a3a] opacity-70 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6f7bf7] font-medium hover:text-[#5a67e8] transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}