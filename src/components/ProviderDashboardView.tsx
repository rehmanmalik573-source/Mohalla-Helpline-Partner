import React, { useState } from 'react';
import { 
  Provider, 
  ServiceRequest, 
  RequestStatus, 
  Language, 
  Category 
} from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  IndianRupee, 
  Star, 
  RefreshCw, 
  User, 
  Wrench, 
  Calendar,
  Sparkles,
  PlusCircle,
  TrendingUp,
  FileText,
  Briefcase,
  Wallet,
  Tag,
  Upload,
  Check
} from 'lucide-react';

interface ProviderDashboardViewProps {
  provider: Provider;
  requests: ServiceRequest[];
  categories: Category[];
  language: Language;
  onUpdateStatus: (requestId: string, newStatus: RequestStatus) => void;
  onUpdateProvider: (updatedPro: Partial<Provider>) => void;
  onSimulateNewRequest?: () => void;
  onOpenHelpSupport: () => void;
  onOpenProfileModal: () => void;
  activeMainTab?: 'dashboard' | 'requests' | 'earnings' | 'profile';
  onChangeMainTab?: (tab: 'dashboard' | 'requests' | 'earnings' | 'profile') => void;
}

export const ProviderDashboardView: React.FC<ProviderDashboardViewProps> = ({
  provider,
  requests,
  categories,
  language,
  onUpdateStatus,
  onUpdateProvider,
  onSimulateNewRequest,
  onOpenHelpSupport,
  onOpenProfileModal,
  activeMainTab = 'dashboard',
  onChangeMainTab,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState(false);
  const [activeRequestFilter, setActiveRequestFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [kycResubmitted, setKycResubmitted] = useState(false);
  const [newRequestNotification, setNewRequestNotification] = useState(false);

  const t = translations[language];

  // Filter requests belonging to this provider or matching their category
  const myCategoryRequests = requests.filter(r => 
    r.categoryId === provider?.categoryId || r.assignedProvider?.id === provider?.id
  );

  const pendingRequests = myCategoryRequests.filter(r => r.status === 'requested' || r.status === 'provider_found');
  const activeJobs = myCategoryRequests.filter(r => r.status === 'accepted' || r.status === 'on_the_way' || r.status === 'service_started');
  const completedJobs = myCategoryRequests.filter(r => r.status === 'completed');

  const filteredRequests = myCategoryRequests.filter((req) => {
    if (activeRequestFilter === 'pending') {
      return req.status === 'requested' || req.status === 'provider_found';
    }
    if (activeRequestFilter === 'active') {
      return req.status === 'accepted' || req.status === 'on_the_way' || req.status === 'service_started';
    }
    if (activeRequestFilter === 'completed') {
      return req.status === 'completed' || req.status === 'cancelled';
    }
    return true;
  });

  const isRejected = provider?.verificationStatus === 'rejected';
  const isPending = provider?.verificationStatus === 'pending';
  const isVerified = Boolean(provider?.verificationStatus === 'verified' && provider?.isVerified);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshNotice(true);
      setTimeout(() => setRefreshNotice(false), 2000);
    }, 600);
  };

  const toggleOnline = () => {
    if (isRejected) {
      alert(language === 'hi'
        ? 'सत्यापन अस्वीकृत होने के कारण आप ऑनलाइन नहीं जा सकते। कृपया अपने दस्तावेज पुनः सबमिट करें।'
        : 'Cannot go online: Account verification rejected. Please re-submit your KYC documents.');
      return;
    }
    if (isPending) {
      alert(language === 'hi'
        ? 'सत्यापन प्रक्रियाधीन है। एडमिन द्वारा स्वीकृति के बाद आप ऑनलाइन हो सकेंगे।'
        : 'Verification is pending. You can go online once approved by Admin.');
      return;
    }
    onUpdateProvider({ isAvailableNow: !provider.isAvailableNow });
  };

  const handleResubmitKyc = () => {
    onUpdateProvider({
      verificationStatus: 'pending',
      isVerified: false,
      verificationNotes: undefined,
    });
    setKycResubmitted(true);
    setTimeout(() => setKycResubmitted(false), 2500);
  };

  const handleTriggerSimulateRequest = () => {
    if (onSimulateNewRequest) {
      onSimulateNewRequest();
      setNewRequestNotification(true);
      setTimeout(() => setNewRequestNotification(false), 3000);
    }
  };

  return (
    <div id="mohalla-partner-dashboard-container" className="max-w-md mx-auto min-h-screen bg-[#F7F9F8] pb-24 text-slate-900 font-sans">
      
      {/* 1. GREEN TOP CANOPY (Seamless extension of top bar) */}
      <div className="bg-gradient-to-b from-[#065F46] to-[#047857] pt-2 pb-14 px-4 rounded-b-[2rem] shadow-sm">
        {/* Subtle status notice inside canopy if needed */}
        {refreshNotice && (
          <div className="py-1 px-3 bg-emerald-800/80 border border-emerald-500/50 text-emerald-100 text-center rounded-full text-[11px] font-bold animate-in fade-in max-w-xs mx-auto mb-2">
            ✓ {t.updatedJustNow}
          </div>
        )}
      </div>

      {/* 2. MAIN FLOATING PARTNER PROFILE CARD */}
      <div className="px-4 -mt-12 space-y-4">
        <div 
          id="partner-profile-floating-card"
          className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 space-y-3.5 transition-all"
        >
          {/* Top Profile Info & Online Switch */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Avatar & Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={provider?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'}
                  alt={provider?.name || 'Partner'}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500 shadow-xs cursor-pointer hover:opacity-95"
                  onClick={onOpenProfileModal}
                />
                {isVerified && (
                  <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                {/* Partner Name + Green Verified Check */}
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-black text-slate-900 truncate">
                    {language === 'hi' ? (provider?.nameHi || provider?.name) : provider?.name}
                  </h2>
                  {isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                  )}
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 text-xs font-bold text-slate-700 mt-0.5">
                  <span className="text-amber-500 font-extrabold">{provider?.rating || 4.8}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="text-slate-400 font-semibold">({provider?.reviewCount || 156} {language === 'hi' ? 'रिव्यूज' : 'Reviews'})</span>
                </div>

                {/* Live Online Status Indicator */}
                <div className="flex items-center gap-1.5 text-xs font-bold mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${
                    isRejected 
                      ? 'bg-rose-500' 
                      : provider?.isAvailableNow 
                      ? 'bg-emerald-500 animate-pulse' 
                      : 'bg-slate-400'
                  }`}></span>
                  <span className={
                    isRejected 
                      ? 'text-rose-600 font-extrabold' 
                      : provider?.isAvailableNow 
                      ? 'text-emerald-700 font-black' 
                      : 'text-slate-500 font-semibold'
                  }>
                    {isRejected 
                      ? (language === 'hi' ? 'खाता अस्वीकृत' : 'Rejected') 
                      : provider?.isAvailableNow 
                      ? (language === 'hi' ? 'Online (उपलब्ध)' : 'Online') 
                      : (language === 'hi' ? 'Offline (अवकाश)' : 'Offline')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Modern iOS/Android Toggle Switch */}
            <div className="flex flex-col items-center shrink-0">
              <button
                id="partner-status-toggle-switch"
                onClick={toggleOnline}
                disabled={isRejected}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                  isRejected 
                    ? 'bg-slate-200 cursor-not-allowed opacity-60' 
                    : provider?.isAvailableNow 
                    ? 'bg-emerald-600' 
                    : 'bg-slate-300'
                }`}
                aria-label="Toggle Online Status"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                    provider?.isAvailableNow && !isRejected ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-[10px] text-slate-500 font-bold mt-1">
                {provider?.isAvailableNow && !isRejected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Sub-card: Verification Status & Member Since / Category */}
          <div className="bg-[#EBF7F2] rounded-2xl p-2.5 grid grid-cols-2 gap-2 border border-emerald-100/80 text-xs">
            {/* Left Column: Verification Status */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block leading-none">
                  {language === 'hi' ? 'वेरिफिकेशन' : 'Verification'}
                </span>
                <span className="font-extrabold text-emerald-800 truncate block mt-0.5">
                  {isVerified ? (language === 'hi' ? 'वेरिफाइड' : 'Verified') : isPending ? 'Pending' : 'Rejected'}
                </span>
              </div>
            </div>

            {/* Right Column: Member Since */}
            <div className="flex items-center gap-2 pl-2 border-l border-emerald-200/60">
              <div className="min-w-0">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block leading-none">
                  {language === 'hi' ? 'सदस्यता' : 'Member Since'}
                </span>
                <span className="font-extrabold text-slate-800 truncate block mt-0.5">
                  {language === 'hi' ? 'जनवरी 2024' : 'Jan 2024'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* REJECTION WARNING BANNER (If KYC fails) */}
        {isRejected && (
          <div 
            id="partner-rejected-banner"
            className="bg-rose-50 border border-rose-200 rounded-3xl p-4 text-rose-900 space-y-2 shadow-xs"
          >
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{language === 'hi' ? 'खाता सत्यापन अस्वीकृत' : 'Account Verification Rejected'}</span>
            </div>
            <p className="text-xs text-rose-700 font-semibold leading-relaxed">
              {provider.verificationNotes || (
                language === 'hi'
                  ? 'पहचान प्रमाण पत्र में त्रुटि के कारण आवेदन अस्वीकृत किया गया है। कृपया सही दस्तावेज सबमिट करें।'
                  : 'Your ID proof failed compliance checks. Please re-submit valid KYC documents.'
              )}
            </p>
            <div className="pt-1 flex items-center gap-2">
              {kycResubmitted ? (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
                  ✓ {language === 'hi' ? 'दस्तावेज सबमिट हुए' : 'KYC Re-submitted'}
                </span>
              ) : (
                <button
                  onClick={handleResubmitKyc}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'दस्तावेज पुनः सबमिट करें' : 'Re-submit KYC'}</span>
                </button>
              )}
              <button
                onClick={onOpenHelpSupport}
                className="px-3 py-1.5 bg-white border border-rose-300 text-rose-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                {language === 'hi' ? 'हेल्पलाइन' : 'Support'}
              </button>
            </div>
          </div>
        )}

        {/* PENDING VERIFICATION NOTICE */}
        {isPending && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-3.5 text-amber-900 flex items-center gap-2.5 shadow-2xs">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 font-bold leading-snug">
              {language === 'hi'
                ? 'दस्तावेज सत्यापन प्रक्रियाधीन है। टीम जल्द ही स्वीकृति प्रदान करेगी।'
                : 'KYC Verification is under review. You will receive orders once approved.'}
            </p>
          </div>
        )}

        {/* SIMULATED NEW REQUEST POPUP NOTIFICATION */}
        {newRequestNotification && (
          <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs font-black flex items-center justify-between shadow-lg animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-base">🔔</span>
              <span>{language === 'hi' ? 'नई ग्राहक सर्विस रिक्वेस्ट प्राप्त हुई!' : 'New Customer Request Received!'}</span>
            </div>
            <span className="text-[10px] bg-white text-emerald-800 px-2 py-0.5 rounded-lg font-extrabold">8 New</span>
          </div>
        )}

        {/* 3. TODAY'S OVERVIEW (2x2 Grid of Pastel Cards from Reference Screenshot) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              {language === 'hi' ? "आज का विवरण (Today's Overview)" : "Today's Overview"}
            </h3>
            <button 
              onClick={() => setActiveRequestFilter('all')}
              className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              {language === 'hi' ? 'सभी देखें' : 'View All'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Card 1: New Requests (Light Mint / Emerald) */}
            <div 
              id="metric-card-new-requests"
              onClick={() => setActiveRequestFilter('pending')}
              className="bg-[#E8F8F0] border border-[#D1F2E0] p-3.5 rounded-2xl space-y-2 cursor-pointer hover:border-emerald-400 transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-600 font-bold block">
                  {language === 'hi' ? 'नई रिक्वेस्ट्स' : 'New Requests'}
                </span>
                <span className="text-xl font-black text-slate-900 block mt-0.5">
                  {pendingRequests.length > 0 ? pendingRequests.length : 8}
                </span>
              </div>
            </div>

            {/* Card 2: Active Jobs (Light Sky Blue) */}
            <div 
              id="metric-card-active-jobs"
              onClick={() => setActiveRequestFilter('active')}
              className="bg-[#EBF5FF] border border-[#D6EBFF] p-3.5 rounded-2xl space-y-2 cursor-pointer hover:border-blue-400 transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-600 font-bold block">
                  {language === 'hi' ? 'चालू काम' : 'Active Jobs'}
                </span>
                <span className="text-xl font-black text-slate-900 block mt-0.5">
                  {activeJobs.length > 0 ? activeJobs.length : 3}
                </span>
              </div>
            </div>

            {/* Card 3: Completed Today (Light Lavender / Purple) */}
            <div 
              id="metric-card-completed-today"
              onClick={() => setActiveRequestFilter('completed')}
              className="bg-[#F3EBF9] border border-[#E9D9F5] p-3.5 rounded-2xl space-y-2 cursor-pointer hover:border-purple-400 transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-600 font-bold block">
                  {language === 'hi' ? 'आज पूरे किए' : 'Completed Today'}
                </span>
                <span className="text-xl font-black text-slate-900 block mt-0.5">
                  {completedJobs.length > 0 ? completedJobs.length : 5}
                </span>
              </div>
            </div>

            {/* Card 4: Today's Earnings (Light Warm Cream / Amber) */}
            <div 
              id="metric-card-today-earnings"
              onClick={() => onChangeMainTab && onChangeMainTab('earnings')}
              className="bg-[#FFF8E6] border border-[#FFEFC2] p-3.5 rounded-2xl space-y-2 cursor-pointer hover:border-amber-400 transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-600 font-bold block">
                  {language === 'hi' ? 'आज की कमाई' : "Today's Earnings"}
                </span>
                <span className="text-xl font-black text-slate-900 block mt-0.5">
                  ₹2,450
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. QUICK ACTIONS (4 Round Squircles Matching Reference Screenshot) */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-black text-slate-900 tracking-tight">
            {language === 'hi' ? 'त्वरित कार्य (Quick Actions)' : 'Quick Actions'}
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {/* Quick Action 1: New Requests (Green) */}
            <button
              id="quick-action-new-requests"
              onClick={() => {
                setActiveRequestFilter('pending');
                const reqEl = document.getElementById('partner-requests-section');
                reqEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 leading-tight">
                {language === 'hi' ? 'नई रिक्वेस्ट्स' : 'New Requests'}
              </span>
            </button>

            {/* Quick Action 2: My Jobs (Blue) */}
            <button
              id="quick-action-my-jobs"
              onClick={() => {
                setActiveRequestFilter('active');
                const reqEl = document.getElementById('partner-requests-section');
                reqEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 leading-tight">
                {language === 'hi' ? 'माई जॉब्स' : 'My Jobs'}
              </span>
            </button>

            {/* Quick Action 3: Earnings (Amber) */}
            <button
              id="quick-action-earnings"
              onClick={() => onChangeMainTab && onChangeMainTab('earnings')}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 leading-tight">
                {language === 'hi' ? 'कमाई' : 'Earnings'}
              </span>
            </button>

            {/* Quick Action 4: Profile (Purple) */}
            <button
              id="quick-action-profile"
              onClick={onOpenProfileModal}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 leading-tight">
                {language === 'hi' ? 'प्रोफाइल' : 'Profile'}
              </span>
            </button>
          </div>
        </div>

        {/* 5. TOTAL EARNINGS BANNER (Dark Emerald Green Card with Bar Graphic) */}
        <div 
          id="total-earnings-banner"
          className="bg-gradient-to-r from-[#064E3B] via-[#065F46] to-[#047857] text-white rounded-3xl p-4.5 sm:p-5 shadow-sm relative overflow-hidden flex items-center justify-between"
        >
          {/* Left Column: Earnings & Growth */}
          <div className="space-y-1 z-10">
            <span className="text-xs text-emerald-100/80 font-bold uppercase tracking-wider block">
              {language === 'hi' ? 'कुल मासिक कमाई (Total Earnings)' : 'Total Earnings'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ₹48,750
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-emerald-200/90 font-medium">
                {language === 'hi' ? 'इस महीने (This Month)' : 'This Month'}
              </span>
              <span className="text-emerald-300 font-extrabold flex items-center gap-0.5 bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" />
                <span>↑ 12%</span>
              </span>
            </div>
          </div>

          {/* Right Column: Stylized Bar Chart Graphic (translucent bars) */}
          <div className="flex items-end gap-1.5 h-14 pr-2 z-10 shrink-0">
            <div className="w-2.5 bg-emerald-300/40 rounded-full h-6"></div>
            <div className="w-2.5 bg-emerald-300/60 rounded-full h-10"></div>
            <div className="w-2.5 bg-emerald-300/30 rounded-full h-5"></div>
            <div className="w-2.5 bg-emerald-300/80 rounded-full h-14"></div>
            <div className="w-2.5 bg-emerald-300/50 rounded-full h-9"></div>
          </div>

          {/* Subtle Background Glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
        </div>

        {/* 6. SERVICE REQUESTS SECTION (With Filter Tabs & Accept/Decline Controls) */}
        <div id="partner-requests-section" className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              {language === 'hi' ? 'सर्विस रिक्वेस्ट्स व सक्रिय काम' : 'Service Requests & Active Jobs'}
            </h3>

            {/* Test Simulation Button */}
            {onSimulateNewRequest && (
              <button
                id="simulate-request-btn"
                onClick={handleTriggerSimulateRequest}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-black cursor-pointer flex items-center gap-1 transition-colors"
                title="Simulate receiving a new customer service request"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'hi' ? '+ नई रिक्वेस्ट लाएं' : '+ Simulate Request'}</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl text-[11px] font-bold overflow-x-auto">
            <button
              onClick={() => setActiveRequestFilter('all')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeRequestFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? `सभी (${myCategoryRequests.length})` : `All (${myCategoryRequests.length})`}
            </button>
            <button
              onClick={() => setActiveRequestFilter('pending')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeRequestFilter === 'pending' ? 'bg-emerald-600 text-white shadow-2xs font-black' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? `नई (${pendingRequests.length})` : `New Requests (${pendingRequests.length})`}
            </button>
            <button
              onClick={() => setActiveRequestFilter('active')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeRequestFilter === 'active' ? 'bg-blue-600 text-white shadow-2xs font-black' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? `चालू (${activeJobs.length})` : `Active (${activeJobs.length})`}
            </button>
            <button
              onClick={() => setActiveRequestFilter('completed')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeRequestFilter === 'completed' ? 'bg-slate-800 text-white shadow-2xs font-black' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? `पूर्ण (${completedJobs.length})` : `Completed (${completedJobs.length})`}
            </button>
          </div>

          {/* Requests Cards List */}
          <div className="space-y-3">
            {filteredRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 space-y-2">
                <div className="text-3xl">📭</div>
                <h4 className="text-xs font-bold text-slate-800">
                  {language === 'hi' ? 'कोई सर्विस रिक्वेस्ट नहीं है' : 'No service requests found'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' 
                    ? 'नई ग्राहक रिक्वेस्ट का परीक्षण करने के लिए ऊपर "+ नई रिक्वेस्ट लाएं" पर क्लिक करें।' 
                    : 'Use "+ Simulate Request" to test incoming bookings in real-time.'}
                </p>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isAccepted = req.status === 'accepted' || req.status === 'on_the_way' || req.status === 'service_started';
                const isCompleted = req.status === 'completed';
                const isCancelled = req.status === 'cancelled';

                return (
                  <div
                    key={req.id}
                    id={`request-card-${req.id}`}
                    className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3 hover:border-emerald-300 transition-colors"
                  >
                    {/* Card Header: Service & Price Tag */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-emerald-700" />
                          <span>{req.serviceType}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          ₹{req.estimatedPrice}
                        </span>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        {req.problemDescription}
                      </p>
                    </div>

                    {/* Location & Time */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{req.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{req.preferredDate} ({req.preferredTime})</span>
                      </div>
                    </div>

                    {/* Customer Info & Direct Call Button */}
                    <div className="p-2.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs flex items-center justify-center shrink-0">
                          {req.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{req.customerName}</div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {isAccepted ? req.customerPhone : (language === 'hi' ? 'स्वीकार करने पर नंबर दिखेगा' : 'Phone visible after accept')}
                          </div>
                        </div>
                      </div>

                      {isAccepted && (
                        <a
                          href={`tel:${req.customerPhone}`}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{language === 'hi' ? 'कॉल' : 'Call'}</span>
                        </a>
                      )}
                    </div>

                    {/* Step Action Buttons (Accept/Decline or Progress flow) */}
                    <div className="pt-1 flex items-center gap-2">
                      {req.status === 'requested' || req.status === 'provider_found' ? (
                        <>
                          <button
                            id={`accept-btn-${req.id}`}
                            onClick={() => onUpdateStatus(req.id, 'accepted')}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{language === 'hi' ? 'स्वीकार करें (Accept)' : 'Accept'}</span>
                          </button>
                          <button
                            id={`decline-btn-${req.id}`}
                            onClick={() => onUpdateStatus(req.id, 'cancelled')}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-2xl text-xs font-bold cursor-pointer transition-colors border border-slate-200"
                          >
                            {language === 'hi' ? 'अस्वीकार (Decline)' : 'Decline'}
                          </button>
                        </>
                      ) : req.status === 'accepted' ? (
                        <button
                          id={`on-way-btn-${req.id}`}
                          onClick={() => onUpdateStatus(req.id, 'on_the_way')}
                          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>🛵 {language === 'hi' ? 'रास्ते में निकलें (Mark On The Way)' : 'Mark On The Way'}</span>
                        </button>
                      ) : req.status === 'on_the_way' ? (
                        <button
                          id={`start-service-btn-${req.id}`}
                          onClick={() => onUpdateStatus(req.id, 'service_started')}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>⚡ {language === 'hi' ? 'काम शुरू करें (Mark Service Started)' : 'Mark Service Started'}</span>
                        </button>
                      ) : req.status === 'service_started' ? (
                        <button
                          id={`complete-btn-${req.id}`}
                          onClick={() => onUpdateStatus(req.id, 'completed')}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>✓ {language === 'hi' ? `काम पूरा हुआ व ₹${req.estimatedPrice} भुगतान प्राप्त` : `Complete & Collect ₹${req.estimatedPrice}`}</span>
                        </button>
                      ) : isCompleted ? (
                        <div className="w-full p-2 bg-emerald-50 text-emerald-800 text-center rounded-2xl text-xs font-black flex items-center justify-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'hi' ? `काम पूरा हुआ • ₹${req.estimatedPrice} प्राप्त` : `Completed • Received ₹${req.estimatedPrice}`}</span>
                        </div>
                      ) : isCancelled ? (
                        <div className="w-full p-2 bg-rose-50 text-rose-800 text-center rounded-2xl text-xs font-bold flex items-center justify-center gap-1 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>{language === 'hi' ? 'जॉब रद्द / अस्वीकृत' : 'Cancelled / Declined'}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 7. RECENT RATINGS & CUSTOMER FEEDBACK */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{language === 'hi' ? 'ग्राहकों द्वारा रेटिंग व रिव्यू' : 'Customer Ratings & Reviews'}</span>
            </h3>
            <span className="text-xs font-black text-emerald-700">98% Positive</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Manoj Sharma • शाहदरा</span>
              <div className="flex items-center text-amber-500 font-bold text-[11px]">
                ★★★★★
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              {language === 'hi'
                ? '"राजेश जी समय के बहुत पाबंद हैं और किचन का लीकेज तुरंत सही कर दिया। बहुत बढ़िया काम!"'
                : '"Rajesh arrived quickly and fixed the kitchen leak smoothly. Very professional!"'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
