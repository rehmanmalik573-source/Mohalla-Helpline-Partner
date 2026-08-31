import React, { useState, useEffect } from 'react';
import { Home, Calendar, Wallet, Bell, User } from 'lucide-react';
import { Language } from '../types';

interface BottomNavBarProps {
  currentTab: 'dashboard' | 'requests' | 'earnings' | 'profile';
  onSelectTab: (tab: 'dashboard' | 'requests' | 'earnings' | 'profile') => void;
  language: Language;
  activeRequestsCount: number;
  unreadNotificationsCount?: number;
  onOpenProfile: () => void;
  onOpenPayments: () => void;
  onOpenNotifications?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  language,
  activeRequestsCount,
  unreadNotificationsCount = 3,
  onOpenProfile,
  onOpenPayments,
  onOpenNotifications,
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable)) {
          setIsKeyboardOpen(false);
        }
      }, 50);
    };

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const isShrunk = window.innerHeight - window.visualViewport.height > 150;
        if (isShrunk) {
          setIsKeyboardOpen(true);
        }
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    window.visualViewport?.addEventListener('resize', handleViewportResize);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
    };
  }, []);

  if (isKeyboardOpen) {
    return null;
  }

  return (
    <nav 
      id="partner-bottom-nav-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-1.5 px-2 pb-[max(0.375rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg max-w-md mx-auto rounded-t-3xl"
    >
      {/* 1. Dashboard Tab */}
      <button
        id="bottom-nav-partner-dashboard"
        onClick={() => onSelectTab('dashboard')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
          currentTab === 'dashboard'
            ? 'text-emerald-700 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl transition-all ${currentTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : ''}`}>
          <Home className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">
          {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
        </span>
      </button>

      {/* 2. Jobs */}
      <button
        id="bottom-nav-partner-requests"
        onClick={() => onSelectTab('requests')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
          currentTab === 'requests'
            ? 'text-emerald-700 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl relative transition-all ${currentTab === 'requests' ? 'bg-emerald-50 text-emerald-700' : ''}`}>
          <Calendar className="w-5 h-5" />
          {activeRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              {activeRequestsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">
          {language === 'hi' ? 'जॉब्स' : 'Jobs'}
        </span>
      </button>

      {/* 3. Earnings */}
      <button
        id="bottom-nav-partner-earnings"
        onClick={() => {
          onSelectTab('earnings');
          onOpenPayments();
        }}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
          currentTab === 'earnings'
            ? 'text-emerald-700 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl transition-all ${currentTab === 'earnings' ? 'bg-emerald-50 text-emerald-700' : ''}`}>
          <Wallet className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">
          {language === 'hi' ? 'कमाई' : 'Earnings'}
        </span>
      </button>

      {/* 4. Notifications */}
      <button
        id="bottom-nav-partner-notifications"
        onClick={() => {
          if (onOpenNotifications) {
            onOpenNotifications();
          } else {
            onSelectTab('requests');
          }
        }}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer text-slate-500 hover:text-slate-800 font-semibold relative"
      >
        <div className="p-1 rounded-xl relative">
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">
          {language === 'hi' ? 'सूचनाएं' : 'Notifications'}
        </span>
      </button>

      {/* 5. Profile */}
      <button
        id="bottom-nav-partner-profile"
        onClick={() => {
          onSelectTab('profile');
          onOpenProfile();
        }}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
          currentTab === 'profile'
            ? 'text-emerald-700 font-black'
            : 'text-slate-500 hover:text-slate-800 font-semibold'
        }`}
      >
        <div className={`p-1 rounded-xl transition-all ${currentTab === 'profile' ? 'bg-emerald-50 text-emerald-700' : ''}`}>
          <User className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-bold">
          {language === 'hi' ? 'प्रोफाइल' : 'Profile'}
        </span>
      </button>
    </nav>
  );
};

