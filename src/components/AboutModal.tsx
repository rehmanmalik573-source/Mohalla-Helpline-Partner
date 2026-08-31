import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, ShieldCheck, HeartHandshake, PhoneCall, Sparkles, MapPin } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div 
      id="about-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
              M
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                MOHALLA <span className="text-amber-500">HELP</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {t.tagline} • v2.4 (Mohalla Network)
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

        {/* Mission Details */}
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-80 overflow-y-auto pr-1">
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 space-y-1.5">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'हमारा उद्देश्य' : 'Our Mission'}</span>
            </h3>
            <p>
              {language === 'hi'
                ? 'मोहल्ला हेल्प आपके इलाके के कुशल व भरोसेमंद कारीगरों (प्लंबर, इलेक्ट्रीशियन, पेंटर, कारपेंटर आदि) को सीधे आपके घर तक बिना किसी बिचौलिये के जोड़ता है।'
                : 'Mohalla Help directly connects skilled and verified neighborhood service professionals with local households without middlemen commissions.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
              <div className="font-bold text-slate-900">{language === 'hi' ? '100% वेरिफाइड' : '100% Verified'}</div>
              <div className="text-[10px] text-slate-500">{language === 'hi' ? 'दस्तावेज व बैकग्राउंड जांच' : 'ID & Skill checks'}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <MapPin className="w-4 h-4 text-amber-600 mb-1" />
              <div className="font-bold text-slate-900">{language === 'hi' ? '15 मिनट में मदद' : '15-Min Arrival'}</div>
              <div className="text-[10px] text-slate-500">{language === 'hi' ? 'स्थानीय नजदीकी कारीगर' : 'Local neighborhood pros'}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 text-white rounded-2xl space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-xs text-amber-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.helplineLabel}</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Toll-Free: <span className="font-bold text-white">1800-202-6000</span> (24 Hours Open)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
