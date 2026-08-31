import React, { useState } from 'react';
import { ServiceRequest, RequestStatus, Language } from '../types';
import { translations } from '../data/translations';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  Zap, 
  RefreshCw,
  Send,
  Sparkles,
  Camera,
  Play
} from 'lucide-react';

interface MyRequestsSectionProps {
  requests: ServiceRequest[];
  language: Language;
  onBackToHome: () => void;
  onUpdateStatus: (id: string, newStatus: RequestStatus) => void;
  onCancelRequest: (id: string) => void;
  onRateRequest: (id: string, rating: number, review: string) => void;
  onNewRequestClick: () => void;
}

export const MyRequestsSection: React.FC<MyRequestsSectionProps> = ({
  requests,
  language,
  onBackToHome,
  onUpdateStatus,
  onCancelRequest,
  onRateRequest,
  onNewRequestClick,
}) => {
  const [filterTab, setFilterTab] = useState<'active' | 'completed' | 'all'>('active');
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [ratingReqId, setRatingReqId] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [showCancelConfirmId, setShowCancelConfirmId] = useState<string | null>(null);

  const t = translations[language];

  const activeStatuses: RequestStatus[] = [
    'requested',
    'provider_found',
    'accepted',
    'on_the_way',
    'service_started'
  ];

  const activeRequests = requests.filter(r => activeStatuses.includes(r.status));
  const completedRequests = requests.filter(r => r.status === 'completed' || r.status === 'cancelled');

  const displayedRequests = filterTab === 'active' 
    ? activeRequests 
    : (filterTab === 'completed' ? completedRequests : requests);

  // Status steps list for the progress stepper
  const statusSteps: { key: RequestStatus; labelHi: string; labelEn: string; icon: string }[] = [
    { key: 'requested', labelHi: 'रिक्वेस्ट दर्ज', labelEn: 'Requested', icon: '📝' },
    { key: 'provider_found', labelHi: 'कारीगर मिला', labelEn: 'Provider Found', icon: '🔍' },
    { key: 'accepted', labelHi: 'स्वीकार हुआ', labelEn: 'Accepted', icon: '🤝' },
    { key: 'on_the_way', labelHi: 'रास्ते में है', labelEn: 'On the Way', icon: '🛵' },
    { key: 'service_started', labelHi: 'काम शुरू', labelEn: 'Started', icon: '⚡' },
    { key: 'completed', labelHi: 'पूरा हुआ', labelEn: 'Completed', icon: '✓' },
  ];

  const getStatusIndex = (status: RequestStatus) => {
    if (status === 'cancelled') return -1;
    return statusSteps.findIndex(s => s.key === status);
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'requested':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
            <span>{t.status_requested}</span>
          </span>
        );
      case 'provider_found':
        return (
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-1">
            <span>{t.status_provider_found}</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.status_accepted}</span>
          </span>
        );
      case 'on_the_way':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1 animate-pulse">
            <span>🛵 {t.status_on_the_way} (10m)</span>
          </span>
        );
      case 'service_started':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.status_service_started}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black flex items-center gap-1">
            <span>✓ {t.status_completed}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold">
            {t.status_cancelled}
          </span>
        );
    }
  };

  const advanceNextStatus = (req: ServiceRequest) => {
    const sequence: RequestStatus[] = [
      'requested',
      'provider_found',
      'accepted',
      'on_the_way',
      'service_started',
      'completed'
    ];
    const currentIndex = sequence.indexOf(req.status);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      onUpdateStatus(req.id, sequence[currentIndex + 1]);
    }
  };

  return (
    <div id="my-requests-full-view" className="max-w-4xl mx-auto px-3.5 sm:px-4 py-4 space-y-3.5 pb-20">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <button
            id="back-from-requests-btn"
            onClick={onBackToHome}
            className="w-9 h-9 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer"
            title={t.backToHome}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t.myRequests}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                {requests.length}
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'hi' ? 'अपनी सभी सर्विस रिक्वेस्ट्स का लाइव स्टेटस ट्रैक करें' : 'Track live status of your service requests'}
            </p>
          </div>
        </div>

        <button
          id="new-request-top-btn"
          onClick={onNewRequestClick}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
        >
          <span>+</span>
          <span>{language === 'hi' ? 'नई रिक्वेस्ट' : 'New Request'}</span>
        </button>
      </div>

      {/* Tabs Switcher (Active vs Completed) */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 gap-1">
        <button
          onClick={() => setFilterTab('active')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterTab === 'active'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'hi' ? `सक्रिय रिक्वेस्ट्स (${activeRequests.length})` : `Active (${activeRequests.length})`}
        </button>
        <button
          onClick={() => setFilterTab('completed')}
          className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterTab === 'completed'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'hi' ? `पूर्ण / इतिहास (${completedRequests.length})` : `Completed (${completedRequests.length})`}
        </button>
        <button
          onClick={() => setFilterTab('all')}
          className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            filterTab === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {language === 'hi' ? 'सभी' : 'All'}
        </button>
      </div>

      {/* Empty State */}
      {displayedRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3 shadow-xs">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto text-2xl">
            📋
          </div>
          <h3 className="text-base font-extrabold text-slate-900">
            {t.noRequestsYet}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t.noRequestsSubtitle}
          </p>
          <button
            onClick={onNewRequestClick}
            className="mt-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer"
          >
            {t.requestService}
          </button>
        </div>
      ) : (
        /* Requests Cards List */
        <div className="space-y-4">
          {displayedRequests.map((req) => {
            const currentStepIdx = getStatusIndex(req.status);
            const pro = req.assignedProvider;
            const proName = language === 'hi' && pro?.nameHi ? pro.nameHi : (pro?.name || 'Rahul Sharma');
            const proCategory = language === 'hi' && pro?.categoryNameHi ? pro.categoryNameHi : (pro?.categoryName || req.categoryName);

            return (
              <div
                key={req.id}
                id={`service-request-card-${req.id}`}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-amber-300"
              >
                {/* Request Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
                      #{req.id}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                        {req.serviceType}
                      </h3>
                      <span className="text-[11px] text-slate-300">
                        {language === 'hi' ? req.categoryNameHi : req.categoryName} • {req.createdAt}
                      </span>
                    </div>
                  </div>

                  {getStatusBadge(req.status)}
                </div>

                {/* Stepper / Progress Bar for Active Requests */}
                {req.status !== 'cancelled' && (
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                      {/* Connecting line */}
                      <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-200 -z-0"></div>
                      <div 
                        className="absolute top-1/2 left-4 -translate-y-1/2 h-0.5 bg-amber-500 -z-0 transition-all duration-500"
                        style={{
                          width: `${Math.max(0, Math.min(100, (currentStepIdx / (statusSteps.length - 1)) * 100))}%`
                        }}
                      ></div>

                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={step.key} className="flex flex-col items-center relative z-10">
                            <div 
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all ${
                                isCurrent
                                  ? 'bg-amber-500 text-white ring-4 ring-amber-200 scale-110 shadow-xs'
                                  : isDone
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-white border-2 border-slate-300 text-slate-400'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[9px] sm:text-[10px] font-bold mt-1 max-w-[60px] text-center truncate ${
                              isCurrent ? 'text-amber-900 font-black' : isDone ? 'text-slate-800' : 'text-slate-400'
                            }`}>
                              {language === 'hi' ? step.labelHi : step.labelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Request Details Body */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Problem & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        {t.problemDescription}
                      </span>
                      <p className="font-semibold text-slate-800">
                        {req.problemDescription}
                      </p>
                      {req.photoUrl && (
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-700 font-medium bg-amber-50 p-1.5 rounded-xl">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'फोटो संलग्न है' : 'Photo Attached'}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        {t.serviceLocation}
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{req.location}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{req.preferredDate} • {req.preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Provider Information Section (Shown when accepted/found) */}
                  {pro && req.status !== 'cancelled' && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60">
                        <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>{t.providerInfoHeading}</span>
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {t.verifiedPro}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        {/* Provider info card */}
                        <div className="flex items-center gap-3">
                          <img
                            src={pro.avatar}
                            alt={proName}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-400 shadow-xs"
                          />
                          <div>
                            <h4 className="text-sm font-black text-slate-900">
                              {proName}
                            </h4>
                            <p className="text-xs text-amber-800 font-semibold">
                              {proCategory}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                              <div className="flex items-center gap-0.5 text-amber-600 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <span>{pro.rating.toFixed(1)}</span>
                              </div>
                              <span>•</span>
                              <span>{pro.reviewCount} {language === 'hi' ? 'रिव्यूज' : 'reviews'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Contact Buttons */}
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${pro.phone}`}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.callNow}</span>
                          </a>
                          <a
                            href={`sms:${pro.phone}?body=Hello%20Mohalla%20Help%20Service%20Request%20${req.id}`}
                            className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1 shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>{t.messagePro}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Demo Fast-Forward Controls & Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 flex-wrap">
                    {/* Demo Status Advance button to easily test state flow */}
                    {req.status !== 'completed' && req.status !== 'cancelled' ? (
                      <button
                        id={`advance-status-btn-${req.id}`}
                        onClick={() => advanceNextStatus(req)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                        title="Simulate provider progressing the request"
                      >
                        <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                        <span>{t.advanceStatusDemo}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        {req.status === 'completed' ? '✓ काम पूर्ण' : '✕ रद्द'}
                      </span>
                    )}

                    {/* Cancel Request Button for Active requests */}
                    {activeStatuses.includes(req.status) && (
                      <div>
                        {showCancelConfirmId === req.id ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-rose-600 font-bold">{language === 'hi' ? 'रद्द करें?' : 'Cancel?'}</span>
                            <button
                              onClick={() => {
                                onCancelRequest(req.id);
                                setShowCancelConfirmId(null);
                              }}
                              className="px-2 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              {language === 'hi' ? 'हां, रद्द करें' : 'Yes, Cancel'}
                            </button>
                            <button
                              onClick={() => setShowCancelConfirmId(null)}
                              className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                            >
                              {language === 'hi' ? 'नहीं' : 'No'}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowCancelConfirmId(req.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
                          >
                            {t.cancelRequest}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Rate Experience Button for Completed Requests */}
                    {req.status === 'completed' && !req.ratingGiven && (
                      <div>
                        {ratingReqId === req.id ? (
                          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-xs w-full max-w-sm mt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">{t.rateExperience}:</span>
                              <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setStars(star)}
                                    className="cursor-pointer"
                                  >
                                    <Star className={`w-4 h-4 ${star <= stars ? 'fill-amber-500' : 'text-slate-300'}`} />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <input
                              type="text"
                              placeholder={t.howWasService}
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="w-full p-2 bg-white border border-amber-200 rounded-xl text-xs"
                            />
                            <button
                              onClick={() => {
                                onRateRequest(req.id, stars, reviewText);
                                setRatingReqId(null);
                              }}
                              className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs cursor-pointer shadow-2xs"
                            >
                              {t.submitRating}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRatingReqId(req.id)}
                            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>{t.rateExperience}</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Rated Badge */}
                    {req.ratingGiven && (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        <span>{req.ratingGiven}★ Rated</span>
                        <span className="text-[10px] text-slate-500 font-normal truncate max-w-[120px]">
                          "{req.reviewGiven}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
