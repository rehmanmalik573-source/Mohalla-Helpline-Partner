import React, { useState } from 'react';
import { Tag, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PromoOfferBannerProps {
  language: Language;
  onApplyOffer?: (code: string) => void;
}

export const PromoOfferBanner: React.FC<PromoOfferBannerProps> = ({
  language,
  onApplyOffer,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = translations[language];

  const promoCode = "MOHALLA100";

  const handleCopy = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    if (onApplyOffer) onApplyOffer(promoCode);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="promo-offer-bar" className="max-w-4xl mx-auto px-4 py-2 mb-4">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 border border-amber-200/80 rounded-2xl p-3 sm:p-3.5 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {t.offerTitle}
              </p>
              <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
                Use code: <span className="underline font-bold">{promoCode}</span>
              </p>
            </div>
          </div>

          <button
            id="view-offer-popup-btn"
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            {t.viewOffer}
          </button>
        </div>
      </section>

      {/* Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-amber-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl">
              🎁
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'hi' ? 'पहला ऑर्डर ऑफ़र' : 'First Booking Offer'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'hi'
                  ? 'अपनी पहली किसी भी होम रिपेयर या सर्विस बुकिंग पर सीधे ₹100 की छूट पाएं।'
                  : 'Get instant flat ₹100 off on your first home repair or service booking.'}
              </p>
            </div>

            <div className="bg-amber-50 border border-dashed border-amber-300 rounded-2xl p-3 flex items-center justify-between">
              <span className="text-sm font-black text-amber-900 tracking-wider">
                {promoCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                {copied ? 'Copied! ✓' : (language === 'hi' ? 'कॉपी करें' : 'Copy Code')}
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              {language === 'hi' ? 'ठीक है' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
