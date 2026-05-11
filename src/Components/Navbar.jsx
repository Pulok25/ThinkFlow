import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router';

export default function Navbar() {
    return (
        <nav className="w-full bg-linear-to-r from-[#84e7c4] to-[#B5C6E0]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 md:h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <img src={logo} alt="ThinkFlow" className="h-10 w-auto md:h-14 lg:h-20" />
                    </Link>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <Link
                            to="/login"
                            className="btn btn-xs md:btn-sm bg-black border border-black text-white hover:bg-[#6f7bf7] hover:border-[#6f7bf7] transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-xs md:btn-sm bg-[#6f7bf7]! text-white border-0 hover:bg-[#5a67e8]!"
                        >
                            <span className="hidden sm:inline">Get Started</span>
                            <span className="sm:hidden">Start</span>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}