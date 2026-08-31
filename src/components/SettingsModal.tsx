import React from 'react';
import { Language, UserRole } from '../types';
import { translations } from '../data/translations';
import { X, Settings, Globe, Bell, Shield, Trash2, Moon, Smartphone } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  userRole: UserRole;
  onOpenRoleModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onToggleLanguage,
  userRole,
  onOpenRoleModal,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div 
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {language === 'hi' ? 'सेटिंग्स (Settings)' : 'Settings'}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'ऐप प्राथमिकताएं व भाषा' : 'App preferences & language'}
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

        {/* Options */}
        <div className="space-y-3 text-xs text-slate-700">
          {/* Language Selection */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              <div>
                <div className="font-bold text-slate-900">{language === 'hi' ? 'भाषा (Language)' : 'App Language'}</div>
                <div className="text-[10px] text-slate-500">{language === 'hi' ? 'हिंदी सक्रिय है' : 'English is active'}</div>
              </div>
            </div>
            <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
              <button
                onClick={() => onToggleLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${language === 'hi' ? 'bg-amber-500 text-white' : 'text-slate-600'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${language === 'en' ? 'bg-amber-500 text-white' : 'text-slate-600'}`}
              >
                English
              </button>
            </div>
          </div>

          {/* Role Switch Shortcut */}
          <div 
            onClick={() => {
              onClose();
              onOpenRoleModal();
            }}
            className="p-3 bg-slate-50 hover:bg-amber-50/50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <div>
                <div className="font-bold text-slate-900">{language === 'hi' ? 'यूज़र रोल बदलें' : 'Switch Mode'}</div>
                <div className="text-[10px] text-slate-500 capitalize">{userRole} mode active</div>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-amber-700">
              {t.switchRole}
            </span>
          </div>

          {/* Push Notifications Status */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="font-bold text-slate-900">{language === 'hi' ? 'सर्विस नोटिफिकेशन' : 'Service Alerts'}</div>
                <div className="text-[10px] text-slate-500">{language === 'hi' ? 'रियल-टाइम SMS व ऐप अपडेट' : 'Real-time booking updates'}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Enabled
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2 text-[10px] text-slate-400 font-medium">
          Mohalla Help v2.4 • Clean Mobile-First Edition
        </div>
      </div>
    </div>
  );
};
