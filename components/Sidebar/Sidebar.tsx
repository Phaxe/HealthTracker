"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "../Theme/ThemeSwitcher";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export default function Sidebar() {
  //state to handle the toggle for opening and closing the side menu could be updated to use resuable hook for toggling state 
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();
  const theme = useTheme();


  // I  used window.location for Auth0 navigation to avoid CORS issues that happened in my dev tool
  const handleAuthNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={cn(
          "h-screen p-4 fixed top-0 left-0 transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-16",
          "relative",
          theme.palette.mode === 'dark' ? "bg-black text-white" : "bg-gray-200 text-black"
        )}
      >
        {/* Toggle Button */}
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            bgcolor: theme.palette.mode === 'dark' ? 'black' : 'white',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </IconButton>

        {/* User Info */}
        {user && (
          <div className="mt-16 mb-4 p-2">
            <div className="flex items-center space-x-2">
              {user.picture && (
                <Image
                  width={100}
                  height={8}
                  src={user.picture}
                  alt={user.name || 'User avatar'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              {isOpen && <span className="font-semibold">{user.name}</span>}
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="mt-10 space-y-4">
          <Link 
            href="/" 
            className={cn(
              "block p-2 rounded font-semibold duration-300",
              theme.palette.mode === 'dark'
                ? "hover:bg-gray-800 hover:text-white"
                : "hover:bg-gray-500 hover:text-white"
            )}
          >
            {isOpen ? "Dashboard" : "🏠"}
          </Link>

          <Link 
            href="/statistics" 
            className={cn(
              "block p-2 rounded font-semibold duration-300",
              theme.palette.mode === 'dark'
                ? "hover:bg-gray-800 hover:text-white"
                : "hover:bg-gray-500 hover:text-white"
            )}
          >
            {isOpen ? "Statistics" : "➗"}
          </Link>

          {user ? (
            <Link 
              href="/api/auth/logout" 
              onClick={(e) => handleAuthNavigation(e, '/api/auth/logout')}
              className={cn(
                "block p-2 rounded font-semibold duration-300",
                theme.palette.mode === 'dark'
                  ? "hover:bg-gray-800 hover:text-white"
                  : "hover:bg-gray-500 hover:text-white"
              )}
            >
              {isOpen ? "Logout" : "🚪"}
            </Link>
          ) : (
            <Link 
              href="/api/auth/login" 
              onClick={(e) => handleAuthNavigation(e, '/api/auth/login')}
              className={cn(
                "block p-2 rounded font-semibold duration-300",
                theme.palette.mode === 'dark'
                  ? "hover:bg-gray-800 hover:text-white"
                  : "hover:bg-gray-500 hover:text-white"
              )}
            >
              {isOpen ? "Login/Register" : "🔑"}
            </Link>
          )}
        </nav>
        <ThemeToggle/>
      </div>
    </div>
  );
}
