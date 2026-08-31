import React from 'react';
import { Provider, Language } from '../types';
import { translations } from '../data/translations';
import { Star, MapPin, Phone, CalendarCheck, ShieldCheck, ChevronRight } from 'lucide-react';

interface TrustedProsSectionProps {
  providers: Provider[];
  language: Language;
  onSelectProvider: (provider: Provider) => void;
  onBookProvider: (provider: Provider) => void;
  onViewAll?: () => void;
}

export const TrustedProsSection: React.FC<TrustedProsSectionProps> = ({
  providers,
  language,
  onSelectProvider,
  onBookProvider,
  onViewAll,
}) => {
  const t = translations[language];

  return (
    <section id="trusted-pros-section" className="max-w-4xl mx-auto px-4 py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
          {t.trustedProsHeading}
        </h2>
        {onViewAll && (
          <button
            id="view-all-pros-btn"
            onClick={onViewAll}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Scrolling / Responsive Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {providers.map((pro) => {
          const displayName = language === 'hi' ? pro.nameHi : pro.name;
          const displayTitle = language === 'hi' ? pro.titleHi : pro.title;
          const displayCategory = language === 'hi' ? pro.categoryNameHi : pro.categoryName;
          const displayDistance = language === 'hi' ? pro.distanceHi : pro.distance;

          return (
            <div
              key={pro.id}
              id={`pro-card-${pro.id}`}
              onClick={() => onSelectProvider(pro)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              {/* Photo Area with Rating Badge */}
              <div className="relative h-28 sm:h-32 w-full bg-slate-100 overflow-hidden">
                <img
                  src={pro.avatar}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Rating Badge (Green pill with star, exactly matching the screenshot: "4.8 ★") */}
                <div className="absolute top-2 right-2">
                  <div className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                    <span>{pro.rating.toFixed(1)}</span>
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                </div>

                {/* Available Live Indicator */}
                {pro.isAvailableNow && (
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>{t.availableNow}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Information Area */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                    {displayName}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {displayCategory}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px]">
                  <span className="font-extrabold text-slate-900">
                    ₹{pro.hourlyRate}
                    <span className="text-[10px] text-slate-400 font-normal"> {t.ratePerHour}</span>
                  </span>
                  <span className="text-slate-400 font-medium">
                    {displayDistance}
                  </span>
                </div>
              </div>

              {/* Card Action Quick Button */}
              <div className="px-3 pb-3 pt-0">
                <button
                  id={`book-pro-quick-btn-${pro.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookProvider(pro);
                  }}
                  className="w-full py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <CalendarCheck className="w-3 h-3" />
                  <span>{t.bookNow}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
