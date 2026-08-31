import React from 'react';
import { Category, Language } from '../types';
import { translations } from '../data/translations';
import { Home, PhoneCall, ShieldCheck, Heart, Users } from 'lucide-react';

interface FooterProps {
  categories: Category[];
  language: Language;
  onSelectCategory: (id: number | null) => void;
  onOpenEmergency: () => void;
  onOpenJoinPro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  language,
  onSelectCategory,
  onOpenEmergency,
  onOpenJoinPro,
}) => {
  const t = translations[language];

  return (
    <footer id="mohalla-footer" className="bg-[#0B1A30] text-slate-300 pt-8 pb-6 border-t border-slate-800 mt-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          {/* Logo & Tagline */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                M
              </div>
              <span className="text-lg font-black text-white">
                MOHALLA <span className="text-amber-400">HELP</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.tagline} • {language === 'hi' ? 'शाहदरा व दिल्ली NCR' : 'Shahdara & Delhi NCR'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onOpenEmergency}
              className="px-3.5 py-1.5 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-rose-600/30"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.emergencyTitle}</span>
            </button>

            <button
              onClick={onOpenJoinPro}
              className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-500/30"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.joinAsPro}</span>
            </button>
          </div>
        </div>

        {/* Popular Category Links */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'hi' ? 'लोकप्रिय सेवाएं' : 'Popular Services'}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 8).map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className="text-xs text-slate-300 hover:text-amber-400 transition-colors cursor-pointer bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                {c.icon} {language === 'hi' ? c.nameHi : c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} MOHALLA HELP - {t.tagline}</p>
          <div className="flex items-center gap-1">
            <span>{language === 'hi' ? 'आपके मोहल्ले की सेवा में समर्पित' : 'Dedicated to neighborhood care'}</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
