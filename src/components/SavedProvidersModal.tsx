import React from 'react';
import { Provider, Language, Category } from '../types';
import { translations } from '../data/translations';
import { X, Heart, Star, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';

interface SavedProvidersModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProviderIds: string[];
  providers: Provider[];
  categories: Category[];
  language: Language;
  onSelectProvider: (p: Provider) => void;
  onRequestCategory: (cat: Category) => void;
}

export const SavedProvidersModal: React.FC<SavedProvidersModalProps> = ({
  isOpen,
  onClose,
  savedProviderIds,
  providers,
  categories,
  language,
  onSelectProvider,
  onRequestCategory,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  // If none saved, show top verified pros
  const savedList = providers.filter(p => savedProviderIds.includes(p.id));
  const displayList = savedList.length > 0 ? savedList : providers.slice(0, 3);

  return (
    <div 
      id="saved-providers-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {t.savedProviders}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'आपके पसंदीदा व भरोसेमंद कारीगर' : 'Your trusted & bookmarked technicians'}
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

        {/* List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {displayList.map((pro) => {
            const displayName = language === 'hi' ? pro.nameHi : pro.name;
            const displayCat = language === 'hi' ? pro.categoryNameHi : pro.categoryName;
            const matchedCat = categories.find(c => c.id === pro.categoryId) || categories[0];

            return (
              <div
                key={pro.id}
                className="p-3.5 bg-slate-50 hover:bg-amber-50/50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition-colors"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectProvider(pro);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={pro.avatar}
                    alt={displayName}
                    className="w-12 h-12 rounded-2xl object-cover ring-1 ring-amber-300 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-slate-900">{displayName}</h3>
                      {pro.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <span className="text-[11px] text-amber-800 font-semibold">{displayCat}</span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-slate-800">{pro.rating}</span>
                      <span>•</span>
                      <span>₹{pro.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onRequestCategory(matchedCat);
                  }}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-2xs cursor-pointer shrink-0"
                >
                  {t.bookNow}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
