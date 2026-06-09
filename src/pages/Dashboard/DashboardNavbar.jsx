import React from 'react';
import { Link } from 'react-router';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { useAuth } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.svg';

export default function DashboardNavbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#84e7c4] to-[#B5C6E0]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 md:h-16">

                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img src={logo} alt="ThinkFlow" className="h-10 w-auto md:h-14" />
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Avatar + name */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#6f7bf7] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {user?.displayName?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <span className="hidden sm:block text-sm font-medium text-[#0f3d2b]">
                                {user?.displayName}
                            </span>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 text-sm text-[#2a4a3a] opacity-60 hover:opacity-100 hover:text-red-500 transition-all"
                        >
                            <LogOut size={15} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}