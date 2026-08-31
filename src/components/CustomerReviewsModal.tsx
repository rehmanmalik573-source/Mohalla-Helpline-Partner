import React from 'react';
import { ServiceRequest, Language } from '../types';
import { translations } from '../data/translations';
import { X, Star, MessageSquareQuote } from 'lucide-react';

interface CustomerReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: ServiceRequest[];
  language: Language;
}

export const CustomerReviewsModal: React.FC<CustomerReviewsModalProps> = ({
  isOpen,
  onClose,
  requests,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const reviewedRequests = requests.filter(r => r.ratingGiven !== undefined && r.ratingGiven > 0);

  return (
    <div 
      id="reviews-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {t.myReviews}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'आपके द्वारा दिए गए रेटिंग व फीडबैक' : 'Ratings and feedback given by you'}
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

        {/* Content */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {reviewedRequests.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="text-3xl">⭐</div>
              <p className="text-xs font-bold text-slate-700">
                {language === 'hi' ? 'आपने अभी तक कोई रिव्यू नहीं दिया है' : 'You have not submitted any reviews yet'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'काम पूरा होने के बाद कारीगर को रेटिंग दें।' : 'Rate your technician once service is marked completed.'}
              </p>
            </div>
          ) : (
            reviewedRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-200/60 flex items-center justify-center text-sm font-black text-amber-900">
                      {req.assignedProvider?.name?.charAt(0) || 'P'}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {req.assignedProvider?.name || req.categoryName}
                      </h3>
                      <span className="text-[10px] text-slate-500">
                        #{req.id} • {req.serviceType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 bg-white px-2 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900">{req.ratingGiven}</span>
                  </div>
                </div>

                {req.reviewGiven && (
                  <p className="text-xs text-slate-700 bg-white/80 p-2 rounded-xl border border-slate-100 italic leading-relaxed">
                    "{req.reviewGiven}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
