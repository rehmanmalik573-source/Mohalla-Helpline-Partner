import React, { useState } from 'react';
import { Provider, ServiceRequest, Category, Language } from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  Users, 
  Wrench, 
  ClipboardList, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';

interface AdminDashboardViewProps {
  providers: Provider[];
  requests: ServiceRequest[];
  categories: Category[];
  language: Language;
  onApproveProvider: (providerId: string) => void;
  onRejectProvider: (providerId: string) => void;
  onBackToHome: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  providers,
  requests,
  categories,
  language,
  onApproveProvider,
  onRejectProvider,
  onBackToHome,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const t = translations[language];

  const pendingPros = providers.filter(p => p.verificationStatus === 'pending');
  const verifiedPros = providers.filter(p => p.verificationStatus === 'verified');
  const rejectedPros = providers.filter(p => p.verificationStatus === 'rejected');
  const activeRequests = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');
  const completedRequests = requests.filter(r => r.status === 'completed');

  const filteredPros = providers.filter(p => {
    if (activeFilter === 'pending' && p.verificationStatus !== 'pending') return false;
    if (activeFilter === 'verified' && p.verificationStatus !== 'verified') return false;
    if (activeFilter === 'rejected' && p.verificationStatus !== 'rejected') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameHi.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="admin-dashboard-view" className="max-w-4xl mx-auto px-4 py-4 space-y-4 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer"
            title={t.backToHome}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {t.adminDashboard}
              </h1>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md">
                Admin Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'hi' ? 'कारीगर सत्यापन व रिक्वेस्ट्स की निगरानी' : 'Provider verification and request moderation'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsRefreshing(true);
            setTimeout(() => setIsRefreshing(false), 600);
          }}
          className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
          title={t.refresh}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">{t.totalProviders}</span>
          <div className="text-xl font-black text-slate-900 mt-0.5">{providers.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">{verifiedPros.length} Verified</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-2xs">
          <span className="text-[10px] font-bold text-amber-800 uppercase">{t.pendingVerifications}</span>
          <div className="text-xl font-black text-amber-600 mt-0.5">{pendingPros.length}</div>
          <span className="text-[10px] text-amber-700 font-semibold">Needs Approval</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">{t.activeRequestsCount}</span>
          <div className="text-xl font-black text-blue-600 mt-0.5">{activeRequests.length}</div>
          <span className="text-[10px] text-slate-500 font-semibold">In Progress</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">{t.completedRequestsCount}</span>
          <div className="text-xl font-black text-emerald-600 mt-0.5">{completedRequests.length}</div>
          <span className="text-[10px] text-slate-500 font-semibold">Total Delivered</span>
        </div>
      </div>

      {/* Provider Verification Moderation Section */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-extrabold text-slate-900">
              {language === 'hi' ? 'कारीगर वेरिफिकेशन व KYC प्रबंधन' : 'Technician KYC & Verification Requests'}
            </h2>
            {pendingPros.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {pendingPros.length} Pending
              </span>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-colors ${
                activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({providers.length})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-colors ${
                activeFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Pending ({pendingPros.length})
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-colors ${
                activeFilter === 'verified' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Verified ({verifiedPros.length})
            </button>
            <button
              onClick={() => setActiveFilter('rejected')}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-colors ${
                activeFilter === 'rejected' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              Rejected ({rejectedPros.length})
            </button>
          </div>
        </div>

        {/* Provider Rows */}
        <div className="space-y-3">
          {filteredPros.map((pro) => (
            <div
              key={pro.id}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={pro.avatar}
                  alt={pro.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-300 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-900">{pro.name}</h3>
                    <span className="text-[11px] text-amber-800 font-semibold bg-amber-100/60 px-1.5 py-0.5 rounded">
                      {pro.categoryName}
                    </span>
                    {pro.verificationStatus === 'rejected' && (
                      <span className="text-[10px] text-rose-700 bg-rose-100 font-extrabold px-1.5 py-0.5 rounded">
                        Rejected
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    📞 {pro.phone} • 📍 {pro.location} • {pro.experienceYears} Yrs Exp
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Document: <span className="font-semibold text-slate-600">Aadhaar Card ({pro.verificationStatus})</span>
                    {pro.verificationNotes && (
                      <span className="block text-rose-600 text-[10px] mt-0.5">Note: {pro.verificationNotes}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {pro.verificationStatus === 'verified' ? (
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.verifiedPro}</span>
                    </span>
                    <button
                      onClick={() => onRejectProvider(pro.id)}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold cursor-pointer"
                      title="Revoke Verification"
                    >
                      Reject
                    </button>
                  </div>
                ) : pro.verificationStatus === 'rejected' ? (
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Rejected</span>
                    </span>
                    <button
                      onClick={() => onApproveProvider(pro.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Re-Approve</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onApproveProvider(pro.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.approveProvider}</span>
                    </button>
                    <button
                      onClick={() => onRejectProvider(pro.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {t.rejectProvider}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
