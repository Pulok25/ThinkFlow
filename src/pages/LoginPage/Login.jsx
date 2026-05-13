import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('false');

  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    setError('')
    if (!email || !password){
      setError('Invalid Email & Password')
      return;
    }
    setLoading('True')
    try{
      await signInWithEmailAndPassword(auth, email,password);
      navigate('/dashboard');
    } catch(err){
      switch(err.code){
        case 'User is Not Found':
          setError('This email have no account')
          break;

        case 'auth/wrong-password':
          setError('Invalid password')
          break;
        case 'auth/invalid-email':
          setError('Invalid email give the valid email address')
          break;

        case 'auth/to-many-requests':
          setError('attempt failed try again later');
          break;
        default:
          setError('Invalid Login')
      }
    } finally {
      setLoading(false);

    }
  }

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
            <span className="font-sans font-bold">Welcome </span>
            <span className="font-serif font-bold italic">Back</span>
          </h1>
          <p className="mt-2 text-sm text-[#2a4a3a] opacity-70">
            Sign in to continue your thought journal
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

          {/* Password — email only */}
          {method === 'email' && (
            <div className="mb-2">
              <label className="block text-sm font-medium font-sans text-[#0f3d2b] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a4a3a] opacity-50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailLogin()}
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
          )}

          {/* Forgot */}
          {method === 'email' && (
            <div className="flex justify-end mb-6">
              <a href="#" className="text-xs text-[#6f7bf7] hover:text-[#5a67e8] transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          {/* Phone hint */}
          {method === 'phone' && (
            <p className="text-xs text-[#2a4a3a] opacity-50 mb-6 ml-1">
              একটি OTP কোড তোমার নম্বরে পাঠানো হবে
            </p>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50/80 border border-red-200/60 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={method === 'email' ? handleEmailLogin : undefined}
            disabled={loading}
            className="btn w-full bg-[#6f7bf7] text-white border-0 hover:bg-[#5a67e8] shadow-lg shadow-[#6f7bf7]/30 rounded-xl gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>{method === 'email' ? 'Sign In' : 'Send OTP'} <ArrowRight size={16} /></>
            )}
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-[#2a4a3a] opacity-70 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6f7bf7] font-medium hover:text-[#5a67e8] transition-colors">
            Create one free
          </Link>
        </p>

      </div>
    </div>
  );
}