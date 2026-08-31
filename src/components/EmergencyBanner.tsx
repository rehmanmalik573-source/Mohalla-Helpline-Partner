import React, { useState } from 'react';
import { Phone, PhoneCall, ShieldAlert, X, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { Language, Booking, Provider } from '../types';
import { translations } from '../data/translations';

interface EmergencyBannerProps {
  language: Language;
  onOpenEmergencyModal: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  language,
  onOpenEmergencyModal,
}) => {
  const t = translations[language];

  return (
    <section id="mohalla-emergency-banner" className="max-w-4xl mx-auto px-4 py-2">
      <div 
        onClick={onOpenEmergencyModal}
        className="bg-[#0B1A30] text-white rounded-2xl p-3.5 sm:p-4 shadow-md flex items-center justify-between gap-3 cursor-pointer hover:bg-[#0F2240] transition-colors border border-slate-800"
      >
        {/* Left: Siren + Text */}
        <div className="flex items-center gap-3">
          {/* Red Siren Icon Container */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="text-xl">🚨</span>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
              {t.emergencyTitle}
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              {t.emergencySubtitle}
            </p>
          </div>
        </div>

        {/* Right: White Helpline Pill Button */}
        <button
          id="emergency-helpline-pill-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpenEmergencyModal();
          }}
          className="bg-white hover:bg-slate-100 text-rose-600 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-600 text-rose-600" />
          <span>{t.helplineBtn}</span>
        </button>
      </div>
    </section>
  );
};

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  providers: Provider[];
  onConfirmEmergency: (booking: Booking) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language,
  providers,
  onConfirmEmergency,
}) => {
  const [phone, setPhone] = useState('+91 98765 00000');
  const [address, setAddress] = useState('शाहदरा, दिल्ली');
  const [problem, setProblem] = useState(
    language === 'hi' ? 'पाइप लीक / बिजली स्पार्किंग समस्या' : 'Urgent pipe leak / short circuit'
  );
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen) return null;

  const t = translations[language];
  const pro = providers[0];

  const handleDispatch = () => {
    const newEmergencyBooking: Booking = {
      id: 'EMG-' + Math.floor(100000 + Math.random() * 900000),
      providerId: pro.id,
      providerName: language === 'hi' ? pro.nameHi : pro.name,
      providerAvatar: pro.avatar,
      providerPhone: pro.phone,
      categoryId: pro.categoryId,
      categoryName: language === 'hi' ? pro.categoryNameHi : pro.categoryName,
      serviceType: problem,
      date: 'Today',
      timeSlot: '15-20 Mins Express Arrival',
      address: address,
      notes: problem,
      isEmergency: true,
      totalEstimatedCost: pro.hourlyRate + 50,
      status: 'on_the_way',
      createdAt: 'Just now'
    };

    setIsDispatched(true);
    setTimeout(() => {
      onConfirmEmergency(newEmergencyBooking);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="emergency-dispatch-popup"
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-lg">
              🚨
            </div>
            <div>
              <h2 className="text-base font-extrabold">{t.emergencyTitle}</h2>
              <p className="text-xs text-rose-300">
                {language === 'hi' ? '24x7 तत्काल ऑन-कॉल सहायता' : '24/7 Immediate On-Call Dispatch'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isDispatched ? (
          <div className="p-7 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'hi' ? 'टेक्नीशियन रवाना हो चुके हैं!' : 'Technician is En Route!'}
            </h3>
            <p className="text-xs text-slate-600">
              {language === 'hi' 
                ? '15-20 मिनट में आपके पते पर पहुंच रहे हैं। हेल्पलाइन कॉल: +91 98765 43210' 
                : 'Arriving in 15-20 mins. Direct phone: +91 98765 43210'}
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold mt-3"
            >
              {language === 'hi' ? 'बुकिंग्स में देखें' : 'View in Bookings'}
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900">
              <div className="font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>{language === 'hi' ? '15 मिनट में आगमन' : '15-Minute Priority Arrival'}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-rose-700">
                {language === 'hi' ? 'पाइप फटने, करंट स्पार्क या तुरंत ताला खोलने के लिए।' : 'For leaking burst pipes, spark/short circuit, lockouts.'}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'समस्या का विवरण' : 'Issue Description'}
              </label>
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'पता / इलाका' : 'Address / Locality'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href="tel:18002026000"
                className="flex-1 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                <span>{language === 'hi' ? 'डायरेक्ट कॉल' : 'Direct Call'}</span>
              </a>
              <button
                id="request-urgent-dispatch-btn"
                onClick={handleDispatch}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'तुरंत बुलाएं' : 'Dispatch Now'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
