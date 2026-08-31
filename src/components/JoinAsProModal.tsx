import React, { useState } from 'react';
import { Category, Provider, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck, 
  Phone, 
  Briefcase, 
  Clock, 
  MapPin, 
  FileText, 
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface JoinAsProModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  language: Language;
  onAddProvider: (newProvider: Provider) => void;
}

export const JoinAsProModal: React.FC<JoinAsProModalProps> = ({
  isOpen,
  onClose,
  categories,
  language,
  onAddProvider,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'details' | 'verification' | 'success'>('phone');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [location, setLocation] = useState('शाहदरा, दिल्ली');
  const [hourlyRate, setHourlyRate] = useState('299');
  const [experience, setExperience] = useState('5');
  const [workingHours, setWorkingHours] = useState('09:00 AM - 08:00 PM');
  const [idProofType, setIdProofType] = useState('Aadhaar Card');
  const [uploadedDocName, setUploadedDocName] = useState('id_proof_document.pdf');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const t = translations[language];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    setStep('details');
  };

  const handleProceedToVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      return;
    }
    setErrorMsg('');
    setStep('verification');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCat = categories.find(c => c.id === categoryId) || categories[0];

    const newPro: Provider = {
      id: 'pro-' + Date.now(),
      name: name,
      nameHi: name,
      categoryId: selectedCat.id,
      categoryName: selectedCat.name,
      categoryNameHi: selectedCat.nameHi,
      title: `${selectedCat.name} Professional`,
      titleHi: `${selectedCat.nameHi} कारीगर`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      rating: 5.0,
      reviewCount: 0,
      hourlyRate: parseInt(hourlyRate) || 299,
      experienceYears: parseInt(experience) || 5,
      jobsCompleted: 0,
      distance: '0.5 km away',
      distanceHi: '0.5 किमी दूर',
      location: location,
      locationHi: location,
      isAvailableNow: true,
      isVerified: false,
      verificationStatus: 'pending',
      badge: 'Verification Pending',
      badgeHi: 'सत्यापन प्रक्रियाधीन',
      bio: `Professional ${selectedCat.name} serving ${location} with guaranteed quality. Hours: ${workingHours}`,
      bioHi: `${location} क्षेत्र में प्रामाणिक ${selectedCat.nameHi} सेवा। समय: ${workingHours}`,
      specialties: selectedCat.commonServices || ['General Service'],
      specialtiesHi: selectedCat.commonServicesHi || ['सामान्य सेवा'],
      gallery: [selectedCat.image],
      reviews: [],
      phone: `+91 ${phone}`,
      responseMinutes: 15
    };

    onAddProvider(newPro);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="join-pro-modal-box"
        className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step 1: Phone */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  {language === 'hi' ? 'कारीगर पोर्टल' : 'PROVIDER PORTAL'}
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  {language === 'hi' ? 'SERVICE DENA HAI / काम पाएं' : 'Join as a Service Provider'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              {language === 'hi'
                ? 'अपने मोबाइल नंबर से लॉगिन या नया रजिस्ट्रेशन करें और सीधे मोहल्ले के ग्राहकों से काम पाएं।'
                : 'Login or register with your mobile number to get direct job requests from local customers.'}
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <span className="text-xs font-bold text-slate-600 mr-2">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{language === 'hi' ? 'OTP प्राप्त करें' : 'Get OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900">
                {language === 'hi' ? '4 अंकों का OTP दर्ज करें' : 'Enter 4-Digit OTP'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? `OTP भेजा गया: +91 ${phone}` : `OTP sent to: +91 ${phone}`}
              </p>
            </div>

            <div className="flex justify-center gap-2 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    const newOtp = [...otp];
                    newOtp[idx] = val;
                    setOtp(newOtp);
                  }}
                  className="w-11 h-12 text-center text-lg font-black bg-slate-50 border border-slate-300 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer"
            >
              {language === 'hi' ? 'OTP सत्यापित करें' : 'Verify OTP'}
            </button>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToVerification} className="space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Briefcase className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900">
                {language === 'hi' ? 'व्यक्तिगत व कार्य विवरण' : 'Personal & Work Details'}
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">
                {language === 'hi' ? 'आपका पूरा नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'hi' ? 'जैसे: राजेश कुमार' : 'e.g. Rajesh Kumar'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {language === 'hi' ? 'काम / कैटेगरी' : 'Category'}
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === 'hi' ? c.nameHi : c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {language === 'hi' ? 'अनुभव (वर्ष)' : 'Experience (Yrs)'}
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {language === 'hi' ? 'शुरुआती रेट (₹)' : 'Hourly Rate (₹)'}
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {language === 'hi' ? 'काम के घंटे' : 'Working Hours'}
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">
                {language === 'hi' ? 'सेवा क्षेत्र / मोहल्ला' : 'Service Area / Locality'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{language === 'hi' ? 'दस्तावेज़ वेरिफिकेशन' : 'Proceed to Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 4: Verification Documents */}
        {step === 'verification' && (
          <form onSubmit={handleSubmitApplication} className="space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'hi' ? 'पहचान व सत्यापन दस्तावेज़' : 'Identity Verification'}
                </h3>
                <p className="text-[10px] text-slate-500">
                  {language === 'hi' ? 'दस्तावेज़ पूर्णतः गोपनीय रहेंगे' : 'Documents remain strictly private & confidential'}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 block">
                {language === 'hi' ? 'पहचान पत्र का प्रकार' : 'Document Type'}
              </label>
              <select
                value={idProofType}
                onChange={(e) => setIdProofType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
              >
                <option value="Aadhaar Card">Aadhaar Card (आधार कार्ड)</option>
                <option value="Driving License">Driving License (ड्राइविंग लाइसेंस)</option>
                <option value="Voter ID">Voter ID (मतदाता पहचान पत्र)</option>
                <option value="Trade Certificate">Trade Certificate / ITI डिप्लोमा</option>
              </select>
            </div>

            {/* Document Upload Box */}
            <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-1.5">
              <Upload className="w-6 h-6 text-slate-400 mx-auto" />
              <div className="text-xs font-bold text-slate-700">{uploadedDocName}</div>
              <p className="text-[10px] text-slate-400">
                {language === 'hi' ? 'दस्तावेज़ अपलोड हो चुका है' : 'Document attached for Admin review'}
              </p>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'सत्यापन के बाद आपकी प्रोफाइल पर वेरिफाइड टिक (Verified Badge) लग जाएगा।'
                  : 'After admin approval, the Verified Provider badge will be assigned to your profile.'}
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'hi' ? 'आवेदन सबमिट करें' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Success / Pending Confirmation */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'आवेदन सफलतापूर्वक दर्ज हुआ!' : 'Application Submitted!'}
            </h3>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              {language === 'hi' ? 'स्थिति: सत्यापन प्रक्रियाधीन (Pending)' : 'Status: Verification Pending'}
            </div>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              {language === 'hi'
                ? 'मोहल्ला हेल्पलाइन एडमिन द्वारा समीक्षा के बाद आपकी प्रोफाइल एक्टिवेट हो जाएगी।'
                : 'Mohalla Helpline admin will review your documents and approve your verified profile shortly.'}
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-800"
            >
              {language === 'hi' ? 'ठीक है' : 'Done'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
