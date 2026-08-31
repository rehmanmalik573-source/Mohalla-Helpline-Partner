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

  // 7. Service Requests State (Customer bookings received by providers)
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('mohalla_partner_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
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
        serviceType: 'पाइप लीकेज व नल रिपेयर',
        problemDescription: 'बाथरूम के नल से लगातार पानी टपक रहा है। मुख्य वाल्व भी ढीला है।',
        location: 'गली नं. 3, शाहदरा, दिल्ली',
        preferredDate: 'आज (Today)',
        preferredTime: '11:00 AM - 01:00 PM',
        estimatedPrice: 249,
        status: 'requested',
        createdAt: '10 मिनट पहले',
        updatedAt: '10 मिनट पहले',
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
        serviceType: 'वॉश बेसिन ड्रेनेज ब्लॉकेज',
        problemDescription: 'किचन सिंक और बेसिन का पानी रुक गया है। तुरंत समाधान चाहिए।',
        location: 'ब्लॉक बी, विवेक विहार, दिल्ली',
        preferredDate: 'आज (Today)',
        preferredTime: '02:00 PM - 04:00 PM',
        estimatedPrice: 349,
        status: 'accepted',
        createdAt: '25 मिनट पहले',
        updatedAt: '15 मिनट पहले',
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
        serviceType: 'पानी की मोटर फिटिंग',
        problemDescription: 'छत की पानी टंकी में नया फ्लोट वाल्व और मोटर कनेक्शन लगाना था।',
        location: 'गली नं. 7, शाहदरा, दिल्ली',
        preferredDate: 'कल',
        preferredTime: '04:00 PM - 06:00 PM',
        estimatedPrice: 499,
        status: 'completed',
        createdAt: 'कल',
        updatedAt: 'कल',
        ratingGiven: 5,
        reviewGiven: 'बहुत ही पेशेवर और समय के पाबंद कारीगर थे। काम समय पर पूरा किया।',
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
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          updatedAt: 'Just now'
        };
      }
      return req;
    }));

    const statusTitles: Record<RequestStatus, { en: string; hi: string }> = {
      requested: { en: 'Request Received', hi: 'रिक्वेस्ट प्राप्त हुई' },
      provider_found: { en: 'Order Assigned 🔍', hi: 'ऑर्डर असाइन हुआ 🔍' },
      accepted: { en: 'Job Accepted 🤝', hi: 'काम स्वीकार हुआ 🤝' },
      on_the_way: { en: 'Marked On The Way 🛵', hi: 'रास्ते में निकलें 🛵' },
      service_started: { en: 'Service In Progress ⚡', hi: 'काम शुरू हुआ ⚡' },
      completed: { en: 'Job Completed & Paid! ✓', hi: 'काम पूरा व भुगतान प्राप्त! ✓' },
      cancelled: { en: 'Job Cancelled / Declined ✕', hi: 'काम रद्द / अस्वीकृत' },
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
      setProviders(all => all.map(p => p.id === prev.id ? next : p));
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
        serviceType: 'किचन सिंक लीकेज व पाइप रिपेयर',
        desc: 'किचन सिंक के नीचे से पानी रिस रहा है। पाइप बदलना पड़ सकता है।',
        price: 299,
        loc: 'गली नं. 5, शाहदरा, दिल्ली',
        cust: 'सुनीता शर्मा (Sunita Sharma)',
        phone: '+91 98765 99887'
      },
      {
        serviceType: 'गीजर इंस्टालेशन व प्लंबिंग चेक',
        desc: 'नया 15L का गीजर फिट करना है और इनलेट/आउटलेट कनेक्शन जोड़ना है।',
        price: 399,
        loc: 'ब्लॉक सी, विवेक विहार, दिल्ली',
        cust: 'दीपक वर्मा (Deepak Verma)',
        phone: '+91 98111 88776'
      },
      {
        serviceType: 'वॉटर मोटर रिपेयर व वाल्व बदलना',
        desc: 'पानी की मोटर पानी नहीं उठा रही। चेक वाल्व बदलना होगा।',
        price: 449,
        loc: 'ईस्ट आजाद नगर, दिल्ली',
        cust: 'मनोज कुमार (Manoj Kumar)',
        phone: '+91 98990 44332'
      }
    ];

    const randomPick = sampleProblems[Math.floor(Math.random() * sampleProblems.length)];
    const newReqId = 'REQ-' + Math.floor(10000 + Math.random() * 90000);

    const newReq: ServiceRequest = {
      id: newReqId,
      customerId: 'cust-' + Math.floor(100 + Math.random() * 900),
      customerName: randomPick.cust,
      customerPhone: randomPick.phone,
      categoryId: currentProvider.categoryId || 1,
      categoryName: currentProvider.categoryName || 'Plumber',
      categoryNameHi: currentProvider.categoryNameHi || 'प्लंबर',
      serviceType: randomPick.serviceType,
      problemDescription: randomPick.desc,
      location: randomPick.loc,
      preferredDate: 'आज (Today)',
      preferredTime: 'Next 30 Mins',
      estimatedPrice: randomPick.price,
      status: 'requested',
      createdAt: 'Just now',
      updatedAt: 'Just now',
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
      title: `New Service Request #${newReq.id} Received! 🔔`,
      titleHi: `नई सर्विस रिक्वेस्ट #${newReq.id} प्राप्त हुई! 🔔`,
      message: `${newReq.serviceType} at ${newReq.location} - ₹${newReq.estimatedPrice}`,
      messageHi: `${newReq.location} से ${newReq.serviceType} का ऑर्डर - ₹${newReq.estimatedPrice}`,
      timestamp: 'Just now',
      requestId: newReq.id,
      read: false,
      type: 'status_change'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id?: string) => {
    if (!id) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } else {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  return (
    <div 
      id="mohalla-helpline-partner-app"
      className="min-h-screen bg-slate-50/70 text-slate-900 font-sans flex flex-col selection:bg-amber-500 selection:text-white pb-20 sm:pb-8"
    >
      {/* 1. Dedicated Partner Top Sticky Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentLocation={currentLocation}
        onLocationChange={setCurrentLocation}
        requests={requests}
        provider={currentProvider}
        notifications={notifications}
        onNavigate={() => {
          setCurrentTab('dashboard');
        }}
        onOpenRequestsTab={() => setCurrentTab('requests')}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenJoinPro={() => setIsJoinProModalOpen(true)}
        onOpenHelpSupport={() => setIsHelpSupportOpen(true)}
        onOpenPayments={() => setIsPaymentsModalOpen(true)}
        onOpenReviews={() => setIsReviewsModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onLogout={() => {
          alert(language === 'hi' ? 'पार्टनर सेशन सक्रिय है।' : 'Partner session is active.');
        }}
        onToggleOnline={() => {
          if (currentProvider.verificationStatus === 'rejected') {
            alert(
              language === 'hi'
                ? 'सत्यापन अस्वीकृत होने के कारण आप ऑनलाइन नहीं जा सकते। कृपया अपने दस्तावेज पुनः सबमिट करें।'
                : 'Cannot go online: Account verification rejected. Please re-submit your KYC documents.'
            );
            return;
          }
          if (currentProvider.verificationStatus === 'pending') {
            alert(
              language === 'hi'
                ? 'सत्यापन प्रक्रियाधीन है। एडमिन द्वारा स्वीकृति के बाद आप ऑनलाइन हो सकेंगे।'
                : 'Verification is pending. You can go online once approved by Admin.'
            );
            return;
          }
          handleUpdateProvider({ isAvailableNow: !currentProvider.isAvailableNow });
        }}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* 2. Primary Partner Workspace & Dashboard */}
      <main className="flex-1">
        <ProviderDashboardView
          provider={currentProvider}
          requests={requests}
          categories={categories}
          language={language}
          onUpdateStatus={handleUpdateStatus}
          onUpdateProvider={handleUpdateProvider}
          onSimulateNewRequest={handleSimulateNewRequest}
          onOpenHelpSupport={() => setIsHelpSupportOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          activeMainTab={currentTab}
          onChangeMainTab={setCurrentTab}
        />
      </main>

      {/* 3. Partner Profile, KYC, Document Verification & Test Profile Switcher Modal */}
      <ProviderProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        provider={currentProvider}
        allProviders={providers}
        categories={categories}
        language={language}
        onUpdateProvider={handleUpdateProvider}
        onSelectProvider={handleSelectProvider}
        onOpenJoinPro={() => setIsJoinProModalOpen(true)}
      />

      {/* 4. Partner Registration / Onboarding Modal */}
      <JoinAsProModal
        isOpen={isJoinProModalOpen}
        onClose={() => setIsJoinProModalOpen(false)}
        categories={categories}
        language={language}
        onAddProvider={handleAddProvider}
      />

      {/* 5. Partner Earnings & Payout History Modal */}
      <CustomerPaymentsModal
        isOpen={isPaymentsModalOpen}
        onClose={() => setIsPaymentsModalOpen(false)}
        requests={requests}
        language={language}
        userRole={userRole}
        onSimulatePay={(reqId) => {
          handleUpdateStatus(reqId, 'completed');
        }}
      />

      {/* 6. Partner Ratings & Customer Reviews Modal */}
      <CustomerReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        requests={requests}
        language={language}
      />

      {/* 7. Partner Helpline & Emergency Support Modal */}
      <HelpSupportModal
        isOpen={isHelpSupportOpen}
        onClose={() => setIsHelpSupportOpen(false)}
        language={language}
      />

      {/* 8. About Mohalla Helpline Partner Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        language={language}
      />

      {/* 9. Partner Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        userRole={userRole}
        onOpenRoleModal={() => {}}
      />

      {/* 10. Partner Footer */}
      <Footer
        categories={categories}
        language={language}
        onSelectCategory={() => setCurrentTab('dashboard')}
        onOpenEmergency={() => setIsHelpSupportOpen(true)}
        onOpenJoinPro={() => setIsJoinProModalOpen(true)}
      />

      {/* 11. Mobile-First Dedicated Partner Bottom Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        activeRequestsCount={
          requests.filter(
            r => r.status === 'requested' || r.status === 'provider_found' || r.status === 'accepted' || r.status === 'on_the_way' || r.status === 'service_started'
          ).length
        }
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenPayments={() => setIsPaymentsModalOpen(true)}
      />
    </div>
  );
}
