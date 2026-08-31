import React, { useState, useMemo } from 'react';
import { Category, Provider, Language } from '../types';
import { translations } from '../data/translations';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Clock,
  Wrench
} from 'lucide-react';
import { ServiceIconBox, ServiceIcon } from './ServiceIcon';
import { performUnifiedSearch, getExpandedSearchKeywords } from '../utils/searchUtils';

interface FindServiceViewProps {
  categories: Category[];
  providers: Provider[];
  language: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToHome: () => void;
  onRequestCategory: (cat: Category) => void;
  onSelectProvider: (p: Provider) => void;
}

export const FindServiceView: React.FC<FindServiceViewProps> = ({
  categories,
  providers,
  language,
  searchQuery,
  onSearchChange,
  onBackToHome,
  onRequestCategory,
  onSelectProvider,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'emergency'>('all');
  const t = translations[language];

  const popularIssues = [
    { titleHi: 'नल से पानी टपक रहा है', titleEn: 'Water leaking from tap', catId: 1, icon: '🔧' },
    { titleHi: 'नया पंखा या लाइट लगाना', titleEn: 'Install ceiling fan / light', catId: 2, icon: '⚡' },
    { titleHi: 'कमरे की दीवार पुताई', titleEn: 'Room wall painting', catId: 3, icon: '🎨' },
    { titleHi: 'दरवाजे का लॉक जाम है', titleEn: 'Door lock jammed / repair', catId: 5, icon: '🪚' },
    { titleHi: 'AC में कूलिंग नहीं हो रही', titleEn: 'AC cooling issue / gas refill', catId: 7, icon: '❄️' },
    { titleHi: 'GST या ITR फाइलिंग', titleEn: 'GST / ITR Tax Filing', catId: 4, icon: '📊' },
  ];

  // Comprehensive multi-lingual search result
  const searchResults = useMemo(() => {
    return performUnifiedSearch(searchQuery, categories, providers, language);
  }, [searchQuery, categories, providers, language]);

  const hasSearchText = searchQuery.trim().length > 0;
  const filteredCategories = hasSearchText ? searchResults.categories : categories;
  const filteredProviders = hasSearchText ? searchResults.providers : providers;
  const filteredServices = hasSearchText ? searchResults.serviceItems : [];
  const noResultsFound = hasSearchText && !searchResults.hasResults;

  const handleSearchSubmit = () => {
    // Keep results focused on active query
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div id="find-service-view" className="max-w-4xl mx-auto px-4 py-4 space-y-4 animate-in fade-in duration-150 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <button
            id="back-to-home-btn"
            onClick={onBackToHome}
            className="w-9 h-9 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer"
            title={t.backToHome}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {t.findService}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'hi' ? 'अपनी समस्या खोजें और 1-क्लिक में रिक्वेस्ट भेजें' : 'Search any problem and request in 1-click'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Bar with Matching Search Button */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl p-1 shadow-2xs border border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-4 h-4 text-slate-500" />
          </div>

          <input
            id="find-service-search-input"
            type="text"
            placeholder={language === 'hi' ? 'जैसे: पंखा रिपेयर, पाइप लीकेज, पेंटर, कारपेंटर...' : 'e.g. Fan repair, pipe leakage, painter, carpenter...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-2.5 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 placeholder:font-normal bg-transparent"
          />

          {hasSearchText && (
            <button
              id="clear-find-service-search-btn"
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer mr-1 transition-colors"
              aria-label="Clear Search"
            >
              ✕
            </button>
          )}

          <button
            id="find-service-search-btn"
            type="button"
            onClick={handleSearchSubmit}
            className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer"
            aria-label="Submit Search"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Popular Problem Fast-Request Chips */}
      {!searchQuery && (
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? 'अक्सर होने वाली आम समस्याएं (Fast Request)' : 'Frequently Reported Issues (Fast Request)'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {popularIssues.map((issue, idx) => {
              const matchedCat = categories.find(c => c.id === issue.catId) || categories[0];
              return (
                <div
                  key={idx}
                  onClick={() => onRequestCategory(matchedCat)}
                  className="bg-white hover:bg-amber-50/60 rounded-2xl border border-slate-200 hover:border-amber-300 p-2.5 flex items-center justify-between cursor-pointer transition-colors shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <ServiceIconBox categoryId={matchedCat.id} size="sm" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                        {language === 'hi' ? issue.titleHi : issue.titleEn}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {language === 'hi' ? matchedCat.nameHi : matchedCat.name} • {matchedCat.avgRate || '₹249'}
                      </span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-amber-500 group-hover:bg-amber-600 text-white text-[11px] font-bold shadow-2xs shrink-0">
                    {t.requestService}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* If No Results Found */}
      {noResultsFound && (
        <div id="no-results-box" className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
            {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No services found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {language === 'hi'
              ? `"${searchQuery}" के लिए कोई सर्विस या कारीगर नहीं मिला। कृपया दूसरा शब्द खोजें या हमारी 24x7 हेल्पलाइन पर कॉल करें।`
              : `No services or professionals found matching "${searchQuery}". Try a different keyword or call our 24x7 helpline.`}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              id="clear-search-no-results-btn"
              onClick={() => onSearchChange('')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'सर्च रीसेट करें' : 'Clear Search'}
            </button>
            <a
              href="tel:18002026000"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>1800-202-6000</span>
            </a>
          </div>
        </div>
      )}

      {/* Specific Service Items Matches */}
      {filteredServices.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'सीधे मिलने वाली सेवाएं' : 'Matching Services'}</span>
            </h2>
            <span className="text-[11px] font-bold text-slate-400">
              {filteredServices.length} {language === 'hi' ? 'सेवाएं' : 'found'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredServices.slice(0, 6).map((item, idx) => {
              const serviceName = language === 'hi' ? item.service.nameHi : item.service.name;
              const subName = language === 'hi' ? item.sub.nameHi : item.sub.name;
              const matchedCat = categories.find(c => c.subcategoryId === item.sub.id || c.mainCategoryId === item.main.id) || categories[0];

              return (
                <div
                  key={idx}
                  onClick={() => onRequestCategory(matchedCat)}
                  className="bg-white hover:bg-amber-50/70 rounded-2xl border border-slate-200 hover:border-amber-400 p-3 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black text-[9px] uppercase tracking-wider">
                          SERVICE
                        </span>
                        <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-700">
                          {serviceName}
                        </h3>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {subName} • <span className="text-emerald-700 font-bold">{item.service.avgRate || '₹250+'}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 bg-amber-500 group-hover:bg-amber-600 text-white rounded-xl text-[11px] font-bold shadow-2xs shrink-0">
                    {t.requestService}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories Match */}
      {filteredCategories.length > 0 && (
        <div className="space-y-2 pt-1">
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>{language === 'hi' ? 'सर्विस श्रेणियां (Categories)' : 'Service Categories'}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {filteredCategories.slice(0, 8).map((cat) => {
              return (
                <div
                  key={cat.id}
                  onClick={() => onRequestCategory(cat)}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-3 text-center cursor-pointer transition-all hover:shadow-xs flex flex-col items-center justify-between group shadow-2xs relative"
                >
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-black text-[8px] uppercase tracking-wider">
                    CATEGORY
                  </span>
                  <div className="my-2 mt-4">
                    <ServiceIconBox categoryId={cat.id} size="md" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                    {language === 'hi' ? cat.nameHi : cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">{cat.avgRate || '₹250'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verified Professionals Listing */}
      {filteredProviders.length > 0 && (
        <div className="space-y-2 pt-2">
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>{t.trustedProsHeading}</span>
            <span className="text-[11px] font-bold text-slate-400">
              {filteredProviders.length} {language === 'hi' ? 'कारीगर' : 'Pros'}
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProviders.map((p) => {
              const displayName = language === 'hi' ? p.nameHi : p.name;
              const displayCategory = language === 'hi' ? p.categoryNameHi : p.categoryName;
              const displayLocation = language === 'hi' ? p.locationHi || p.location : p.location;
              const matchedCat = categories.find(c => c.id === p.categoryId) || categories[0];

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-amber-300 transition-all"
                >
                  <div 
                    onClick={() => onSelectProvider(p)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={p.avatar}
                        alt={displayName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-amber-300"
                      />
                      {p.isAvailableNow && (
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" title="Online / Available" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 font-black text-[9px] uppercase tracking-wider">
                          PROVIDER
                        </span>
                        <h3 className="text-xs font-extrabold text-slate-900">{displayName}</h3>
                        {p.isVerified && (
                          <span className="inline-flex items-center text-emerald-600" title="Verified Professional">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-amber-800 font-semibold">{displayCategory} • {p.experienceYears} Yrs Exp</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <div className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{p.rating}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          <span>{displayLocation}</span>
                        </div>
                        <span>•</span>
                        <span className="font-bold text-slate-700">₹{p.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onSelectProvider(p)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      {language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}
                    </button>
                    <button
                      onClick={() => onRequestCategory(matchedCat)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-2xs cursor-pointer shrink-0"
                    >
                      {t.requestService}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
