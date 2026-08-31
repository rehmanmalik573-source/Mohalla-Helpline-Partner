import { Category, Provider, MainCategory, Subcategory, ServiceItem, Language } from '../types';
import { serviceHierarchy } from '../data/serviceHierarchy';

export interface CategoryDomainRule {
  categoryId: number;
  subcategoryId: string;
  keywords: string[];
}

/**
 * Domain rules mapping canonical services/categories to comprehensive user keywords, synonyms, translations, and typos.
 */
export const DOMAIN_RULES: CategoryDomainRule[] = [
  // 1. Plumber
  {
    categoryId: 1,
    subcategoryId: 'plumbing',
    keywords: [
      'plumber', 'plumb', 'pluming', 'plumer', 'plumbing', 'प्लंबर', 'प्लम्बर', 
      'नल', 'टोटी', 'पाइप', 'pipe', 'tap', 'leak', 'leakage', 'water motor', 
      'motor repair', 'drain', 'sanitary', 'कमोड', 'शावर', 'टोंटी', 'लीकेज', 
      'टंकी', 'tank cleaning', 'submersible', 'water pipe'
    ]
  },

  // 2. Electrician
  {
    categoryId: 2,
    subcategoryId: 'electrical',
    keywords: [
      'electrician', 'elect', 'elec', 'electrical', 'electritian', 'electric', 'इलेक्ट्रीशियन', 
      'इलेक्ट्रिशियन', 'bijli', 'बिजली', 'wiring', 'वायरिंग', 'fan', 'पंखा', 
      'ceiling fan', 'light', 'लाइट', 'switch', 'स्विच', 'socket', 'सॉकेट', 
      'inverter', 'इनवर्टर', 'इन्वर्टर', 'ups', 'mcb', 'fuse', 'short circuit', 'शॉर्ट सर्किट'
    ]
  },

  // 3. Painter
  {
    categoryId: 3,
    subcategoryId: 'painting',
    keywords: [
      'painter', 'paint', 'paintar', 'पेंटर', 'painting', 'पेंटिंग', 'putai', 
      'पुताई', 'rang', 'रंग', 'wall paint', 'house paint', 'wall painting', 
      'putty', 'पुट्टी', 'texture', 'टेक्सचर', 'distemper', 'weather coat', 
      'सफेदी', 'asian paints', 'whitewash'
    ]
  },

  // 4. Carpenter
  {
    categoryId: 5,
    subcategoryId: 'carpenter',
    keywords: [
      'carpenter', 'carpent', 'carp', 'carpentar', 'carpanter', 'कारपेंटर', 'बढ़ई', 
      'carpentry', 'wood', 'woodwork', 'लकड़ी', 'furniture', 'फर्नीचर', 
      'door repair', 'window repair', 'khidki', 'खिड़की', 'bed repair', 
      'sofa repair', 'almirah', 'अलमारी', 'wardrobe', 'drawer', 'lock fitting', 
      'hinges', 'कब्जा', 'लकड़ी का काम'
    ]
  },

  // 5. AC & Air Conditioner
  {
    categoryId: 7,
    subcategoryId: 'ac-repair',
    keywords: [
      'ac', 'a/c', 'a.c', 'a.c.', 'air conditioner', 'एसी', 'split ac', 
      'window ac', 'ac repair', 'ac service', 'ac installation', 'gas refill', 
      'cooling', 'कूलिंग', 'compressor', 'jet service', 'ac uninstallation'
    ]
  },

  // 6. Salon (Men & Women)
  {
    categoryId: 201,
    subcategoryId: 'salon',
    keywords: [
      'salon', 'saloon', 'sal', 'सलून', 'सैलून', 'haircut', 'हेयरकट', 'hair cut', 
      'barber', 'नाई', 'hair style', 'hair styling', 'hair color', 
      'hair colour', 'shave', 'shaving', 'शेविंग', 'beard', 'दाढ़ी', 
      'men salon', 'women salon', 'बाल काटना', 'बाल'
    ]
  },

  // 7. Beauty & Makeup
  {
    categoryId: 202,
    subcategoryId: 'beauty',
    keywords: [
      'beauty', 'ब्यूटी', 'makeup', 'मेकअप', 'facial', 'फेशियल', 'cleanup', 
      'क्लीनअप', 'manicure', 'मैनिक्योर', 'pedicure', 'पेडिक्योर', 'bridal', 
      'ब्राइडल', 'bridal makeup', 'waxing', 'वैक्सिंग', 'bleach', 'ब्लीच', 
      'mehendi', 'mehndi', 'मेहंदी', 'beautician'
    ]
  },

  // 8. Spa & Wellness
  {
    categoryId: 203,
    subcategoryId: 'spa-wellness',
    keywords: [
      'spa', 'स्पा', 'massage', 'मसाज', 'body spa', 'बॉडी स्पा', 'body massage', 
      'full body massage', 'head massage', 'champi', 'चंपी', 'मालिश', 
      'wellness', 'reflexology', 'foot massage', 'relaxation', 'तनाव मुक्ति', 
      'hair spa'
    ]
  },

  // 9. Accountant, CA & Business
  {
    categoryId: 4,
    subcategoryId: 'accountant',
    keywords: [
      'accountant', 'account', 'accounts', 'accounting', 'acc', 'अकाउंटेंट', 'अकाउंट', 
      'ca', 'c.a.', 'सीए', 'chartered accountant', 'gst', 'जीएसटी', 'gst return', 
      'itr', 'आईटीआर', 'itr return', 'tax', 'टैक्स', 'income tax', 'इनकम टैक्स', 
      'tally', 'टैली', 'tally prime', 'bookkeeping', 'बहीखाता', 'munim', 'मुनीम', 
      'audit', 'auditor', 'billing', 'बिलिंग', 'invoice', 'खाता', 'हिसाब'
    ]
  },

  // 10. Raj Mistri / Mason
  {
    categoryId: 301,
    subcategoryId: 'raj-mistri',
    keywords: [
      'mason', 'raj mistri', 'mistri', 'राज मिस्त्री', 'मिस्त्री', 'brickwork', 
      'चिनाई', 'brick', 'ईंट', 'cement', 'सीमेंट', 'plaster', 'प्लास्टर', 
      'slab', 'लेंटर', 'lanter', 'thekedar', 'ठेकेदार'
    ]
  },

  // 11. Tile & Flooring
  {
    categoryId: 302,
    subcategoryId: 'tile-flooring',
    keywords: [
      'tile', 'tiles', 'टाइल', 'टाइल्स', 'flooring', 'फ्लोरिंग', 'marble', 
      'मार्बल', 'granite', 'ग्रेनाइट', 'floor work', 'tile fitting'
    ]
  },

  // 12. Welder & Fabrication
  {
    categoryId: 303,
    subcategoryId: 'welding-fabrication',
    keywords: [
      'welder', 'weld', 'welding', 'वेल्डर', 'वेल्डिंग', 'fabrication', 
      'फैब्रिकेशन', 'iron', 'लोहा', 'gate', 'गेट', 'iron gate', 'grill', 
      'ग्रिल', 'shutter', 'शटर', 'railing', 'रेलिंग', 'लोहार'
    ]
  },

  // 13. Locksmith & Other Repair
  {
    categoryId: 15,
    subcategoryId: 'other-home-repair',
    keywords: [
      'locksmith', 'ताला', 'चाबी', 'लॉकस्मिथ', 'lock', 'key', 'chabi', 'tala', 
      'ताला चाबी', 'जाम ताला', 'waterproofing', 'वाटरप्रूफिंग', 'gardener', 'माली'
    ]
  },

  // 14. Cleaning & Pest Control
  {
    categoryId: 6,
    subcategoryId: 'cleaning',
    keywords: [
      'cleaning', 'cleaner', 'clean', 'क्लीनिंग', 'सफाई', 'झाड़ू', 'पोछा', 'deep clean', 
      'डीप क्लीनिंग', 'sofa cleaning', 'maid', 'बाई', 'pest control', 'पेस्ट कंट्रोल', 
      'दीमक', 'termite', 'cockroach', 'कॉकरोच', 'mosquito', 'मच्छर', 'घर सफाई'
    ]
  },

  // 15. Appliances
  {
    categoryId: 14,
    subcategoryId: 'appliances',
    keywords: [
      'washing machine', 'वाशिंग मशीन', 'fridge', 'refrigerator', 'फ्रिज', 
      'रेफ्रिजरेटर', 'geyser', 'गीजर', 'water heater', 'microwave', 'माइक्रोवेव',
      'appliance', 'उपकरण'
    ]
  },

  // 16. RO Purifier
  {
    categoryId: 13,
    subcategoryId: 'ro-water-purifier',
    keywords: [
      'ro', 'water purifier', 'आरओ', 'वाटर प्यूरीफायर', 'filter', 'पानी फिल्टर', 
      'kent ro', 'aquaguard'
    ]
  },

  // 17. Car Services & Mechanic
  {
    categoryId: 401,
    subcategoryId: 'car-service',
    keywords: [
      'car', 'कार', 'car mechanic', 'कार मैकेनिक', 'car repair', 'car wash', 'कार वाश',
      'automobile', 'motor mechanic'
    ]
  },

  // 18. Bike & Scooter Repair
  {
    categoryId: 402,
    subcategoryId: 'bike-repair',
    keywords: [
      'bike', 'बाइक', 'scooter', 'स्कूटर', 'motorcycle', 'मोटरसाइकिल', 'activa', 'एक्टिवा',
      'puncture', 'पंचर', 'two wheeler'
    ]
  },

  // 19. Mobile & Computer Repair
  {
    categoryId: 501,
    subcategoryId: 'mobile-repair',
    keywords: [
      'mobile', 'मोबाइल', 'phone', 'फोन', 'laptop', 'लैपटॉप', 'computer', 'कंप्यूटर',
      'screen repair', 'display', 'screen replacement', 'pc repair'
    ]
  },

  // 20. Ride, Taxi & Driver
  {
    categoryId: 601,
    subcategoryId: 'taxi-cab',
    keywords: [
      'taxi', 'टैक्सी', 'cab', 'कैब', 'driver', 'ड्राइवर', 'auto', 'ऑटो',
      'ride', 'राइड', 'car rental'
    ]
  },

  // 21. Delivery & Movers
  {
    categoryId: 602,
    subcategoryId: 'packers-movers',
    keywords: [
      'delivery', 'डिलीवरी', 'courier', 'कूरियर', 'parcel', 'पार्सल',
      'packers', 'movers', 'पैकर्स', 'मूवर्स', 'shifting', 'शिफ्टिंग', 'tempo', 'टेम्पो'
    ]
  }
];

