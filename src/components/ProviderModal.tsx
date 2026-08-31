import React from 'react';
import { Provider, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  CalendarCheck, 
  Award, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';

interface ProviderModalProps {
  provider: Provider | null;
  language: Language;
  onClose: () => void;
  onBook: (provider: Provider) => void;
}

export const ProviderModal: React.FC<ProviderModalProps> = ({
  provider,
  language,
  onClose,
  onBook,
}) => {
  if (!provider) return null;

  const t = translations[language];
  const displayName = language === 'hi' ? provider.nameHi : provider.name;
  const displayTitle = language === 'hi' ? provider.titleHi : provider.title;
  const displayBio = language === 'hi' ? provider.bioHi : provider.bio;
  const displayLocation = language === 'hi' ? provider.locationHi : provider.location;
  const displayBadge = language === 'hi' ? provider.badgeHi : provider.badge;
  const specialties = language === 'hi' ? provider.specialtiesHi : provider.specialties;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="provider-detail-modal"
        className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-amber-950 p-5 text-white rounded-t-3xl">
          <button
            id="close-provider-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5 mt-1">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400"
              />
              {provider.isAvailableNow && (
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-bold ring-2 ring-white">
                  LIVE
                </span>
              )}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-bold text-white">{displayName}</h2>
                {provider.isVerified && (
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs text-amber-200 font-medium">{displayTitle}</p>
              
              <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-300">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{provider.jobsCompleted}+ {t.completedJobs}</span>
                <span>•</span>
                <span>{displayLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4 flex-1">
          {/* Status Alert Banner if not verified */}
          {provider.verificationStatus === 'rejected' && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✕
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-rose-900">
                  {language === 'hi' ? 'अस्वीकृत प्रोफ़ाइल (Not Active)' : 'Verification Rejected'}
                </div>
                <div className="text-rose-700 text-[11px] mt-0.5">
                  {provider.rejectionReason || (language === 'hi' ? 'यह प्रोफ़ाइल वर्तमान में नई बुकिंग स्वीकार करने के लिए योग्य नहीं है।' : 'This professional account is currently not eligible to receive customer bookings.')}
                </div>
              </div>
            </div>
          )}

          {provider.verificationStatus === 'pending' && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ⏳
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-amber-900">
                  {language === 'hi' ? 'सत्यापन प्रक्रियाधीन (Under Review)' : 'Verification Under Review'}
                </div>
                <div className="text-amber-700 text-[11px] mt-0.5">
                  {language === 'hi' ? 'यह प्रोफ़ाइल एडमिन सत्यापन के बाद ही बुकिंग के लिए उपलब्ध होगी।' : 'This profile is awaiting admin verification before accepting bookings.'}
                </div>
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400">{t.ratePerHour}</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">₹{provider.hourlyRate}</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400">{language === 'hi' ? 'अनुभव' : 'Experience'}</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{provider.experienceYears} {language === 'hi' ? 'साल' : 'Years'}</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400">{language === 'hi' ? 'पहुंचने का समय' : 'Response'}</div>
              <div className="text-sm font-bold text-emerald-600 mt-0.5">{provider.responseMinutes} {language === 'hi' ? 'मिनट' : 'mins'}</div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-1">
              {language === 'hi' ? 'कारीगर के बारे में' : 'About the Professional'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100">
              {displayBio}
            </p>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-2">
              {language === 'hi' ? 'प्रमुख सेवाएं व काम' : 'Services & Specialties'}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {specialties.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-amber-600" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-2">
              {language === 'hi' ? 'ग्राहकों की समीक्षाएं' : 'Customer Reviews'}
            </h3>
            <div className="space-y-2">
              {provider.reviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-bold text-slate-800">{rev.author}</div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">
                    "{language === 'hi' && rev.commentHi ? rev.commentHi : rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center gap-2">
          <a
            href={`tel:${provider.phone}`}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.callNow}</span>
          </a>

          {provider.verificationStatus === 'verified' ? (
            <button
              id="modal-book-now-pro-btn"
              onClick={() => {
                onClose();
                onBook(provider);
              }}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.bookNow} (₹{provider.hourlyRate})</span>
            </button>
          ) : (
            <button
              disabled
              className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
            >
              <span>{language === 'hi' ? 'बुकिंग उपलब्ध नहीं' : 'Booking Unavailable'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
