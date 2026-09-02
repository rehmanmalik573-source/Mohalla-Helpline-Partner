import React, { useMemo, useState } from 'react';
import {
  Provider,
  ServiceRequest,
  RequestStatus,
  Language,
  Category,
} from '../types';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Phone,
  MapPin,
  IndianRupee,
  Star,
  User,
  Wrench,
  Calendar,
  FileText,
  Briefcase,
  Wallet,
  Upload,
  ChevronRight,
  Zap,
  CircleDollarSign,
  RefreshCw,
} from 'lucide-react';

interface ProviderDashboardViewProps {
  provider: Provider;
  requests: ServiceRequest[];
  categories: Category[];
  language: Language;
  onUpdateStatus: (
    requestId: string,
    newStatus: RequestStatus
  ) => void;
  onUpdateProvider: (updatedPro: Partial<Provider>) => void;
  onSimulateNewRequest?: () => void;
  onOpenHelpSupport: () => void;
  onOpenProfileModal: () => void;
  activeMainTab?: 'dashboard' | 'requests' | 'earnings' | 'profile';
  onChangeMainTab?: (
    tab: 'dashboard' | 'requests' | 'earnings' | 'profile'
  ) => void;
}

export const ProviderDashboardView: React.FC<
  ProviderDashboardViewProps