export interface SearchExpansionDetails {
  originalQuery: string;
  tokens: string[];
  matchedRules: CategoryDomainRule[];
  matchedCategoryIds: Set<number>;
  matchedSubcategoryIds: Set<string>;
}

/**
 * Checks if query matches keyword safely with case-insensitivity and prefix/substring handling
 */
function isKeywordMatch(query: string, keyword: string): boolean {
  const q = query.toLowerCase().trim();
  const k = keyword.toLowerCase().trim();

  if (!q || !k) return false;

  // Exact match
  if (q === k) return true;

  // Substring match
  if (k.includes(q) || q.includes(k)) return true;

  // Word boundary match
  const kWords = k.split(/[\s,+/।()&._-]+/);
  for (const w of kWords) {
    if (w === q || (w.length >= 3 && (w.startsWith(q) || q.startsWith(w)))) {
      return true;
    }
  }

  return false;
}

/**
 * Evaluates the query against domain rules with case-insensitivity and trimming
 */
export function getExpandedSearchDetails(rawQuery: string): SearchExpansionDetails {
  const q = rawQuery.toLowerCase().trim().replace(/\s+/g, ' ');
  if (!q) {
    return {
      originalQuery: '',
      tokens: [],
      matchedRules: [],
      matchedCategoryIds: new Set(),
      matchedSubcategoryIds: new Set()
    };
  }

  const tokens = q.split(/[\s,+/।-]+/).map(t => t.trim()).filter(t => t.length > 0);
  const matchedRules: CategoryDomainRule[] = [];
  const matchedCategoryIds = new Set<number>();
  const matchedSubcategoryIds = new Set<string>();

  for (const rule of DOMAIN_RULES) {
    let ruleMatched = false;

    for (const kw of rule.keywords) {
      if (isKeywordMatch(q, kw)) {
        ruleMatched = true;
        break;
      }

      for (const token of tokens) {
        if (isKeywordMatch(token, kw)) {
          ruleMatched = true;
          break;
        }
      }

      if (ruleMatched) break;
    }

    if (ruleMatched) {
      matchedRules.push(rule);
      matchedCategoryIds.add(rule.categoryId);
      matchedSubcategoryIds.add(rule.subcategoryId);
    }
  }

  return {
    originalQuery: q,
    tokens,
    matchedRules,
    matchedCategoryIds,
    matchedSubcategoryIds
  };
}

