import React, { useState, useRef, useMemo } from 'react';
import { Search, Home, X, Sparkles, ArrowRight, ShieldCheck, Star, Wrench, CheckCircle } from 'lucide-react';
import { Language, Category, Provider, ServiceItem, Subcategory, MainCategory } from '../types';
import { translations } from '../data/translations';
import { ServiceIconBox } from './ServiceIcon';
import { performUnifiedSearch } from '../utils/searchUtils';
import heroIllustration from '../assets/images/mohalla_hero_pros_1787606361270.jpg';

interface HeroSectionProps {
  language: Language;
  searchQuery: string;
  categories: Category[];
  providers: Provider[];
  onSearchChange: (query: string) => void;
  onSelectCategory: (cat: Category) => void;
  onSelectProvider: (p: Provider) => void;
  onSearchSubmit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  searchQuery,
  categories,
  providers,
  onSearchChange,
  onSelectCategory,
  onSelectProvider,
  onSearchSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 250);
  };

  // Comprehensive unified multi-lingual & synonym search
  const searchResults = useMemo(() => {
    return performUnifiedSearch(searchQuery, categories, providers, language);
  }, [searchQuery, categories, providers, language]);

  const hasSearchText = searchQuery.trim().length > 0;
  const noResultsFound = hasSearchText && !searchResults.hasResults;

  const handleSearch = () => {
    setIsFocused(false);
    inputRef.current?.blur();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelectServiceItem = (service: ServiceItem, sub: Subcategory, main: MainCategory) => {
    const matchedCategory = categories.find(c => c.subcategoryId === sub.id || c.mainCategoryId === main.id) || {
      id: main.id,
      name: service.name,
      nameHi: service.nameHi,
      icon: 'Wrench',
      color: main.color,
      image: sub.image || main.image,
      tagline: service.tagline || sub.description,
      taglineHi: service.taglineHi || sub.descriptionHi,
      avgRate: service.avgRate || '₹250 - ₹500',
      commonServices: [service.name],
      commonServicesHi: [service.nameHi],
      mainCategoryId: main.id,
      mainCategoryName: main.name,
      mainCategoryNameHi: main.nameHi,
      subcategoryId: sub.id,
      subcategoryName: sub.name,
      subcategoryNameHi: sub.nameHi,
    };
    onSelectCategory(matchedCategory);
    onSearchChange('');
    setIsFocused(false);
  };

  return (
    <section id="mohalla-hero" className="bg-transparent pt-3 pb-2 px-3.5 sm:px-4 max-w-4xl mx-auto relative z-30">
      {/* Top Banner Row matching Screenshot: Logo + Text on Left, Team Illustration on Right */}
      <div className="flex items-center justify-between gap-3 relative overflow-hidden">
        {/* Left Side: Brand Logo & Main Question Heading */}
        <div className="flex-1 space-y-2">
          {/* Logo with House Outline */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-2xs shrink-0">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                MOHALLA <span className="text-amber-600">HELP</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold leading-none">
                {language === 'hi' ? 'आपका मोहल्ला, आपकी मदद' : 'Your neighborhood, your support'}
              </p>
            </div>
          </div>

          {/* Main Question Heading matching screenshot: "आपको किस \n चीज़ की मदद चाहिए?" */}
          <div className="pt-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
              {language === 'hi' ? (
                <>
                  आपको किस<br />
                  <span className="text-amber-600">चीज़ की मदद चाहिए?</span>
                </>
              ) : (
                <>
                  What service do you<br />
                  <span className="text-amber-600">need help with?</span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Right Side: Pro Team Arch Illustration from Screenshot */}
        <div className="w-32 sm:w-44 h-24 sm:h-32 shrink-0 relative rounded-2xl overflow-hidden shadow-2xs border border-amber-100/80 bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center">
          <img
            src={heroIllustration}
            alt="Mohalla Help Verified Service Professionals Team"
            className="w-full h-full object-cover object-center select-none"
            referrerPolicy="no-referrer"
          />
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-1 left-1.5 right-1.5 px-1.5 py-0.5 bg-white/90 backdrop-blur-xs rounded-md text-[9px] font-black text-slate-900 text-center shadow-2xs truncate">
            {language === 'hi' ? 'भरोसेमंद मोहल्ला कारीगर' : 'Trusted Local Pros'}
          </div>
        </div>
      </div>

      {/* Screenshot-Matched Search Bar with Clean White Pill and Orange Circular Button */}
      <div className="mt-3.5 relative z-40">
        <div
          className={`flex items-center bg-white rounded-full p-1 shadow-xs border transition-all duration-150 ${
            isFocused ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          {/* Left Search Icon */}
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-4 h-4 text-slate-500" />
          </div>

          {/* Search Input Field */}
          <input
            id="mohalla-search-input"
            ref={inputRef}
            type="text"
            placeholder={language === 'hi' ? 'Service या काम search करें...' : 'Search for a service or repair...'}
            value={searchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-2 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 placeholder:font-normal bg-transparent"
          />

          {/* Clear "X" Button when typing */}
          {hasSearchText && (
            <button
              type="button"
              id="clear-search-btn"
              onClick={() => {
                onSearchChange('');
                if (inputRef.current) inputRef.current.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer mr-1 transition-colors"
              aria-label="Clear Search"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          {/* Circular Orange Search Action Button from Screenshot */}
          <button
            id="mohalla-search-submit-btn"
            type="button"
            onClick={handleSearch}
            className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer"
            aria-label="Submit Search"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Live Search Suggestions Dropdown with Keyboard-Aware Scrolling & Z-Index */}
        {isFocused && hasSearchText && (
          <div 
            id="search-live-dropdown"
            className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 max-h-[52vh] sm:max-h-80 overflow-y-auto overscroll-contain space-y-2 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Matching Direct Specific Services */}
            {searchResults.serviceItems.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider px-2 flex items-center justify-between">
                  <span>{language === 'hi' ? 'सीधे मिलने वाली सेवाएं' : 'Matching Services'}</span>
                  <span className="text-[9px] font-semibold text-slate-400">1-Tap Booking</span>
                </span>
                {searchResults.serviceItems.slice(0, 5).map((item) => (
                  <div
                    key={item.service.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectServiceItem(item.service, item.sub, item.main)}
                    className="p-2 hover:bg-amber-50/90 rounded-xl cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-amber-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-black text-[8px] uppercase tracking-wider">
                            SERVICE
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            {language === 'hi' ? item.service.nameHi : item.service.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {language === 'hi' ? item.sub.nameHi : item.sub.name} • {item.service.avgRate || '₹250+'}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold shadow-2xs shrink-0">
                      {language === 'hi' ? 'बुक करें' : 'Book'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Matching Categories */}
            {searchResults.categories.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2">
                  {language === 'hi' ? 'सर्विस श्रेणियां' : 'Service Categories'}
                </span>
                {searchResults.categories.map((cat) => (
                  <div
                    key={cat.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onSelectCategory(cat);
                      onSearchChange('');
                    }}
                    className="p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ServiceIconBox categoryId={cat.id} size="sm" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-black text-[8px] uppercase tracking-wider">
                            CATEGORY
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {language === 'hi' ? cat.nameHi : cat.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {language === 'hi' ? cat.taglineHi : cat.tagline}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold">
                      {t.requestService}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Matching Providers */}
            {searchResults.providers.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2">
                  {language === 'hi' ? 'वेरिफाइड कारीगर' : 'Verified Professionals'}
                </span>
                {searchResults.providers.map((pro) => (
                  <div
                    key={pro.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onSelectProvider(pro);
                      onSearchChange('');
                    }}
                    className="p-2 hover:bg-amber-50/80 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={pro.avatar} alt={pro.name} className="w-8 h-8 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-900 font-black text-[8px] uppercase tracking-wider">
                            PROVIDER
                          </span>
                          <span className="text-xs font-bold text-slate-900">{pro.name}</span>
                          {pro.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{pro.categoryName} • ₹{pro.hourlyRate}/hr • {pro.location}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5 shrink-0">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {pro.rating}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Friendly Empty State */}
            {noResultsFound && (
              <div className="p-4 text-center space-y-1">
                <div className="text-2xl">🔍</div>
                <p className="text-xs font-bold text-slate-800">
                  {t.noSearchResults}
                </p>
                <p className="text-[10px] text-slate-400">
                  {language === 'hi' ? 'उदा. सैलून, स्पा, प्लंबर, AC, इलेक्ट्रीशियन, पुताई' : 'e.g. Salon, Spa, Plumber, AC, Electrician, Painter'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

