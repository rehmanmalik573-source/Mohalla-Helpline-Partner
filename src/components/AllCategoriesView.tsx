import React, { useState, useMemo } from 'react';
import { Category, Language, MainCategory, Subcategory, ServiceItem } from '../types';
import { serviceHierarchy } from '../data/serviceHierarchy';
import { translations } from '../data/translations';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  SlidersHorizontal,
  User,
  Users
} from 'lucide-react';
import { ServiceIconBox } from './ServiceIcon';
import { getExpandedSearchKeywords } from '../utils/searchUtils';

interface AllCategoriesViewProps {
  categories: Category[];
  language: Language;
  onBackToHome: () => void;
  onSelectCategoryForRequest: (category: Category) => void;
}

export const AllCategoriesView: React.FC<AllCategoriesViewProps> = ({
  categories,
  language,
  onBackToHome,
  onSelectCategoryForRequest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMainId, setSelectedMainId] = useState<number>(101); // Default to Home Repair
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');

  const t = translations[language];

  const currentMainCategory = useMemo(() => {
    return serviceHierarchy.find(m => m.id === selectedMainId) || serviceHierarchy[0];
  }, [selectedMainId]);

  // When switching main category, default to its first subcategory
  const currentSubcategory = useMemo(() => {
    if (!currentMainCategory) return null;
    if (selectedSubId) {
      const found = currentMainCategory.subcategories.find(s => s.id === selectedSubId);
      if (found) return found;
    }
    return currentMainCategory.subcategories[0] || null;
  }, [currentMainCategory, selectedSubId]);

  // Search indexing across Main, Sub, Service, and Type with expanded keywords & synonyms
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const keywords = getExpandedSearchKeywords(searchTerm);

    const matches: {
      main: MainCategory;
      sub: Subcategory;
      service: ServiceItem;
      matchedText: string;
    }[] = [];

    serviceHierarchy.forEach(main => {
      main.subcategories.forEach(sub => {
        sub.services.forEach(serv => {
          const mainNameEn = main.name.toLowerCase();
          const mainNameHi = main.nameHi.toLowerCase();
          const subNameEn = sub.name.toLowerCase();
          const subNameHi = sub.nameHi.toLowerCase();
          const servNameEn = serv.name.toLowerCase();
          const servNameHi = serv.nameHi.toLowerCase();
          const taglineEn = (serv.tagline || '').toLowerCase();
          const taglineHi = (serv.taglineHi || '').toLowerCase();
          const gender = (serv.genderOrType || '').toLowerCase();

          const combined = `${mainNameEn} ${mainNameHi} ${subNameEn} ${subNameHi} ${servNameEn} ${servNameHi} ${taglineEn} ${taglineHi} ${gender}`;

          const isMatch = keywords.some(k => combined.includes(k));

          if (isMatch) {
            matches.push({
              main,
              sub,
              service: serv,
              matchedText: language === 'hi' ? serv.nameHi : serv.name
            });
          }
        });
      });
    });

    return matches;
  }, [searchTerm, language]);

  const handleRequestServiceItem = (service: ServiceItem, sub: Subcategory, main: MainCategory) => {
    // Find matching Category object or build one
    const matchedCategory = categories.find(c => c.subcategoryId === sub.id || c.mainCategoryId === main.id) || {
      id: main.id,
      name: service.name,
      nameHi: service.nameHi,
      icon: sub.emoji || main.emoji || '🔧',
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

    onSelectCategoryForRequest(matchedCategory);
  };

  return (
    <div id="all-categories-view" className="max-w-5xl mx-auto px-3 sm:px-4 py-4 space-y-4 animate-in fade-in duration-150 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer active:scale-95 transition-all"
            title={t.backToHome}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{language === 'hi' ? 'सभी सेवाएं और श्रेणियां' : 'All Service Categories'}</span>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                11 {language === 'hi' ? 'मुख्य श्रेणियां' : 'Categories'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'hi' 
                ? 'मुख्य श्रेणी → उप-श्रेणी → सेवा चुनें और तुरंत कारीगर बुलाएं' 
                : 'Main Category → Subcategory → Service → Book verified pro'}
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder={language === 'hi' 
            ? 'कोई भी काम खोजें (उदा: अकाउंटेंट, वेल्डर, राज मिस्त्री, मेंस हेयरकट, बाइक टैक्सी, गार्ड...)' 
            : 'Search anything (e.g. Accountant, Welder, Raj Mistri, Men Salon, Bike Taxi, Security Guard...)'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 focus:border-amber-500 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none shadow-2xs"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results Display */}
      {searchResults !== null ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {language === 'hi' 
                ? `खोज परिणाम: ${searchResults.length} सेवाएं मिलीं` 
                : `Search Results: ${searchResults.length} services found`}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-8 text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">
                {language === 'hi' ? 'कोई सेवा नहीं मिली' : 'No services found for your search'}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'कृपया स्पेलिंग जांचें या दूसरा शब्द खोजें' : 'Please check spelling or try another keyword'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {searchResults.map(({ main, sub, service }, idx) => {
                const serviceName = language === 'hi' ? service.nameHi : service.name;
                const subName = language === 'hi' ? sub.nameHi : sub.name;
                const mainName = language === 'hi' ? main.nameHi : main.name;
                const tagline = language === 'hi' ? service.taglineHi : service.tagline;

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    onClick={() => handleRequestServiceItem(service, sub, main)}
                    className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                  >
                    <div>
                      {/* Breadcrumb path */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mb-2">
                        <span>{main.emoji} {mainName}</span>
                        <ChevronRight className="w-2.5 h-2.5" />
                        <span className="text-slate-600">{subName}</span>
                        {service.genderOrType && service.genderOrType !== 'all' && (
                          <span className="ml-auto text-[9px] bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded-full uppercase border border-amber-200/60">
                            {service.genderOrType === 'men' ? (language === 'hi' ? 'पुरुष' : 'Men') : (language === 'hi' ? 'महिला' : 'Women')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <ServiceIconBox categoryId={main.id} size="sm" />
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {serviceName}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 font-medium mt-0.5">
                              {tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                        {service.avgRate || '₹250 - ₹500'}
                      </span>
                      <span className="text-xs font-extrabold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>{t.requestService}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Hierarchical Category Browser: MAIN CATEGORY -> SUBCATEGORY -> SERVICE */
        <div className="space-y-4">
          {/* Main Category Horizontal Carousel / Tabs */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? '1. मुख्य श्रेणी चुनें' : '1. Select Main Category'}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {serviceHierarchy.map((main) => {
                const isSelected = main.id === selectedMainId;
                const displayName = language === 'hi' ? main.nameHi : main.name;

                return (
                  <button
                    key={main.id}
                    onClick={() => {
                      setSelectedMainId(main.id);
                      setSelectedSubId(main.subcategories[0]?.id || null);
                      setGenderFilter('all');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shrink-0 font-extrabold text-xs transition-all cursor-pointer snap-start border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{main.emoji}</span>
                    <span>{displayName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Main Category Highlight Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/10 shrink-0">
                {currentMainCategory.emoji}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  {language === 'hi' ? currentMainCategory.nameHi : currentMainCategory.name}
                </h2>
                <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
                  {language === 'hi' ? currentMainCategory.descriptionHi : currentMainCategory.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold bg-white/10 px-3 py-1.5 rounded-xl self-stretch sm:self-auto justify-center">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'hi' ? '100% वेरिफाइड कारीगर' : '100% Verified Pros'}</span>
            </div>
          </div>

          {/* Subcategories Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? '2. उप-श्रेणी (Subcategory)' : '2. Subcategory'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {currentMainCategory.subcategories.map((sub) => {
                const isSelected = currentSubcategory?.id === sub.id;
                const subName = language === 'hi' ? sub.nameHi : sub.name;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubId(sub.id);
                      setGenderFilter('all');
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-600 shadow-xs ring-2 ring-amber-400/40'
                        : 'bg-white text-slate-800 font-bold border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg shrink-0">{sub.emoji || '🔧'}</span>
                    <span className="text-xs line-clamp-1 leading-tight">{subName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* For Whom / Gender Filter (Only for Salon, Beauty & Spa) */}
          {currentSubcategory?.hasGenderFilter && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950">
                <Users className="w-4 h-4 text-amber-600" />
                <span>{language === 'hi' ? 'किसके लिए सेवा चाहिए? (For Whom)' : 'Select Customer Type:'}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setGenderFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    genderFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 hover:bg-amber-100/50'
                  }`}
                >
                  {language === 'hi' ? 'सभी' : 'All'}
                </button>
                <button
                  onClick={() => setGenderFilter('men')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    genderFilter === 'men'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  <span>👨</span>
                  <span>{language === 'hi' ? 'पुरुष (Men)' : 'Men'}</span>
                </button>
                <button
                  onClick={() => setGenderFilter('women')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    genderFilter === 'women'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-pink-50'
                  }`}
                >
                  <span>👩</span>
                  <span>{language === 'hi' ? 'महिला (Women)' : 'Women'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Services List under Selected Subcategory */}
          {currentSubcategory && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'hi' ? '3. सेवा चुनें और तुरंत बुक करें' : '3. Select Service & Request'}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {language === 'hi' ? 'सीधा घर पर सेवा उपलब्ध' : 'Doorstep service available'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentSubcategory.services
                  .filter(service => {
                    if (genderFilter === 'all') return true;
                    if (!service.genderOrType || service.genderOrType === 'all') return true;
                    return service.genderOrType === genderFilter;
                  })
                  .map((service) => {
                    const serviceName = language === 'hi' ? service.nameHi : service.name;
                    const tagline = language === 'hi' ? service.taglineHi : service.tagline;

                    return (
                      <div
                        key={service.id}
                        onClick={() => handleRequestServiceItem(service, currentSubcategory, currentMainCategory)}
                        className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <ServiceIconBox categoryId={currentMainCategory.id} size="sm" />
                              <div>
                                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                                  {serviceName}
                                </h3>
                                {service.genderOrType && service.genderOrType !== 'all' && (
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-md">
                                    {service.genderOrType === 'men' ? (language === 'hi' ? 'पुरुष (Men)' : 'Men') : (language === 'hi' ? 'महिला (Women)' : 'Women')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className="text-xs font-black text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/70 shrink-0">
                              {service.avgRate || '₹250 - ₹500'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 font-medium mt-2.5 leading-relaxed">
                            {tagline}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600 group-hover:text-amber-700">
                          <span>{t.requestService}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