/**
 * Returns string[] array of expanded keywords for compatibility
 */
export function getExpandedSearchKeywords(rawQuery: string): string[] {
  const details = getExpandedSearchDetails(rawQuery);
  const list: string[] = [details.originalQuery, ...details.tokens];
  details.matchedRules.forEach(r => r.keywords.forEach(k => list.push(k.toLowerCase())));
  return Array.from(new Set(list));
}

export interface UnifiedSearchResult {
  categories: Category[];
  providers: Provider[];
  serviceItems: {
    main: MainCategory;
    sub: Subcategory;
    service: ServiceItem;
  }[];
  hasResults: boolean;
}

/**
 * Searches across categories, providers, and deep service hierarchy with strict case-insensitivity.
 */
export function performUnifiedSearch(
  rawQuery: string,
  categories: Category[],
  providers: Provider[],
  language: Language = 'hi'
): UnifiedSearchResult {
  const query = (rawQuery || '').trim().replace(/\s+/g, ' ');
  if (!query) {
    return {
      categories: [],
      providers: [],
      serviceItems: [],
      hasResults: false
    };
  }

  const { originalQuery, tokens, matchedCategoryIds, matchedSubcategoryIds } = getExpandedSearchDetails(query);

  const isTextMatch = (text: string | undefined): boolean => {
    if (!text) return false;
    const lower = text.toLowerCase();
    if (isKeywordMatch(originalQuery, lower)) return true;
    for (const token of tokens) {
      if (isKeywordMatch(token, lower)) return true;
    }
    return false;
  };

  // 1. Matched Categories
  const matchedCategories = categories.filter(c => {
    const nameEn = (c.name || '').toLowerCase();
    const nameHi = (c.nameHi || '').toLowerCase();
    const subId = (c.subcategoryId || '').toLowerCase();
    const taglineEn = (c.tagline || '').toLowerCase();
    const taglineHi = (c.taglineHi || '').toLowerCase();

    // Check if domain rule matches
    if (matchedCategoryIds.has(c.id)) return true;
    if (subId && matchedSubcategoryIds.has(subId)) return true;

    // Check direct category text matches
    if (isTextMatch(nameEn) || isTextMatch(nameHi)) return true;
    if (isTextMatch(taglineEn) || isTextMatch(taglineHi)) return true;
    if ((c.commonServices || []).some(s => isTextMatch(s))) return true;
    if ((c.commonServicesHi || []).some(s => isTextMatch(s))) return true;

    return false;
  });

  const finalCategoryIds = new Set(matchedCategories.map(c => c.id));
  const finalSubcategoryIds = new Set(
    matchedCategories.map(c => (c.subcategoryId || '').toLowerCase()).filter(Boolean)
  );
  matchedSubcategoryIds.forEach(id => finalSubcategoryIds.add(id));

  // 2. Matched Deep Services from Service Hierarchy
  const matchedServices: {
    main: MainCategory;
    sub: Subcategory;
    service: ServiceItem;
  }[] = [];

  serviceHierarchy.forEach(main => {
    main.subcategories.forEach(sub => {
      const subId = sub.id.toLowerCase();
      const isSubMatched = finalSubcategoryIds.has(subId);

      sub.services.forEach(serv => {
        const servNameEn = serv.name;
        const servNameHi = serv.nameHi;
        const servTagline = `${serv.tagline || ''} ${serv.taglineHi || ''}`;

        let isMatch = false;
        if (isSubMatched) {
          isMatch = true;
        } else {
          isMatch = isTextMatch(servNameEn) || isTextMatch(servNameHi) || isTextMatch(servTagline);
        }

        if (isMatch) {
          matchedServices.push({ main, sub, service: serv });
        }
      });
    });
  });

  // Also include any flat category corresponding to matched services
  matchedServices.forEach(item => {
    const mappedCat = categories.find(
      c => (c.subcategoryId && c.subcategoryId.toLowerCase() === item.sub.id.toLowerCase()) ||
           (c.mainCategoryId && c.mainCategoryId === item.main.id)
    );
    if (mappedCat && !finalCategoryIds.has(mappedCat.id)) {
      matchedCategories.push(mappedCat);
      finalCategoryIds.add(mappedCat.id);
    }
  });

  // 3. Matched Providers
  const matchedCategoryNames = new Set(matchedCategories.map(c => c.name.toLowerCase()));
  const matchedCategoryNamesHi = new Set(matchedCategories.map(c => c.nameHi.toLowerCase()));

  const matchedProviders = providers.filter(p => {
    // Only verified, active providers should appear in customer search
    if (p.verificationStatus === 'rejected' || p.verificationStatus === 'pending' || (p.isVerified === false && p.verificationStatus !== 'verified')) {
      return false;
    }

    const pCatEn = (p.categoryName || '').toLowerCase();
    const pCatHi = (p.categoryNameHi || '').toLowerCase();

    // 1. If provider's category is matched, include the provider
    if (p.categoryId && finalCategoryIds.has(p.categoryId)) return true;
    if (matchedCategoryNames.has(pCatEn) || matchedCategoryNamesHi.has(pCatHi)) return true;

    // 2. Also match provider's own properties (Name, Title, Bio, Specialties)
    const pNameEn = p.name;
    const pNameHi = p.nameHi;
    const pTitleEn = p.title;
    const pTitleHi = p.titleHi;
    const pBioEn = p.bio;
    const pBioHi = p.bioHi;
    const pSpecEn = (p.specialties || []).join(' ');
    const pSpecHi = (p.specialtiesHi || []).join(' ');

    return (
      isTextMatch(pNameEn) || 
      isTextMatch(pNameHi) || 
      isTextMatch(pTitleEn) || 
      isTextMatch(pTitleHi) || 
      isTextMatch(pBioEn) || 
      isTextMatch(pBioHi) || 
      isTextMatch(pSpecEn) || 
      isTextMatch(pSpecHi)
    );
  });

  const hasResults = matchedCategories.length > 0 || matchedProviders.length > 0 || matchedServices.length > 0;

  return {
    categories: matchedCategories,
    providers: matchedProviders,
    serviceItems: matchedServices,
    hasResults
  };
}

