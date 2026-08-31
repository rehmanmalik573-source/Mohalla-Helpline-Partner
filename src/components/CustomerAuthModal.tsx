import React, { useState, useEffect } from 'react';
import { CustomerProfile, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Phone, 
  KeyRound, 
  User, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Upload
} from 'lucide-react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentCustomer: CustomerProfile | null;
  onLoginSuccess: (profile: CustomerProfile) => void;
  initialPhone?: string;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  language,
  currentCustomer,
  onLoginSuccess,
  initialPhone = '',
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'details' | 'success'>('phone');
  const [phone, setPhone] = useState(initialPhone || '9876543210');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [resendTimer, setResendTimer] = useState(30);
  const [fullName, setFullName] = useState(currentCustomer?.name || 'अमित शर्मा (Amit Sharma)');
  const [locality, setLocality] = useState(currentCustomer?.locality || 'शाहदरा, दिल्ली');
  const [avatar, setAvatar] = useState(
    currentCustomer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'
  );
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = translations[language];

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      if (currentCustomer?.isLoggedIn) {
        setFullName(currentCustomer.name);
        setPhone(currentCustomer.phone.replace('+91 ', ''));
        setLocality(currentCustomer.locality);
        setAvatar(currentCustomer.avatar || '');
        setStep('details');
      } else {
        setStep('phone');
        setErrorMsg('');
      }
    }
  }, [isOpen, currentCustomer]);

  // Resend timer countdown
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOtp(randomOtp.split(''));
    setResendTimer(30);
    
    // Check if user already exists
    if (phone === '9876543210' || (currentCustomer && currentCustomer.phone.includes(phone))) {
      setIsExistingUser(true);
    } else {
      setIsExistingUser(false);
    }

    setStep('otp');
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
      setErrorMsg(language === 'hi' ? 'गलत OTP! कृपया पुनः प्रयास करें' : 'Incorrect OTP! Please try again');
      return;
    }
    setErrorMsg('');

    if (isExistingUser && currentCustomer?.name) {
      // Existing user: direct login
      const updatedProfile: CustomerProfile = {
        id: currentCustomer.id || 'cust-' + Date.now(),
        name: currentCustomer.name,
        phone: '+91 ' + phone,
        locality: currentCustomer.locality || locality,
        avatar: currentCustomer.avatar || avatar,
        isLoggedIn: true,
        registeredAt: currentCustomer.registeredAt || new Date().toLocaleDateString()
      };
      setStep('success');
      setTimeout(() => {
        onLoginSuccess(updatedProfile);
        onClose();
      }, 1000);
    } else {
      // New user: collect Name, Locality, and optional photo (NO Aadhaar/PAN)
      setStep('details');
    }
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      return;
    }

    const newProfile: CustomerProfile = {
      id: currentCustomer?.id || 'cust-' + Date.now(),
      name: fullName.trim(),
      phone: '+91 ' + phone,
      locality: locality,
      avatar: avatar,
      isLoggedIn: true,
      registeredAt: new Date().toLocaleDateString()
    };

    setStep('success');
    setTimeout(() => {
      onLoginSuccess(newProfile);
      onClose();
    }, 1000);
  };

  const handleAvatarSelect = (url: string) => {
    setAvatar(url);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="customer-auth-modal"
        className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 max-h-[92dvh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm">
              M
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
                {step === 'details' 
                  ? (language === 'hi' ? 'ग्राहक प्रोफाइल' : 'Customer Profile')
                  : (language === 'hi' ? 'ग्राहक लॉगिन / रजिस्ट्रेशन' : 'Customer Login / Register')}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Step 1: Mobile Number Input */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="p-4 sm:p-6 space-y-3.5">
              <div className="text-center space-y-0.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-1.5 text-lg sm:text-xl">
                  📱
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter Your Mobile Number'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {language === 'hi' ? 'हम वेरिफिकेशन के लिए 4-अंकों का OTP भेजेंगे।' : 'We will send a 4-digit verification OTP.'}
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                  {t.mobileNumber}
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 rounded-2xl px-3.5 py-2.5 sm:py-3 transition-all">
                  <span className="text-xs sm:text-sm font-bold text-slate-500 mr-2 border-r border-slate-200 pr-2">
                    🇮🇳 +91
                  </span>
                  <input
                    id="customer-auth-phone-input"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none tracking-wider"
                    autoFocus
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">{errorMsg}</p>
                )}
              </div>

              <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'hi' 
                    ? 'सुरक्षित व आसान: किसी भी आधार या पैन कार्ड की जरूरत नहीं है।' 
                    : 'Safe & Fast: No Aadhaar, PAN, or identity docs required.'}
                </span>
              </div>

              <button
                id="send-otp-btn"
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>{t.getOtp}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="p-4 sm:p-6 space-y-3.5">
              <div className="text-center space-y-0.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-1.5 text-lg sm:text-xl">
                  🔑
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {t.enterOtp}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {t.otpSentTo} <span className="font-bold text-slate-800">+91 {phone}</span>
                </p>
              </div>

              {/* OTP Demo Banner showing auto-filled OTP */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-800">
                <span className="font-bold">Auto-detected Demo OTP:</span>{' '}
                <span className="font-mono font-black text-xs sm:text-sm bg-emerald-200 px-2 py-0.5 rounded text-emerald-950">
                  {generatedOtp}
                </span>
              </div>

              {/* 4 Digit OTP Inputs */}
              <div className="flex justify-center gap-2.5 sm:gap-3 py-1">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      const newOtp = [...otp];
                      newOtp[idx] = val;
                      setOtp(newOtp);
                      if (val && idx < 3) {
                        const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl text-slate-900 focus:outline-none shadow-2xs"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-xs font-semibold text-rose-500 text-center">{errorMsg}</p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
                >
                  {language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                </button>

                {resendTimer > 0 ? (
                  <span>{resendTimer}s बाद पुनः भेजें</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(newOtp);
                      setOtp(newOtp.split(''));
                      setResendTimer(30);
                    }}
                    className="text-amber-600 hover:text-amber-700 font-bold cursor-pointer"
                  >
                    {t.resendOtp}
                  </button>
                )}
              </div>

              <button
                id="verify-otp-btn"
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-3 sm:py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>{t.verifyOtp}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 3: Minimal Customer Registration Details */}
          {step === 'details' && (
            <form onSubmit={handleSaveDetails} className="p-4 sm:p-6 space-y-3.5">
              <div className="text-center space-y-0.5">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'अपनी जानकारी दर्ज करें' : 'Enter Your Profile Details'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {language === 'hi' ? 'केवल नाम व इलाका आवश्यक है।' : 'Only name and locality are needed.'}
                </p>
              </div>

              {/* Avatar Selector */}
              <div className="flex flex-col items-center gap-1.5 pt-0.5">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ring-amber-400/40 shadow-xs"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-xs">
                    <Camera className="w-3 h-3" />
                  </div>
                </div>
                
                {/* Avatar quick selection */}
                <div className="flex gap-1.5 mt-0.5">
                  {sampleAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAvatarSelect(url)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 cursor-pointer transition-transform ${
                        avatar === url ? 'border-amber-500 scale-110 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                  {t.fullName} <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 sm:py-2.5 focus-within:border-amber-500">
                  <User className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    id="customer-full-name-input"
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'जैसे: राहुल वर्मा' : 'e.g. Rahul Verma'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Locality */}
              <div className="space-y-1">
                <label className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                  {t.localityArea} <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 sm:py-2.5 focus-within:border-amber-500">
                  <MapPin className="w-4 h-4 text-amber-600 mr-2" />
                  <select
                    id="customer-locality-select"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  >
                    {t.locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Number (Read-only / prefilled) */}
              <div className="space-y-1">
                <label className="text-[11px] sm:text-xs font-bold text-slate-800 block">
                  {t.mobileNumber}
                </label>
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-2xl px-3 py-2 text-slate-600 text-xs font-semibold">
                  <Phone className="w-3.5 h-3.5 text-slate-400 mr-2" />
                  <span>+91 {phone} (वेरिफाइड ✓)</span>
                </div>
              </div>

              <button
                id="save-profile-btn"
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>{language === 'hi' ? 'प्रोफाइल सुरक्षित करें व जारी रखें' : 'Save Profile & Continue'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 4: Success Message */}
          {step === 'success' && (
            <div className="p-6 sm:p-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 text-xl sm:text-2xl">
                ✓
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {t.loginSuccess}
              </h3>
              <p className="text-xs text-slate-600">
                {language === 'hi'
                  ? `स्वागत है, ${fullName}! आप अब सीधे सर्विसेज रिक्वेस्ट कर सकते हैं।`
                  : `Welcome, ${fullName}! You can now easily request any service.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
