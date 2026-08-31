import React from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../data/translations';
import { Users, Wrench, Shield, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  language: Language;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div 
      id="role-selection-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200/80 space-y-4 animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          id="close-role-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title & Prompt */}
        <div className="text-center pt-2 space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl mb-2">
            🤝
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.welcomeTitle}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* The 2 Primary Choices */}
        <div className="space-y-3 pt-2">
          {/* Option 1: Customer (SERVICE LENA HAI) */}
          <div
            id="role-choice-customer"
            onClick={() => {
              onSelectRole('customer');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 group ${
              currentRole === 'customer'
                ? 'border-amber-500 bg-amber-50/60 shadow-md shadow-amber-500/10'
                : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xl font-bold">
              👤
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 group-hover:text-amber-700">
                  {t.needServiceRole}
                </span>
                {currentRole === 'customer' ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                {t.needServiceRoleDesc}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                <span>🔧 प्लंबर, इलेक्ट्रीशियन, पुताई, रिपेयर आदि</span>
              </div>
            </div>
          </div>

          {/* Option 2: Provider (SERVICE DENA HAI) */}
          <div
            id="role-choice-provider"
            onClick={() => {
              onSelectRole('provider');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 group ${
              currentRole === 'provider'
                ? 'border-amber-500 bg-amber-50/60 shadow-md shadow-amber-500/10'
                : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 text-xl font-bold">
              🔧
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 group-hover:text-amber-700">
                  {t.provideServiceRole}
                </span>
                {currentRole === 'provider' ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                {t.provideServiceRoleDesc}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-800 font-bold bg-amber-100/60 px-2 py-0.5 rounded-md w-fit">
                <span>💰 नए ग्राहक पाएं व सीधे पेमेंट प्राप्त करें</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary: Admin Access Link */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">प्लेटफ़ॉर्म प्रबंधन / Oversight:</span>
          <button
            onClick={() => {
              onSelectRole('admin');
              onClose();
            }}
            className={`font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
              currentRole === 'admin'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-slate-50 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{t.adminPortalRole}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
