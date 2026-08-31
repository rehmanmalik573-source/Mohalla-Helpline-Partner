import React, { useState } from 'react';
import { CustomerProfile, Language, ServiceRequest } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  CheckCircle2, 
  Camera,
  ClipboardList,
  Sparkles
} from 'lucide-react';

interface CustomerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerProfile | null;
  language: Language;
  requestsCount: number;
  onUpdateProfile: (updated: CustomerProfile) => void;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenRequests: () => void;
}

export const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({
  isOpen,
  onClose,
  customer,
  language,
  requestsCount,
  onUpdateProfile,
  onLogout,
  onOpenLogin,
  onOpenRequests,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customer?.name || '');
  const [locality, setLocality] = useState(customer?.locality || 'शाहदरा, दिल्ली');

  React.useEffect(() => {
    if (customer) {
      setName(customer.name);
      setLocality(customer.locality);
    }
  }, [customer]);

  if (!isOpen) return null;

  const t = translations[language];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    const updated: CustomerProfile = {
      ...customer,
      name: name.trim(),
      locality: locality,
    };
    onUpdateProfile(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="customer-profile-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm sm:text-base font-bold">{t.profile}</h2>
              <p className="text-[11px] text-slate-300">
                {t.appName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          {customer && customer.isLoggedIn ? (
            <>
              {/* Profile Card */}
              <div className="bg-gradient-to-b from-amber-50/70 to-orange-50/40 border border-amber-200 rounded-3xl p-5 text-center relative overflow-hidden">
                <div className="relative inline-block mx-auto mb-3">
                  <img
                    src={customer.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'}
                    alt={customer.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-400 shadow-md mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xs" title="Verified Customer">
                    ✓
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {customer.name}
                </h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{customer.locality}</span>
                </p>

                <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">मोबाइल</span>
                    <span className="font-bold text-slate-900">{customer.phone}</span>
                  </div>
                  <div className="h-6 w-px bg-amber-200"></div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">मेंबरशिप</span>
                    <span className="font-bold text-emerald-700">सक्रिय ग्राहक ✓</span>
                  </div>
                </div>
              </div>

              {/* Edit Details or Form */}
              {isEditing ? (
                <form onSubmit={handleSave} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="text-xs font-bold text-slate-800 pb-1 border-b border-slate-200">
                    {language === 'hi' ? 'प्रोफाइल एडिट करें' : 'Edit Profile'}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">{t.fullName}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">{t.localityArea}</label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl p-2.5"
                    >
                      {t.locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                    >
                      {language === 'hi' ? 'सुरक्षित करें' : 'Save'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{language === 'hi' ? 'नाम व इलाका बदलें' : 'Edit Name & Locality'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenRequests();
                    }}
                    className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-2xl text-xs font-bold flex items-center justify-between px-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-amber-600" />
                      <span>{t.myRequests}</span>
                    </div>
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {requestsCount}
                    </span>
                  </button>
                </div>
              )}

              {/* Trust Badge */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{language === 'hi' ? '100% वेरिफाइड ग्राहक सुरक्षा' : '100% Verified Customer Protection'}</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">
                    {language === 'hi' ? 'सभी प्रोफेशनल्स बैकग्राउंड वेरिफाइड व लोकल हैं।' : 'All professionals are local & background verified.'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Guest / Not logged in state */
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'लॉगिन नहीं हैं' : 'Not Logged In'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {language === 'hi' ? 'मोबाइल नंबर व OTP द्वारा 10 सेकंड में लॉगिन करें।' : 'Login in 10 seconds using mobile & OTP.'}
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-amber-500/20 cursor-pointer"
              >
                {t.loginRegister}
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {customer?.isLoggedIn && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              id="customer-logout-btn"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 cursor-pointer py-1"
            >
              <LogOut className="w-4 h-4" />
              <span>{language === 'hi' ? 'लॉगआउट करें' : 'Logout'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
