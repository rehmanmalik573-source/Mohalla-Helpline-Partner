import React, { useState } from 'react';
import { 
  Menu, 
  MapPin, 
  ChevronDown, 
  Bell, 
  X, 
  Check, 
  PhoneCall, 
  ShieldCheck, 
  Home, 
  ClipboardList, 
  User, 
  HelpCircle, 
  CreditCard, 
  Star, 
  Info, 
  Settings, 
  LogOut, 
  Users, 
  Wrench, 
  Power,
  ArrowRight,
  Clock,
  XCircle,
  Sparkles
} from 'lucide-react';
import { Language, ServiceRequest, Provider, CustomerNotification } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  requests: ServiceRequest[];
  provider: Provider;
  notifications: CustomerNotification[];
  onNavigate: (view: 'provider_dashboard') => void;
  onOpenRequestsTab: () => void;
  onOpenProfile: () => void;
  onOpenJoinPro: () => void;
  onOpenHelpSupport: () => void;
  onOpenPayments: () => void;
  onOpenReviews: () => void;
  onOpenAbout: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onToggleOnline: () => void;
  onMarkNotificationRead?: (id?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  currentLocation,
  onLocationChange,
  requests,
  provider,
  notifications,
  onNavigate,
  onOpenRequestsTab,
  onOpenProfile,
  onOpenJoinPro,
  onOpenHelpSupport,
  onOpenPayments,
  onOpenReviews,
  onOpenAbout,
  onOpenSettings,
  onLogout,
  onToggleOnline,
  onMarkNotificationRead,
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const t = translations[language];
  const activeRequestsCount = requests.filter(
    r => r.status !== 'completed' && r.status !== 'cancelled'
  ).length;

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const isRejected = provider?.verificationStatus === 'rejected';
  const isPending = provider?.verificationStatus === 'pending';
  const isVerified = Boolean(provider?.verificationStatus === 'verified' && provider?.isVerified);

  return (
    <header id="mohalla-partner-header" className="sticky top-0 z-40 bg-[#065F46] text-white shadow-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Hamburger & Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-600/50 transition-colors cursor-pointer shrink-0"
            aria-label="Partner Menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Greeting: Namaste, Rajesh 👋 / Good Morning! */}
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-black text-white flex items-center gap-1.5 truncate">
              <span>
                {language === 'hi' 
                  ? `नमस्ते, ${provider?.nameHi ? provider.nameHi.split(' ')[0] : 'राजेश'} 👋` 
                  : `Namaste, ${provider?.name ? provider.name.split(' ')[0] : 'Rajesh'} 👋`}
              </span>
            </div>
            <div className="text-[11px] text-emerald-100/90 font-semibold truncate">
              {language === 'hi' ? 'सुप्रभात!' : 'Good Morning!'}
            </div>
          </div>
        </div>

        {/* Right: Language Switcher Pill & Notification Bell */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher Pill matching Screenshot */}
          <button
            id="header-lang-toggle-btn"
            type="button"
            onClick={() => onToggleLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1 rounded-full bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-500/60 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs flex items-center gap-1"
            title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            <span>{language === 'hi' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              id="notification-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-600/50 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Partner Notifications"
            >
              <Bell className="w-4 h-4 text-white" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-[#065F46] animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Popup */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />
                
                <div 
                  id="notifications-popup"
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 p-3.5 z-50 space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 font-black text-xs text-slate-900">
                      <Bell className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'hi' ? 'पार्टनर नोटिफिकेशन्स' : 'Partner Notifications'}</span>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={() => onMarkNotificationRead && onMarkNotificationRead()}
                        className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                      >
                        {language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
                      </button>
                    )}
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">
                        {language === 'hi' ? 'कोई नया नोटिफिकेशन नहीं है।' : 'No new notifications.'}
                      </p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => {
                            if (onMarkNotificationRead) onMarkNotificationRead(n.id);
                            if (n.requestId) onOpenRequestsTab();
                            setShowNotifications(false);
                          }}
                          className={`p-2.5 rounded-2xl text-xs transition-colors cursor-pointer border ${
                            n.read ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-emerald-50/70 border-emerald-200 text-slate-900 font-semibold'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between gap-1 text-slate-900">
                            <span>{language === 'hi' ? n.titleHi : n.title}</span>
                            <span className="text-[9px] text-slate-400 font-normal shrink-0">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {language === 'hi' ? n.messageHi : n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Hamburger Menu Drawer for Mohalla Helpline Partner */}
      {isMobileMenuOpen && (
        <div 
          id="hamburger-menu-overlay"
          className="fixed inset-0 z-[100] bg-slate-950/65 backdrop-blur-xs flex justify-start items-stretch animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
        >
          <div 
            id="hamburger-menu-drawer"
            className="w-80 max-w-[85vw] bg-white h-screen h-[100dvh] max-h-screen shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                  M
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 tracking-tight">
                    MOHALLA <span className="text-amber-500">PARTNER</span>
                  </div>
                  <div className="text-[9px] text-amber-800 font-bold">{t.tagline}</div>
                </div>
              </div>

              <button
                id="close-hamburger-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-rose-600 flex items-center justify-center cursor-pointer transition-colors shadow-2xs border border-slate-200"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Provider Menu Items */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 py-3 space-y-3 overscroll-contain">
              {/* Partner Profile Mini Card */}
              <div 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-amber-300 ring-2 ring-amber-400 shrink-0">
                    {provider?.avatar ? (
                      <img 
                        src={provider.avatar} 
                        alt={provider?.name || 'Partner'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber-500 text-white font-bold">
                        M
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 truncate max-w-[140px]">
                      {language === 'hi' ? (provider?.nameHi || provider?.name) : provider?.name}
                    </div>
                    <div className="text-[10px] text-amber-900 font-bold truncate max-w-[140px] flex items-center gap-1">
                      <span>{language === 'hi' ? (provider?.categoryNameHi || provider?.categoryName) : provider?.categoryName}</span>
                      <span>•</span>
                      <span>{isVerified ? '✓ Verified' : isPending ? '⏳ Pending' : '✕ Rejected'}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </div>

              {/* PROVIDER MENU ITEMS */}
              <div className="space-y-0.5 text-xs font-bold text-slate-700">
                {/* 1. Dashboard / Home */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('provider_dashboard');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>{language === 'hi' ? 'पार्टनर डैशबोर्ड' : 'Partner Dashboard'}</span>
                </button>

                {/* 2. Service Requests & Jobs */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRequestsTab();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-4 h-4 text-amber-600" />
                    <span>{t.serviceRequests}</span>
                  </div>
                  {activeRequestsCount > 0 && (
                    <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {activeRequestsCount}
                    </span>
                  )}
                </button>

                {/* 3. Notifications */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowNotifications(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span>{language === 'hi' ? 'सूचनाएं' : 'Notifications'}</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* 4. Verification & KYC Status */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-emerald-700 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.verificationStatus}</span>
                </button>

                {/* 5. Earnings & Payouts */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPayments();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>{t.earningsPayments}</span>
                </button>

                {/* 6. Ratings & Reviews */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenReviews();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{t.ratingsReviews}</span>
                </button>

                {/* 7. Switch / Register New Provider Profile */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenJoinPro();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-amber-700 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{language === 'hi' ? 'नया कारीगर रजिस्ट्रेशन / प्रोफाइल' : 'Switch / Register Partner'}</span>
                </button>

                {/* 8. Help & Support */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenHelpSupport();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>{t.helpSupport}</span>
                </button>

                {/* 9. 24x7 Partner Helpline */}
                <a
                  href="tel:18002026000"
                  className="w-full text-left px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 hover:bg-amber-100/80 flex items-center justify-between text-slate-900 cursor-pointer my-1"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-amber-700" />
                    <div>
                      <div className="text-xs font-black">{language === 'hi' ? '24x7 पार्टनर हेल्पलाइन' : '24x7 Partner Support'}</div>
                      <div className="text-[10px] text-amber-900 font-bold">1800-202-6000</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md">Call</span>
                </a>

                {/* 10. About Mohalla Helpline Partner */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAbout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>{t.aboutApp}</span>
                </button>

                {/* 11. Settings */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 flex items-center gap-3 text-slate-800 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-600" />
                  <span>{t.settings}</span>
                </button>

                {/* 12. Logout */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 flex items-center gap-3 text-rose-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>

            {/* Bottom Indicator */}
            <div className="py-2.5 px-4 border-t border-slate-100 bg-slate-50 text-center text-[10px] text-slate-400 font-semibold shrink-0">
              Mohalla Helpline Partner
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

