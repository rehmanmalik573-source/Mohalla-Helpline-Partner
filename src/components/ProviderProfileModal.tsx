import React, { useState } from 'react';
import { Provider, Language, Category } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  XCircle, 
  User, 
  MapPin, 
  Wrench, 
  Phone, 
  Star, 
  CheckCircle2, 
  Upload, 
  CreditCard, 
  AlertTriangle,
  Award,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProviderProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
  allProviders: Provider[];
  categories: Category[];
  language: Language;
  onUpdateProvider: (updatedPro: Partial<Provider>) => void;
  onSelectProvider: (provider: Provider) => void;
  onOpenJoinPro: () => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  isOpen,
  onClose,
  provider,
  allProviders,
  categories,
  language,
  onUpdateProvider,
  onSelectProvider,
  onOpenJoinPro,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'kyc' | 'switch'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(provider.name);
  const [phone, setPhone] = useState(provider.phone || '+91 98765 43210');
  const [hourlyRate, setHourlyRate] = useState(provider.hourlyRate || 299);
  const [experienceYears, setExperienceYears] = useState(provider.experienceYears || 5);
  const [bio, setBio] = useState(provider.bio || '');
  const [kycResubmitted, setKycResubmitted] = useState(false);

  if (!isOpen) return null;
  const t = translations[language];

  const isRejected = provider.verificationStatus === 'rejected';
  const isPending = provider.verificationStatus === 'pending';
  const isVerified = provider.verificationStatus === 'verified' && provider.isVerified;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProvider({
      name,
      phone,
      hourlyRate: Number(hourlyRate),
      experienceYears: Number(experienceYears),
      bio,
    });
    setIsEditing(false);
  };

  const handleResubmitKyc = () => {
    onUpdateProvider({
      verificationStatus: 'pending',
      isVerified: false,
      verificationNotes: undefined,
    });
    setKycResubmitted(true);
    setTimeout(() => {
      setKycResubmitted(false);
    }, 2500);
  };

  return (
    <div 
      id="partner-profile-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="partner-profile-modal"
        className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {language === 'hi' ? 'पार्टनर प्रोफाइल व सत्यापन' : 'Partner Profile & Verification'}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'दस्तावेज़, कार्य विवरण व अकाउंट सेटिंग्स' : 'KYC, Service details & Account settings'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-extrabold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            👤 {language === 'hi' ? 'प्रोफाइल विवरण' : 'Profile'}
          </button>
          <button
            onClick={() => setActiveSubTab('kyc')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'kyc' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            🛡️ {language === 'hi' ? 'KYC सत्यापन' : 'KYC & Badges'}
          </button>
          <button
            onClick={() => setActiveSubTab('switch')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'switch' ? 'bg-white text-amber-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            🔄 {language === 'hi' ? 'प्रोफाइल बदलें' : 'Switch Partner'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 flex-1 pr-1">
          {/* TAB 1: PROFILE DETAILS */}
          {activeSubTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Card Summary */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-amber-400 shrink-0">
                    <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                    {isVerified && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">
                      {language === 'hi' ? provider.nameHi : provider.name}
                    </div>
                    <div className="text-xs font-bold text-amber-800">
                      {language === 'hi' ? provider.categoryNameHi : provider.categoryName}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-black text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{provider.rating} ({provider.reviewCount})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                    {provider.jobsCompleted || 100}+ Jobs Done
                  </span>
                </div>
              </div>

              {/* Editing Mode vs View Mode */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name / नाम</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / मोबाइल</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Rate (₹/hr) / दर</label>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        required
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bio & Experience / परिचय</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Service Category:</span>
                    <span className="font-bold text-slate-900">{provider.categoryName}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Hourly Rate:</span>
                    <span className="font-bold text-emerald-700">₹{provider.hourlyRate}/hr</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Experience:</span>
                    <span className="font-bold text-slate-900">{provider.experienceYears} Years</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Phone Number:</span>
                    <span className="font-bold text-slate-900">{provider.phone || '+91 98765 43210'}</span>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-colors"
                  >
                    ✏️ Edit Profile Details
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KYC & VERIFICATION */}
          {activeSubTab === 'kyc' && (
            <div className="space-y-3 text-xs">
              {/* Status Banner */}
              <div className={`p-4 rounded-2xl border ${
                isVerified
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isPending
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm">
                  {isVerified ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>{language === 'hi' ? 'सत्यापित पार्टनर (Verified Partner)' : 'Verified Partner ✓'}</span>
                    </>
                  ) : isPending ? (
                    <>
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span>{language === 'hi' ? 'सत्यापन प्रक्रियाधीन (Under Review)' : 'Verification Pending ⏳'}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>{language === 'hi' ? 'सत्यापन अस्वीकृत (Rejected)' : 'Verification Rejected ✕'}</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] mt-1.5 leading-relaxed">
                  {isVerified
                    ? 'Your identity documents (Aadhaar & Trade Certification) are 100% verified. You are visible to neighborhood customers.'
                    : isPending
                    ? 'Your documents have been submitted to Mohalla Helpline Compliance Team. Average verification time is 2-4 hours.'
                    : provider.verificationNotes || 'Document mismatch in Aadhaar and Trade proof. Please re-submit clear photos.'}
                </p>
              </div>

              {/* Document Details */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Uploaded Verification Documents
                </span>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🪪</span>
                    <div>
                      <div className="font-bold text-slate-900">Aadhaar Card (UIDAI)</div>
                      <div className="text-[10px] text-slate-400">XXXX-XXXX-8921 • PDF Verified</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isVerified ? 'bg-emerald-50 text-emerald-700' : isPending ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {isVerified ? 'Verified' : isPending ? 'In Review' : 'Rejected'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📜</span>
                    <div>
                      <div className="font-bold text-slate-900">Skill / Trade Certificate</div>
                      <div className="text-[10px] text-slate-400">Delhi ITI Certified • 9 Yrs Exp</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isVerified ? 'bg-emerald-50 text-emerald-700' : isPending ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {isVerified ? 'Verified' : isPending ? 'In Review' : 'Rejected'}
                  </span>
                </div>
              </div>

              {/* Re-submit KYC button for Rejected or Pending */}
              {isRejected && (
                <div className="space-y-2">
                  {kycResubmitted ? (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-center font-bold">
                      ✓ KYC Re-submitted successfully! Status moved to Pending.
                    </div>
                  ) : (
                    <button
                      onClick={handleResubmitKyc}
                      className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Re-submit Corrected KYC Documents</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SWITCH PARTNER TEST PROFILE */}
          {activeSubTab === 'switch' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl text-amber-900">
                <div className="font-black text-xs">Partner Test Profiles</div>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Select any partner profile below to test different categories (Plumber, Electrician, Carpenter), verification states (Verified, Pending, Rejected), and incoming requests.
                </p>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {allProviders.map((p) => {
                  const isCurrent = p.id === provider.id;
                  const pVerified = p.verificationStatus === 'verified' && p.isVerified;
                  const pPending = p.verificationStatus === 'pending';
                  const pRejected = p.verificationStatus === 'rejected';

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProvider(p);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-300'
                          : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" />
                        <div>
                          <div className="font-black text-slate-900 flex items-center gap-1.5">
                            <span>{language === 'hi' ? p.nameHi : p.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {p.categoryName} • {p.location} • ₹{p.hourlyRate}/hr
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          pVerified ? 'bg-emerald-100 text-emerald-800' : pPending ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {pVerified ? '✓ Verified' : pPending ? '⏳ Pending' : '✕ Rejected'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenJoinPro();
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>➕ Register New Partner Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
