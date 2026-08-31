import React from 'react';
import { Category, Language } from '../types';
import { translations } from '../data/translations';
import { Grid, Sparkles, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { ServiceIconBox } from './ServiceIcon';

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  onRequestCategory: (cat: Category) => void;
  onViewAllCategories: () => void;
  onOpenUrgentRequest?: () => void;
  language: Language;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onRequestCategory,
  onViewAllCategories,
  onOpenUrgentRequest,
  language,
}) => {
  const t = translations[language];

  // 7 Popular Home Screen Categories matching Screenshot:
  // 1: Plumber (प्लंबर)
  // 2: Electrician (इलेक्ट्रीशियन)
  // 6: Cleaning (क्लीनिंग)
  // 14: Repairing (रिपेयरिंग)
  // 16: Delivery (डिलीवरी)
  // 7: AC Repair (AC / फ्रिज)
  // 5: Carpenter (कारपेंटर)
  const coreCategoryIds = [1, 2, 6, 14, 16, 7, 5];

  const featuredCategories = coreCategoryIds
    .map(id => categories.find(c => c.id === id))
    .filter((c): c is Category => c !== undefined);

  return (
    <section id="mohalla-categories" className="max-w-4xl mx-auto px-3.5 sm:px-4 py-2 space-y-3">
      {/* 8-Grid Category Cards (4 cols x 2 rows) matching Reference Design */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2.5 sm:gap-3.5">
        {featuredCategories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const displayName = language === 'hi' ? cat.nameHi : cat.name;

          return (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => onRequestCategory(cat)}
              className="flex flex-col items-center justify-start group cursor-pointer text-center focus:outline-none"
            >
              {/* Outer Icon Box with Full Bleed Photo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-2xs border border-slate-200/90 group-hover:border-amber-400 group-hover:shadow-xs transition-all duration-150 relative bg-slate-100 mb-1.5 shrink-0">
                <ServiceIconBox categoryId={cat.id} size="md" isSelected={isSelected} />
              </div>
              
              {/* Label */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors leading-tight line-clamp-1">
                {displayName}
              </span>
            </button>
          );
        })}

        {/* 8th Item: "और भी" / "More" with 4-grid dots */}
        <button
          id="cat-card-more"
          onClick={onViewAllCategories}
          className="flex flex-col items-center justify-start group cursor-pointer text-center focus:outline-none"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-rose-50 to-orange-50 border border-rose-200/80 group-hover:border-rose-400 group-hover:shadow-xs transition-all duration-150 flex items-center justify-center mb-1.5 shadow-2xs shrink-0">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white shadow-2xs">
              <Grid className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-tight">
            {language === 'hi' ? 'और भी' : 'More'}
          </span>
        </button>
      </div>
    </section>
  );
};
