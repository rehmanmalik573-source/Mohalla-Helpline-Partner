import React, { useState, useEffect } from 'react';
import { categories as initialCategories } from './data/categories';
import { mockProviders as initialProviders } from './data/providers';
import { 
  Category, 
  Provider, 
  ServiceRequest, 
  RequestStatus, 
  CustomerNotification, 
  Language,
  UserRole
} from './types';
import { translations } from './data/translations';

// Partner Components
import { Header } from './components/Header';
import { ProviderDashboardView } from './components/ProviderDashboardView';
import { ProviderProfileModal } from './components/ProviderProfileModal';
import { JoinAsProModal } from './components/JoinAsProModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { AboutModal } from './components/AboutModal';
import { SettingsModal } from './components/SettingsModal';
import { CustomerPaymentsModal } from './components/CustomerPaymentsModal';
import { CustomerReviewsModal } from './components/CustomerReviewsModal';
import { BottomNavBar } from './components/BottomNavBar';
import { Footer } from './components/Footer';

export default function App() {
  // 1. Language state (Hindi / English with persistence)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mohalla_language');
    return (saved as Language) || 'hi';
  });

  // 2. User role locked strictly to 'provider' (Mohalla Helpline Partner)
  const userRole: UserRole = 'provider';

  // 3. Current active partner tab
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'requests' | 'earnings' | 'profile'>('dashboard');

  // 4. Partner categories & list of registered providers
  const [categories] = useState<Category[]>(initialCategories);

  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('mohalla_providers');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }

    return initialProviders;
  });

  // 5. Active logged-in provider profile
  const [currentProvider, setCurrentProvider] = useState<Provider>(() => {
    const savedId = localStorage.getItem('mohalla_current_provider_id');

    if (savedId) {
      const found = (initialProviders || []).find(p => p.id === savedId);
      if (found) return found;
    }

    return initialProviders[0];
  });

  // 6. Current locality
  const [currentLocation, setCurrentLocation] = useState<string>('शाहदरा, दिल्ली');

  // 7. Service Requests State
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('mohalla_partner_requests');

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ServiceRequest[];

        /*
         * Bilingual migration:
         * Older saved requests may have Hindi text stored in the
         * English fields. Fix the known demo requests while preserving
         * their current status, price, customer, provider and other data.
         */
        const legacyRequestFixes: Record<string, Partial<ServiceRequest>> = {
          'REQ-84920': {
            serviceType: 'Pipe Leakage & Tap Repair',
            serviceTypeHi: 'पाइप लीकेज व नल रिपेयर',
            problemDescription:
              'Water is continuously dripping from the bathroom tap. The main valve is also loose.',
            problemDescriptionHi:
              'बाथरूम के नल से लगातार पानी टपक रहा है। मुख्य वाल्व भी ढीला है।',
            location: 'Lane No. 3, Shahdara, Delhi',
            locationHi: 'गली नं. 3, शाहदरा, दिल्ली',
            preferredDate: 'Today',
            preferredDateHi: 'आज',
            preferredTime: '11:00 AM - 01:00 PM',
            preferredTimeHi: '11:00 AM - 01:00 PM',
            createdAt: '10 minutes ago',
            createdAtHi: '10 मिनट पहले',
            updatedAt: '10 minutes ago',
            updatedAtHi: '10 मिनट पहले'
          },

          'REQ-91044': {
            serviceType: 'Wash Basin Drainage Blockage',
            serviceTypeHi: 'वॉश बेसिन ड्रेनेज ब्लॉकेज',
            problemDescription:
              'The kitchen sink and wash basin are blocked. Immediate service is required.',
            problemDescriptionHi:
              'किचन सिंक और बेसिन का पानी रुक गया है। तुरंत समाधान चाहिए।',
            location: 'Block B, Vivek Vihar, Delhi',
            locationHi: 'ब्लॉक बी, विवेक विहार, दिल्ली',
            preferredDate: 'Today',
            preferredDateHi: 'आज',
            preferredTime: '02:00 PM - 04:00 PM',
            preferredTimeHi: '02:00 PM - 04:00 PM',
            createdAt: '25 minutes ago',
            createdAtHi: '25 मिनट पहले',
            updatedAt: '15 minutes ago',
            updatedAtHi: '15 मिनट पहले'
          },

          'REQ-73210': {
            serviceType: 'Water Motor Installation',
            serviceTypeHi: 'पानी की मोटर फिटिंग',
            problemDescription:
              'A new float valve and motor connection were required for the rooftop water tank.',
            problemDescriptionHi:
              'छत की पानी टंकी में नया फ्लोट वाल्व और मोटर कनेक्शन लगाना था।',
            location: 'Lane No. 7, Shahdara, Delhi',
            locationHi: 'गली नं. 7, शाहदरा, दिल्ली',
            preferredDate: 'Tomorrow',
            preferredDateHi: 'कल',
            preferredTime: '04:00 PM - 06:00 PM',
            preferredTimeHi: '04:00 PM - 06:00 PM',
            createdAt: 'Yesterday',
            createdAtHi: 'कल',
            updatedAt: 'Yesterday',
            updatedAtHi: 'कल'
          }
        };

        const migratedRequests = parsed.map(req => {
          const fix = legacyRequestFixes[req.id];

          /*
           * Known legacy demo requests receive their correct bilingual
           * values. Other requests remain untouched except for filling
           * missing bilingual fields from their existing values.
           */
          if (fix) {
            return {
              ...req,
              ...fix
            };
          }

          return {
            ...req,
            serviceType: req.serviceType || req.serviceTypeHi,
            serviceTypeHi: req.serviceTypeHi || req.serviceType,
            problemDescription:
              req.problemDescription || req.problemDescriptionHi,
            problemDescriptionHi:
              req.problemDescriptionHi || req.problemDescription,
            location: req.location || req.locationHi,
            locationHi: req.locationHi || req.location,
            preferredDate: req.preferredDate || req.preferredDateHi,
            preferredDateHi: req.preferredDateHi || req.preferredDate,
            preferredTime: req.preferredTime || req.preferredTimeHi,
            preferredTimeHi: req.preferredTimeHi || req.preferredTime,
            createdAt: req.createdAt || req.createdAtHi,
            createdAtHi: req.createdAtHi || req.createdAt,
            updatedAt: req.updatedAt || req.updatedAtHi,
            updatedAtHi: req.updatedAtHi || req.updatedAt
          };
        });

        /*
         * Save the corrected bilingual data immediately so the fix
         * remains available after refresh/reload.
         */
        localStorage.setItem(
          'mohalla_partner_requests',
          JSON.stringify(migratedRequests)
        );

        return migratedRequests;
      } catch (e) {
        // fallback
      }
    }

    return [
      {
        id: 'REQ-84920',
        customerId: 'cust-101',
        customerName: 'अमित शर्मा (Amit Sharma)',
        customerPhone: '+91 98765 43210',
        categoryId: 1,
        categoryName: 'Plumber',
        categoryNameHi: 'प्लंबर',

        serviceType: 'Pipe Leakage & Tap Repair',
        serviceTypeHi: 'पाइप लीकेज व नल रिपेयर',

        problemDescription:
          'Water is continuously dripping from the bathroom tap. The main valve is also loose.',
        problemDescriptionHi:
          'बाथरूम के नल से लगातार पानी टपक रहा है। मुख्य वाल्व भी ढीला है।',

        location: 'Lane No. 3, Shahdara, Delhi',
        locationHi: 'गली नं. 3, शाहदरा, दिल्ली',

        preferredDate: 'Today',
        preferredDateHi: 'आज',

        preferredTime: '11:00 AM - 01:00 PM',
        preferredTimeHi: '11:00 AM - 01:00 PM',

        estimatedPrice: 249,
        status: 'requested',

        createdAt: '10 minutes ago',
        createdAtHi: '10 मिनट पहले',

        updatedAt: '10 minutes ago',
        updatedAtHi: '10 मिनट पहले',

        assignedProvider: {
          id: 'p1',
          name: 'Rahul Sharma',
          nameHi: 'राहुल शर्मा (प्लंबर)',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
          categoryName: 'Plumber',
          categoryNameHi: 'प्लंबर',
          rating: 4.8,
          reviewCount: 142,
          isVerified: true,
          phone: '+91 98765 43210',
          etaMinutes: 10,
          badge: 'Top Rated Pro'
        }
      },

      {
        id: 'REQ-91044',
        customerId: 'cust-102',
        customerName: 'सुनील वर्मा (Sunil Verma)',
        customerPhone: '+91 98111 22334',
        categoryId: 1,
        categoryName: 'Plumber',
        categoryNameHi: 'प्लंबर',

        serviceType: 'Wash Basin Drainage Blockage',
        serviceTypeHi: 'वॉश बेसिन ड्रेनेज ब्लॉकेज',

        problemDescription:
          'The kitchen sink and wash basin are blocked. Immediate service is required.',
        problemDescriptionHi:
          'किचन सिंक और बेसिन का पानी रुक गया है। तुरंत समाधान चाहिए।',

        location: 'Block B, Vivek Vihar, Delhi',
        locationHi: 'ब्लॉक बी, विवेक विहार, दिल्ली',

        preferredDate: 'Today',
        preferredDateHi: 'आज',

        preferredTime: '02:00 PM - 04:00 PM',
        preferredTimeHi: '02:00 PM - 04:00 PM',

        estimatedPrice: 349,
        status: 'accepted',

        createdAt: '25 minutes ago',
        createdAtHi: '25 मिनट पहले',

        updatedAt: '15 minutes ago',
        updatedAtHi: '15 मिनट पहले',

        assignedProvider: {
          id: 'p1',
          name: 'Rahul Sharma',
          nameHi: 'राहुल शर्मा (प्लंबर)',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
          categoryName: 'Plumber',
          categoryNameHi: 'प्लंबर',
          rating: 4.8,
          reviewCount: 142,
          isVerified: true,
          phone: '+91 98765 43210',
          etaMinutes: 10,
          badge: 'Top Rated Pro'
        }
      },

      {
        id: 'REQ-73210',
        customerId: 'cust-103',
        customerName: 'राजेश गुप्ता (Rajesh Gupta)',
        customerPhone: '+91 98990 11223',
        categoryId: 1,
        categoryName: 'Plumber',
        categoryNameHi: 'प्लंबर',

        serviceType: 'Water Motor Installation',
        serviceTypeHi: 'पानी की मोटर फिटिंग',

        problemDescription:
          'A new float valve and motor connection were required for the rooftop water tank.',
        problemDescriptionHi:
          'छत की पानी टंकी में नया फ्लोट वाल्व और मोटर कनेक्शन लगाना था।',

        location: 'Lane No. 7, Shahdara, Delhi',
        locationHi: 'गली नं. 7, शाहदरा, दिल्ली',

        preferredDate: 'Tomorrow',
        preferredDateHi: 'कल',

        preferredTime: '04:00 PM - 06:00 PM',
        preferredTimeHi: '04:00 PM - 06:00 PM',

        estimatedPrice: 499,
        status: 'completed',

        createdAt: 'Yesterday',
        createdAtHi: 'कल',

        updatedAt: 'Yesterday',
        updatedAtHi: 'कल',

        ratingGiven: 5,

        reviewGiven:
          'बहुत ही पेशेवर और समय के पाबंद कारीगर थे। काम समय पर पूरा किया।',

        assignedProvider: {
          id: 'p1',
          name: 'Rahul Sharma',
          nameHi: 'राहुल शर्मा (प्लंबर)',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
          categoryName: 'Plumber',
          categoryNameHi: 'प्लंबर',
          rating: 4.8,
          reviewCount: 142,
          isVerified: true,
          phone: '+91 98765 43210',
          etaMinutes: 0
        }
      }
    ];
  });

  // 8. Partner Notifications
  const [notifications, setNotifications] = useState<CustomerNotification[]>([
    {
      id: 'notif-1',
      title: 'New Service Request in Shahdara 🔔',
      titleHi: 'शाहदरा में नई सर्विस रिक्वेस्ट मिली 🔔',
      message: 'New request for Tap Repair #REQ-84920. Accept now to claim.',
      messageHi: 'नल रिपेयर के लिए नई रिक्वेस्ट #REQ-84920। काम स्वीकार करने के लिए टैप करें।',
      timestamp: '10m ago',
      requestId: 'REQ-84920',
      read: false,
      type: 'status_change'
    },
    {
      id: 'notif-2',
      title: 'Daily Payout Settlement Successful 💰',
      titleHi: 'दैनिक कमाई बैंक खाते में जमा हुई 💰',
      message: '₹1,240 settled directly to your UPI ID rahul.sharma@okaxis.',
      messageHi: '₹1,240 सीधे आपके UPI खाते में क्रेडिट कर दिए गए हैं।',
      timestamp: '2h ago',
      read: false,
      type: 'promo'
    }
  ]);

  // 9. Modals State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isJoinProModalOpen, setIsJoinProModalOpen] = useState(false);
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mohalla_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('mohalla_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('mohalla_partner_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('mohalla_current_provider_id', currentProvider.id);
  }, [currentProvider]);

  // Handlers
  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);

    if (lang === 'en' && currentLocation === 'शाहदरा, दिल्ली') {
      setCurrentLocation('Shahdara, Delhi');
    } else if (lang === 'hi' && currentLocation === 'Shahdara, Delhi') {
      setCurrentLocation('शाहदरा, दिल्ली');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    setRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: newStatus,
            updatedAt: 'Just now',
            updatedAtHi: 'अभी'
          };
        }

        return req;
      })
    );

    const statusTitles: Record<RequestStatus, { en: string; hi: string }> = {
      requested: {
        en: 'Request Received',
        hi: 'रिक्वेस्ट प्राप्त हुई'
      },
      provider_found: {
        en: 'Order Assigned 🔍',
        hi: 'ऑर्डर असाइन हुआ 🔍'
      },
      accepted: {
        en: 'Job Accepted 🤝',
        hi: 'काम स्वीकार हुआ 🤝'
      },
      on_the_way: {
        en: 'Marked On The Way 🛵',
        hi: 'रास्ते में निकलें 🛵'
      },
      service_started: {
        en: 'Service In Progress ⚡',
        hi: 'काम शुरू हुआ ⚡'
      },
      completed: {
        en: 'Job Completed & Paid! ✓',
        hi: 'काम पूरा व भुगतान प्राप्त! ✓'
      },
      cancelled: {
        en: 'Job Cancelled / Declined ✕',
        hi: 'काम रद्द / अस्वीकृत'
      },
    };

    const notifItem: CustomerNotification = {
      id: 'notif-' + Date.now(),
      title: statusTitles[newStatus]?.en || 'Status Updated',
      titleHi: statusTitles[newStatus]?.hi || 'स्टेटस अपडेट हुआ',
      message: `Job #${id} status changed to ${newStatus.replace('_', ' ')}`,
      messageHi: `काम #${id} का स्टेटस अपडेट कर दिया गया है।`,
      timestamp: 'Just now',
      requestId: id,
      read: false,
      type: 'status_change'
    };

    setNotifications(prev => [notifItem, ...prev]);
  };

  const handleUpdateProvider = (updated: Partial<Provider>) => {
    setCurrentProvider(prev => {
      const next = { ...prev, ...updated };

      setProviders(all =>
        all.map(p => p.id === prev.id ? next : p)
      );

      return next;
    });
  };

  const handleSelectProvider = (p: Provider) => {
    setCurrentProvider(p);
  };

  const handleAddProvider = (newPro: Provider) => {
    setProviders(prev => [newPro, ...prev]);
    setCurrentProvider(newPro);
  };

  const handleSimulateNewRequest = () => {
    const sampleProblems = [
      {
        serviceType: 'Kitchen Sink Leakage & Pipe Repair',
        serviceTypeHi: 'किचन सिंक लीकेज व पाइप रिपेयर',

        desc:
          'Water is leaking from under the kitchen sink. The pipe may need replacement.',
        descHi:
          'किचन सिंक के नीचे से पानी रिस रहा है। पाइप बदलना पड़ सकता है।',

        price: 299,

        loc: 'Lane No. 5, Shahdara, Delhi',
        locHi: 'गली नं. 5, शाहदरा, दिल्ली',

        cust: 'सुनीता शर्मा (Sunita Sharma)',
        phone: '+91 98765 99887'
      },

      {
        serviceType: 'Geyser Installation & Plumbing Check',
        serviceTypeHi: 'गीजर इंस्टालेशन व प्लंबिंग चेक',

        desc:
          'Need to install a new 15L geyser and connect the inlet/outlet pipes.',
        descHi:
          'नया 15L का गीजर फिट करना है और इनलेट/आउटलेट कनेक्शन जोड़ना है।',

        price: 399,

        loc: 'Block C, Vivek Vihar, Delhi',
        locHi: 'ब्लॉक सी, विवेक विहार, दिल्ली',

        cust: 'दीपक वर्मा (Deepak Verma)',
        phone: '+91 98111 88776'
      },

      {
        serviceType: 'Water Motor Repair & Valve Replacement',
        serviceTypeHi: 'वॉटर मोटर रिपेयर व वाल्व बदलना',

        desc:
          'The water motor is not lifting water. The check valve needs replacement.',
        descHi:
          'पानी की मोटर पानी नहीं उठा रही। चेक वाल्व बदलना होगा।',

        price: 449,

        loc: 'East Azad Nagar, Delhi',
        locHi: 'ईस्ट आजाद नगर, दिल्ली',

        cust: 'मनोज कुमार (Manoj Kumar)',
        phone: '+91 98990 44332'
      }
    ];

    const randomPick =
      sampleProblems[Math.floor(Math.random() * sampleProblems.length)];

    const newReqId =
      'REQ-' + Math.floor(10000 + Math.random() * 90000);

    const newReq: ServiceRequest = {
      id: newReqId,

      customerId:
        'cust-' + Math.floor(100 + Math.random() * 900),

      customerName: randomPick.cust,
      customerPhone: randomPick.phone,

      categoryId: currentProvider.categoryId || 1,
      categoryName: currentProvider.categoryName || 'Plumber',
      categoryNameHi: currentProvider.categoryNameHi || 'प्लंबर',

      serviceType: randomPick.serviceType,
      serviceTypeHi: randomPick.serviceTypeHi,

      problemDescription: randomPick.desc,
      problemDescriptionHi: randomPick.descHi,

      location: randomPick.loc,
      locationHi: randomPick.locHi,

      preferredDate: 'Today',
      preferredDateHi: 'आज',

      preferredTime: 'Next 30 Mins',
      preferredTimeHi: 'अगले 30 मिनट',

      estimatedPrice: randomPick.price,

      status: 'requested',

      createdAt: 'Just now',
      createdAtHi: 'अभी',

      updatedAt: 'Just now',
      updatedAtHi: 'अभी',

      assignedProvider: {
        id: currentProvider.id,
        name: currentProvider.name,
        nameHi: currentProvider.nameHi,
        avatar: currentProvider.avatar,
        categoryName: currentProvider.categoryName,
        categoryNameHi: currentProvider.categoryNameHi,
        rating: currentProvider.rating,
        reviewCount: currentProvider.reviewCount,
        isVerified: currentProvider.isVerified,
        phone: currentProvider.phone,
        etaMinutes: 15,
        badge: currentProvider.badge
      }
    };

    setRequests(prev => [newReq, ...prev]);

    const newNotif: CustomerNotification = {
      id: 'notif-' + Date.now(),

      title:
        `New Service Request #${newReq.id} Received! 🔔`,

      titleHi:
        `नई सर्विस रिक्वेस्ट #${newReq.id} प्राप्त हुई! 🔔`,

message:
  `${newReq.serviceType} at ${newReq.location} - ₹${newReq.estimatedPrice}`,

messageHi:
  `${newReq.locationHi} से ${newReq.serviceTypeHi} का ऑर्डर - ₹${newReq.estimatedPrice}`,