> = ({
  provider,
  requests,
  categories,
  language,
  onUpdateStatus,
  onUpdateProvider,
  onOpenHelpSupport,
  onOpenProfileModal,
  onChangeMainTab,
}) => {
  const [activeRequestFilter, setActiveRequestFilter] = useState<
    'all' | 'pending' | 'active' | 'completed'
  >('all');

  const [kycResubmitted, setKycResubmitted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const t = translations[language];

  const isRejected = provider?.verificationStatus === 'rejected';
  const isPending = provider?.verificationStatus === 'pending';

  const isVerified = Boolean(
    provider?.verificationStatus === 'verified' &&
      provider?.isVerified
  );

  /*
   * IMPORTANT:
   * Availability state is controlled explicitly here.
   *
   * true  = ONLINE
   * false = OFFLINE
   *
   * The toggle is forced to LTR so its thumb always moves:
   * OFFLINE -> LEFT
   * ONLINE  -> RIGHT
   */
  const isOnline = provider?.isAvailableNow === true;

  const myCategoryRequests = useMemo(() => {
    return requests.filter(
      (request) =>
        request.categoryId === provider?.categoryId ||
        request.assignedProvider?.id === provider?.id
    );
  }, [requests, provider?.categoryId, provider?.id]);

  const pendingRequests = useMemo(
    () =>
      myCategoryRequests.filter(
        (request) =>
          request.status === 'requested' ||
          request.status === 'provider_found'
      ),
    [myCategoryRequests]
  );

  const activeJobs = useMemo(
    () =>
      myCategoryRequests.filter(
        (request) =>
          request.status === 'accepted' ||
          request.status === 'on_the_way' ||
          request.status === 'service_started'
      ),
    [myCategoryRequests]
  );

  const completedJobs = useMemo(
    () =>
      myCategoryRequests.filter(
        (request) => request.status === 'completed'
      ),
    [myCategoryRequests]
  );

  const completedEarnings = useMemo(
    () =>
      completedJobs.reduce(
        (total, request) =>
          total + (Number(request.estimatedPrice) || 0),
        0
      ),
    [completedJobs]
  );

  const filteredRequests = useMemo(() => {
    if (activeRequestFilter === 'pending') {
      return pendingRequests;
    }

    if (activeRequestFilter === 'active') {
      return activeJobs;
    }

    if (activeRequestFilter === 'completed') {
      return myCategoryRequests.filter(
        (request) =>
          request.status === 'completed' ||
          request.status === 'cancelled'
      );
    }

    return myCategoryRequests;
  }, [
    activeRequestFilter,
    pendingRequests,
    activeJobs,
    myCategoryRequests,
  ]);

  const providerName =
    language === 'hi'
      ? provider?.nameHi || provider?.name || 'पार्टनर'
      : provider?.name || 'Partner';

  const providerCategory =
    language === 'hi'
      ? provider?.categoryNameHi ||
        provider?.categoryName ||
        'सेवा पार्टनर'
      : provider?.categoryName || 'Service Partner';

  const rating =
    provider?.rating !== undefined && provider?.rating !== null
      ? provider.rating
      : 0;

  const reviewCount =
    provider?.reviewCount !== undefined &&
    provider?.reviewCount !== null
      ? provider.reviewCount
      : 0;

  /*
   * Bilingual request-detail helpers.
   *
   * Hindi:
   *   Hindi value first
   *   English fallback
   *
   * English:
   *   English value first
   *   Hindi fallback
   */
  const getRequestServiceType = (request: ServiceRequest) =>
    language === 'hi'
      ? request.serviceTypeHi || request.serviceType
      : request.serviceType || request.serviceTypeHi;

  const getRequestProblem = (request: ServiceRequest) =>
    language === 'hi'
      ? request.problemDescriptionHi ||
        request.problemDescription
      : request.problemDescription ||
        request.problemDescriptionHi;

  const getRequestLocation = (request: ServiceRequest) =>
    language === 'hi'
      ? request.locationHi || request.location
      : request.location || request.locationHi;

  const getRequestDate = (request: ServiceRequest) =>
    language === 'hi'
      ? request.preferredDateHi ||
        request.preferredDate
      : request.preferredDate ||
        request.preferredDateHi;

  const getRequestTime = (request: ServiceRequest) =>
    language === 'hi'
      ? request.preferredTimeHi ||
        request.preferredTime
      : request.preferredTime ||
        request.preferredTimeHi;

  const handleResubmitKyc = () => {
    onUpdateProvider({
      verificationStatus: 'pending',
      isVerified: false,
      verificationNotes: undefined,
    });

    setKycResubmitted(true);

    window.setTimeout(() => {
      setKycResubmitted(false);
    }, 2500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  /*
   * Availability toggle.
   *
   * Online  -> true
   * Offline -> false
   *
   * This deliberately uses the opposite of the current state.
   */
  const handleAvailabilityToggle = () => {
    if (isRejected) {
      alert(
        language === 'hi'
          ? 'सत्यापन अस्वीकृत है। कृपया अपने दस्तावेज पुनः सबमिट करें।'
          : 'Verification is rejected. Please re-submit your documents.'
      );
      return;
    }

    if (isPending) {
      alert(
        language === 'hi'
          ? 'आपका KYC अभी सत्यापन में है। स्वीकृति के बाद आप ऑनलाइन हो सकेंगे।'
          : 'Your KYC is under review. You can go online after approval.'
      );
      return;
    }

    const nextOnlineState = !isOnline;

    onUpdateProvider({
      isAvailableNow: nextOnlineState,
    });
  };

  const openRequests = (
    filter: 'all' | 'pending' | 'active' | 'completed'
  ) => {
    setActiveRequestFilter(filter);

    if (onChangeMainTab) {
      onChangeMainTab('requests');
    }
  };

  const goToEarnings = () => {
    if (onChangeMainTab) {
      onChangeMainTab('earnings');
    }
  };

  const getStatusLabel = (status: RequestStatus) => {
    if (language === 'hi') {
      switch (status) {
        case 'requested':
        case 'provider_found':
          return 'नई रिक्वेस्ट';
        case 'accepted':
          return 'स्वीकार किया';
        case 'on_the_way':
          return 'रास्ते में';
        case 'service_started':
          return 'काम चल रहा है';
        case 'completed':
          return 'पूरा हुआ';
        case 'cancelled':
          return 'रद्द';
        default:
          return status;
      }
    }

    switch (status) {
      case 'requested':
      case 'provider_found':
        return 'New Request';
      case 'accepted':
        return 'Accepted';
      case 'on_the_way':
        return 'On The Way';
      case 'service_started':
        return 'Service Started';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div
      id="mohalla-partner-dashboard-container"
      className="max-w-md mx-auto min-h-screen bg-[#F6F8F7] pb-28 text-slate-900 font-sans"
    >
      {/* ================= HEADER ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#047857] px-4 pt-5 pb-20 text-white">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-2xl" />

        <div className="absolute -left-20 bottom-0 h-36 w-36 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-100">
                MOHALLA HELPLINE
              </span>

              {isVerified && (
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-black text-emerald-50">
                  ✓ VERIFIED
                </span>
              )}
            </div>

            <h1 className="mt-1 text-xl font-black tracking-tight">
              {language === 'hi'
                ? `नमस्ते, ${providerName} 👋`
                : `Hello, ${providerName} 👋`}
            </h1>

            <p className="mt-1 text-[11px] font-semibold text-emerald-100">
              {language === 'hi'
                ? 'आज के काम पर एक नज़र डालें'
                : 'Here is your work overview for today'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-all hover:bg-white/15 active:scale-95"
            aria-label="Refresh"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
          </button>
        </div>

        {/* ================= AVAILABILITY ================= */}

        <div className="relative mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isRejected
                  ? 'bg-rose-400'
                  : isOnline
                    ? 'bg-emerald-300 animate-pulse'
                    : 'bg-slate-300'
              }`}
            />

            <div>
              <p className="text-[10px] font-bold text-emerald-100">
                {language === 'hi'
                  ? 'आपकी उपलब्धता'
                  : 'Your availability'}
              </p>

              <p className="text-sm font-black text-white">
                {isRejected
                  ? language === 'hi'
                    ? 'खाता अस्वीकृत'
                    : 'Account Rejected'
                  : isOnline
                    ? language === 'hi'
                      ? 'ऑनलाइन — रिक्वेस्ट लेने के लिए तैयार'
                      : 'Online — Ready for requests'
                    : language === 'hi'
                      ? 'ऑफलाइन'
                      : 'Offline'}
              </p>
            </div>
          </div>

          {/* 
            IMPORTANT:
            direction:ltr guarantees:
            OFFLINE = thumb LEFT
            ONLINE  = thumb RIGHT
          */}
          <button
            type="button"
            onClick={handleAvailabilityToggle}
            disabled={isRejected}
            dir="ltr"
            className={`relative h-7 w-12 shrink-0 overflow-hidden rounded-full transition-all duration-200 ${
              isRejected
                ? 'cursor-not-allowed bg-white/20 opacity-60'
                : isOnline
                  ? 'bg-emerald-300'
                  : 'bg-white/25'
            }`}
            style={{ direction: 'ltr' }}
            aria-label={
              isOnline
                ? 'Set availability offline'
                : 'Set availability online'
            }
            aria-pressed={isOnline}
          >
            <span
              className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                isOnline
                  ? 'translate-x-5'
                  : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* ================= PROFILE CARD ================= */}

      <section className="-mt-12 px-4">
        <div
          id="partner-profile-floating-card"
          className="rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-900/5"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="relative shrink-0"
              aria-label="Open profile"
            >
              {provider?.avatar ? (
                <img
                  src={provider.avatar}
                  alt={providerName}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-100"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl font-black text-white">
                  {providerName.charAt(0).toUpperCase()}
                </div>
              )}

              {isVerified && (
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white ring-2 ring-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-base font-black text-slate-900">
                  {providerName}
                </h2>

                {isVerified && (
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                )}
              </div>

              <p className="mt-0.5 truncate text-xs font-bold text-emerald-700">
                {providerCategory}
              </p>

              <div className="mt-1.5 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                <span className="text-xs font-black text-slate-800">
                  {rating > 0 ? rating.toFixed(1) : '—'}
                </span>

                <span className="text-[10px] font-semibold text-slate-400">
                  ({reviewCount}{' '}
                  {language === 'hi' ? 'रिव्यू' : 'reviews'})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenProfileModal}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              aria-label="Profile"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-2.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />

                <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
                  {language === 'hi'
                    ? 'वेरिफिकेशन'
                    : 'Verification'}
                </span>
              </div>

              <p className="mt-1 text-xs font-black text-emerald-800">
                {isVerified
                  ? language === 'hi'
                    ? 'वेरिफाइड'
                    : 'Verified'
                  : isPending
                    ? language === 'hi'
                      ? 'पेंडिंग'
                      : 'Pending'
                    : language === 'hi'
                      ? 'रिजेक्टेड'
                      : 'Rejected'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-2.5">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-slate-500" />

                <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
                  {language === 'hi' ? 'काम' : 'Work'}
                </span>
              </div>

              <p className="mt-1 text-xs font-black text-slate-800">
                {language === 'hi'
                  ? `${activeJobs.length} सक्रिय`
                  : `${activeJobs.length} active`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KYC ================= */}

      <section className="space-y-3 px-4 pt-4">
        {isRejected && (
          <div
            id="partner-rejected-banner"
            className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-900"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-rose-800">
                  {language === 'hi'
                    ? 'खाता सत्यापन अस्वीकृत'
                    : 'Account Verification Rejected'}
                </h3>

                <p className="mt-1 text-[11px] font-semibold leading-relaxed text-rose-700">
                  {provider.verificationNotes ||
                    (language === 'hi'
                      ? 'कृपया अपने KYC दस्तावेज दोबारा जमा करें।'
                      : 'Please re-submit your KYC documents.')}
                </p>

                <div className="mt-3 flex gap-2">
                  {kycResubmitted ? (
                    <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-[11px] font-black text-emerald-800">
                      ✓{' '}
                      {language === 'hi'
                        ? 'दस्तावेज जमा हुए'
                        : 'KYC Re-submitted'}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResubmitKyc}
                      className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-[11px] font-black text-white transition-colors hover:bg-rose-700"
                    >
                      <Upload className="h-3.5 w-3.5" />

                      {language === 'hi'
                        ? 'KYC दोबारा जमा करें'
                        : 'Re-submit KYC'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onOpenHelpSupport}
                    className="rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-[11px] font-black text-rose-700"
                  >
                    {language === 'hi' ? 'सहायता' : 'Support'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPending && (
          <div className="flex items-start gap-2.5 rounded-3xl border border-amber-200 bg-amber-50 p-3.5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <h3 className="text-xs font-black text-amber-900">
                {language === 'hi'
                  ? 'KYC सत्यापन जारी है'
                  : 'KYC verification in progress'}
              </h3>

              <p className="mt-0.5 text-[11px] font-semibold leading-relaxed text-amber-800">
                {language === 'hi'
                  ? 'स्वीकृति के बाद आपको सर्विस रिक्वेस्ट मिल सकेंगी।'
                  : 'You will receive service requests after approval.'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ================= TODAY OVERVIEW ================= */}

      <section className="px-4 pt-5">
        <div className="mb-2.5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
              {language === 'hi' ? 'आज' : 'TODAY'}
            </p>

            <h3 className="mt-0.5 text-base font-black text-slate-900">
              {language === 'hi'
                ? 'आपका काम'
                : "Today's Overview"}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => openRequests('all')}
            className="text-[11px] font-black text-emerald-700"
          >
            {language === 'hi' ? 'सभी देखें →' : 'View all →'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => openRequests('pending')}
            className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <FileText className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'नई रिक्वेस्ट'
                : 'New Requests'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {pendingRequests.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => openRequests('active')}
            className="rounded-2xl border border-blue-100 bg-blue-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-blue-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Briefcase className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi' ? 'सक्रिय काम' : 'Active Jobs'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {activeJobs.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => openRequests('completed')}
            className="rounded-2xl border border-violet-100 bg-violet-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-violet-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'पूरे किए काम'
                : 'Completed Jobs'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {completedJobs.length}
            </p>
          </button>

          <button
            type="button"
            onClick={goToEarnings}
            className="rounded-2xl border border-amber-100 bg-amber-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-amber-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Wallet className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'पूरे काम की कमाई'
                : 'Completed Earnings'}
            </p>

            <p className="mt-0.5 flex items-center text-2xl font-black text-slate-900">
              <IndianRupee className="h-5 w-5" />
              {completedEarnings.toLocaleString('en-IN')}
            </p>
          </button>
        </div>
      </section>

      {/* ================= NEW REQUEST ================= */}

      {pendingRequests.length > 0 && (
        <section className="px-4 pt-5">
          <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                  <Zap className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-black">
                    {language === 'hi'
                      ? 'नई सर्विस रिक्वेस्ट'
                      : 'New Service Request'}
                  </p>

                  <p className="text-[9px] font-semibold text-emerald-100">
                    {language === 'hi'
                      ? 'जल्दी प्रतिक्रिया दें'
                      : 'Respond quickly'}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-emerald-700">
                {pendingRequests.length}
              </span>
            </div>

            <div className="p-4">
              {pendingRequests.slice(0, 1).map((request) => (
                <div key={request.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-800">
                        <Wrench className="h-3 w-3" />
                        {getRequestServiceType(request)}
                      </span>

                      <h4 className="mt-2 text-sm font-black text-slate-900">
                        {getRequestProblem(request)}
                      </h4>
                    </div>

                    <div className="shrink-0 rounded-xl bg-amber-50 px-2.5 py-1.5 text-right">
                      <p className="text-[9px] font-bold text-amber-700">
                        {language === 'hi' ? 'अनुमानित' : 'Estimated'}
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        ₹{request.estimatedPrice}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex min-w-0 items-center gap-1.5 rounded-xl bg-slate-50 p-2.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />

                      <span className="truncate text-[10px] font-bold text-slate-700">
                        {getRequestLocation(request)}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5 rounded-xl bg-slate-50 p-2.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-500" />

                      <span className="truncate text-[10px] font-bold text-slate-700">
                        {getRequestDate(request)} • {getRequestTime(request)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateStatus(request.id, 'accepted')
                      }
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white shadow-sm transition-colors hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />

                      {language === 'hi'
                        ? 'स्वीकार करें'
                        : 'Accept'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onUpdateStatus(request.id, 'cancelled')
                      }
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <XCircle className="mx-auto h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= EARNINGS ================= */}

      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={goToEarnings}
          className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#047857] p-4 text-left text-white shadow-lg shadow-emerald-900/10"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-100">
                <CircleDollarSign className="h-4 w-4" />

                <span className="text-[10px] font-black uppercase tracking-wider">
                  {language === 'hi'
                    ? 'उपलब्ध कमाई'
                    : 'Recorded Earnings'}
                </span>
              </div>

              <p className="mt-1 text-3xl font-black tracking-tight">
                ₹{completedEarnings.toLocaleString('en-IN')}
              </p>

              <p className="mt-1 text-[10px] font-semibold text-emerald-100">
                {language === 'hi'
                  ? `${completedJobs.length} पूरे किए गए काम से`
                  : `From ${completedJobs.length} completed job${
                      completedJobs.length === 1 ? '' : 's'
                    }`}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition-transform group-hover:translate-x-1">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </button>
      </section>

      {/* ================= QUICK ACTIONS ================= */}

      <section className="px-4 pt-5">
        <h3 className="mb-2.5 text-sm font-black text-slate-900">
          {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
        </h3>

        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => openRequests('pending')}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <FileText className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi' ? 'रिक्वेस्ट' : 'Requests'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => openRequests('active')}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Briefcase className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi' ? 'मेरे काम' : 'My Jobs'}
            </span>
          </button>

          <button
            type="button"
            onClick={goToEarnings}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <IndianRupee className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi' ? 'कमाई' : 'Earnings'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenProfileModal}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <User className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi' ? 'प्रोफाइल' : 'Profile'}
            </span>
          </button>
        </div>
      </section>

      {/* ================= REQUEST MANAGEMENT ================= */}

      <section
        id="partner-requests-section"
        className="px-4 pt-6"
      >
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
              {language === 'hi'
                ? 'वर्क मैनेजमेंट'
                : 'WORK MANAGEMENT'}
            </p>

            <h3 className="mt-0.5 text-base font-black text-slate-900">
              {language === 'hi'
                ? 'रिक्वेस्ट और काम'
                : 'Requests & Active Jobs'}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
          {(
            [
              ['all', language === 'hi' ? 'सभी' : 'All'],
              ['pending', language === 'hi' ? 'नई' : 'New'],
              ['active', language === 'hi' ? 'चालू' : 'Active'],
              [
                'completed',
                language === 'hi' ? 'पूर्ण' : 'Completed',
              ],
            ] as const
          ).map(([filter, label]) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveRequestFilter(filter)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[10px] font-black transition-all ${
                activeRequestFilter === filter
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                <Briefcase className="h-6 w-6 text-slate-300" />
              </div>

              <h4 className="mt-3 text-sm font-black text-slate-800">
                {activeRequestFilter === 'pending'
                  ? language === 'hi'
                    ? 'अभी कोई नई रिक्वेस्ट नहीं'
                    : 'No new requests right now'
                  : activeRequestFilter === 'active'
                    ? language === 'hi'
                      ? 'कोई सक्रिय काम नहीं'
                      : 'No active jobs'
                    : activeRequestFilter === 'completed'
                      ? language === 'hi'
                        ? 'अभी कोई पूरा काम नहीं'
                        : 'No completed jobs yet'
                      : language === 'hi'
                        ? 'अभी कोई सर्विस रिक्वेस्ट नहीं'
                        : 'No service requests yet'}
              </h4>

              <p className="mt-1 text-[11px] font-medium leading-relaxed text-slate-500">
                {language === 'hi'
                  ? 'नई ग्राहक रिक्वेस्ट आने पर वह यहाँ दिखाई देगी।'
                  : 'New customer requests will appear here when they are received.'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const isAccepted =
                request.status === 'accepted' ||
                request.status === 'on_the_way' ||
                request.status === 'service_started';

              const isCompleted =
                request.status === 'completed';

              const isCancelled =
                request.status === 'cancelled';

              return (
                <article
                  key={request.id}
                  id={`request-card-${request.id}`}
                  className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-800">
                        <Wrench className="h-3 w-3" />
                        {getRequestServiceType(request)}
                      </span>

                      <h4 className="mt-2 text-sm font-black leading-snug text-slate-900">
                        {getRequestProblem(request)}
                      </h4>
                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-50 px-2.5 py-1.5 text-right">
                      <p className="text-[9px] font-bold text-emerald-600">
                        {language === 'hi'
                          ? 'अनुमानित'
                          : 'Estimated'}
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        ₹{request.estimatedPrice}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                        request.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : request.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-700'
                            : request.status === 'requested' ||
                                request.status ===
                                  'provider_found'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {getStatusLabel(request.status)}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex min-w-0 items-center gap-1.5 rounded-2xl bg-slate-50 p-2.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500" />

                      <span className="truncate text-[10px] font-bold text-slate-700">
                        {getRequestLocation(request)}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5 rounded-2xl bg-slate-50 p-2.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-500" />

                      <span className="truncate text-[10px] font-bold text-slate-700">
                        {getRequestDate(request)} •{' '}
                        {getRequestTime(request)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-black text-emerald-900">
                        {request.customerName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-slate-900">
                          {request.customerName}
                        </p>

                        <p className="truncate text-[10px] font-medium text-slate-500">
                          {isAccepted
                            ? request.customerPhone
                            : language === 'hi'
                              ? 'स्वीकार करने पर नंबर दिखेगा'
                              : 'Phone visible after accept'}
                        </p>
                      </div>
                    </div>

                    {isAccepted && (
                      <a
                        href={`tel:${request.customerPhone}`}
                        className="flex shrink-0 items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-[10px] font-black text-white"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {language === 'hi' ? 'कॉल' : 'Call'}
                      </a>
                    )}
                  </div>

                  <div className="mt-3">
                    {request.status === 'requested' ||
                    request.status === 'provider_found' ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              'accepted'
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />

                          {language === 'hi'
                            ? 'स्वीकार करें'
                            : 'Accept'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              'cancelled'
                            )
                          }
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        >
                          {language === 'hi'
                            ? 'मना करें'
                            : 'Decline'}
                        </button>
                      </div>
                    ) : request.status === 'accepted' ? (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            'on_the_way'
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-xs font-black text-white hover:bg-amber-600"
                      >
                        <MapPin className="h-4 w-4" />

                        {language === 'hi'
                          ? 'रास्ते में निकलें'
                          : 'Mark On The Way'}
                      </button>
                    ) : request.status === 'on_the_way' ? (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            'service_started'
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-xs font-black text-white hover:bg-blue-700"
                      >
                        <Zap className="h-4 w-4" />

                        {language === 'hi'
                          ? 'काम शुरू करें'
                          : 'Start Service'}
                      </button>
                    ) : request.status ===
                      'service_started' ? (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            'completed'
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />

                        {language === 'hi'
                          ? `काम पूरा करें • ₹${request.estimatedPrice}`
                          : `Complete Job • ₹${request.estimatedPrice}`}
                      </button>
                    ) : isCompleted ? (
                      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-black text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                        {language === 'hi'
                          ? `काम पूरा • ₹${request.estimatedPrice}`
                          : `Completed • ₹${request.estimatedPrice}`}
                      </div>
                    ) : isCancelled ? (
                      <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-black text-rose-700">
                        <XCircle className="h-4 w-4 text-rose-500" />

                        {language === 'hi'
                          ? 'जॉब रद्द'
                          : 'Cancelled'}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* ================= RATING ================= */}

      <section className="px-4 pt-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                {language === 'hi'
                  ? 'ग्राहक अनुभव'
                  : 'CUSTOMER EXPERIENCE'}
              </p>

              <h3 className="mt-0.5 text-sm font-black text-slate-900">
                {language === 'hi'
                  ? 'आपकी रेटिंग'
                  : 'Your Rating'}
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenProfileModal}
              className="text-[10px] font-black text-emerald-700"
            >
              {language === 'hi'
                ? 'प्रोफाइल देखें →'
                : 'View Profile →'}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-4 rounded-2xl bg-amber-50 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            </div>

            <div>
              <p className="text-xl font-black text-slate-900">
                {rating > 0 ? rating.toFixed(1) : '—'}
              </p>

              <p className="text-[10px] font-semibold text-slate-500">
                {reviewCount > 0
                  ? `${reviewCount} ${
                      language === 'hi'
                        ? 'ग्राहक रिव्यू'
                        : 'customer reviews'
                    }`
                  : language === 'hi'
                    ? 'अभी कोई रिव्यू नहीं'
                    : 'No reviews yet'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT ================= */}

      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={onOpenHelpSupport}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-black text-slate-900">
                {language === 'hi'
                  ? 'पार्टनर सहायता'
                  : 'Partner Support'}
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                {language === 'hi'
                  ? 'किसी भी समस्या में मदद लें'
                  : 'Get help whenever you need it'}
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </section>

      <div className="h-4" />
    </div>
  );
};
