import React from 'react';
import { Link } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import Signout from '../ui/logout';
import { useAuthStore } from '../../store/authStore';
import Profile from '../ui/profile';

function NavBar() {
  const{authUser} = useAuthStore();
  return (
    <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Left: Logo / App Name */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-950 dark:text-white">
            WOBEN URL-SHORTENER
          </h1>
        </div>

        {/* Center: Placeholder for future URL Shortener */}
        <div className="hidden md:flex items-center justify-center flex-1">
          {/* You can add input/button here if needed */}
        </div>

        {/* Right: Profile / SignUp / Logout */}
        <div className="flex items-center gap-4">
          {!authUser ? (
            <Link
              to="/Signup"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-all"
            >
              <CircleUser className="w-5 h-5" /> Sign Up
            </Link>
          ) : (
            <>
              <span className="text-gray-800 dark:text-white font-medium">
                Welcome, {authUser?.username} 
              </span>
              <Profile/>
              <Signout /> 
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
