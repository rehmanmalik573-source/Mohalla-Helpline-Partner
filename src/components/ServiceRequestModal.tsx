import React, { useState } from 'react';
import { Category, ServiceRequest, CustomerProfile, Language, Provider } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Camera, 
  Upload, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Tag,
  AlertCircle
} from 'lucide-react';
import { ServiceIcon, ServiceIconBox } from './ServiceIcon';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  categories: Category[];
  language: Language;
  customer: CustomerProfile | null;
  providers: Provider[];
  onRequestSubmitted: (request: ServiceRequest) => void;
  onOpenAuth: () => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  category,
  categories,
  language,
  customer,
  providers,
  onRequestSubmitted,
  onOpenAuth,
}) => {
  const [selectedCatId, setSelectedCatId] = useState<number>(category?.id || 1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>(customer?.locality || 'शाहदरा, दिल्ली');
  const [dateOption, setDateOption] = useState<'today' | 'tomorrow' | 'later'>('today');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedRequest, setConfirmedRequest] = useState<ServiceRequest | null>(null);

  // Sync category when prop changes
  React.useEffect(() => {
    if (category) {
      setSelectedCatId(category.id);
      const defaultSub = language === 'hi' 
        ? (category.commonServicesHi?.[0] || 'सामान्य मरम्मत व सर्विस') 
        : (category.commonServices?.[0] || 'General Repair & Service');
      setSelectedService(defaultSub);
    }
  }, [category, language]);

  React.useEffect(() => {
    if (customer?.locality) {
      setLocation(customer.locality);
    }
  }, [customer]);

  if (!isOpen) return null;

  const t = translations[language];
  const activeCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  const subServices = language === 'hi'
    ? (activeCategory.commonServicesHi || ['सामान्य मरम्मत व सर्विस', 'जांच व कोटेशन'])
    : (activeCategory.commonServices || ['General Repair & Service', 'Inspection & Quote']);

  const quickProblemChips = language === 'hi' ? [
    'नल से पानी टपक रहा है',
    'करंट आ रहा है / स्विच खराब है',
    'पंखे की स्पीड कम है',
    'AC में कूलिंग नहीं हो रही',
    'ताला जाम हो गया है',
    'दीवार की पुताई करानी है'
  ] : [
    'Water leaking from tap',
    'Switch sparking / MCB tripping',
    'Fan speed slow',
    'AC not cooling properly',
    'Door lock is jammed',
    'Need room painting'
  ];

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If customer not logged in, prompt registration or use guest name
    const custId = customer?.id || 'guest-' + Date.now();
    const custName = customer?.name || (language === 'hi' ? 'ग्राहक' : 'Customer');
    const custPhone = customer?.phone || '+91 98765 43210';

    setIsSubmitting(true);

    // Pick matching provider from directory for this category
    const matchedPro = providers.find(p => p.categoryId === activeCategory.id) || providers[0];

    const newRequest: ServiceRequest = {
      id: 'REQ-' + Math.floor(10000 + Math.random() * 90000),
      customerId: custId,
      customerName: custName,
      customerPhone: custPhone,
      categoryId: activeCategory.id,
      categoryName: activeCategory.name,
      categoryNameHi: activeCategory.nameHi,
      serviceType: selectedService || subServices[0],
      problemDescription: description.trim() || (language === 'hi' ? 'सामान्य सर्विस व मरम्मत' : 'General repair and service'),
      photoUrl: photoUrl || undefined,
      location: location,
      preferredDate: dateOption === 'today' ? (language === 'hi' ? 'आज' : 'Today') : (dateOption === 'tomorrow' ? (language === 'hi' ? 'कल' : 'Tomorrow') : (language === 'hi' ? 'अगले 2 दिन' : 'Next 2 Days')),
      preferredTime: timeSlot,
      estimatedPrice: matchedPro.hourlyRate,
      status: 'requested',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      assignedProvider: {
        id: matchedPro.id,
        name: matchedPro.name,
        nameHi: matchedPro.nameHi,
        avatar: matchedPro.avatar,
        categoryName: matchedPro.categoryName,
        categoryNameHi: matchedPro.categoryNameHi,
        rating: matchedPro.rating,
        reviewCount: matchedPro.reviewCount,
        isVerified: matchedPro.isVerified,
        phone: matchedPro.phone,
        etaMinutes: matchedPro.responseMinutes || 15,
        badge: matchedPro.badge
      }
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedRequest(newRequest);
      onRequestSubmitted(newRequest);
    }, 700);
  };

  const handleClose = () => {
    setConfirmedRequest(null);
    setDescription('');
    setPhotoUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="service-request-flow-modal"
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <ServiceIconBox categoryId={activeCategory.id} size="sm" />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {confirmedRequest 
                  ? t.requestConfirmed 
                  : (language === 'hi' ? `${activeCategory.nameHi} सर्विस रिक्वेस्ट` : `${activeCategory.name} Service Request`)}
              </h2>
              <p className="text-xs text-amber-200 font-medium">
                {language === 'hi' ? '15 मिनट में वेरिफाइड कारीगर' : '15-Minute Verified Neighborhood Pros'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedRequest ? (
          <div className="p-6 overflow-y-auto space-y-5 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 text-3xl">
              ✓
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Request ID: {confirmedRequest.id}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
                {t.requestConfirmed}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {t.requestConfirmedSubtitle}
              </p>
            </div>

            {/* Request Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">सर्विस (Service):</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <span>{activeCategory.icon}</span>
                  <span>{confirmedRequest.serviceType}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">स्थान (Address):</span>
                <span className="font-bold text-slate-900">{confirmedRequest.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">शेड्यूल (Schedule):</span>
                <span className="font-bold text-slate-900">{confirmedRequest.preferredDate} ({confirmedRequest.preferredTime})</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">स्टेटस (Current Status):</span>
                <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {t.status_requested}
                </span>
              </div>
            </div>

            {/* Next step notification */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5 text-left">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Next: Provider Matching in Progress</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {language === 'hi' 
                    ? 'आप "मेरी रिक्वेस्ट्स" सेक्शन में लाइव स्टेटस देख सकते हैं।' 
                    : 'You can track live status anytime in "My Requests" section.'}
                </div>
              </div>
            </div>

            <button
              id="view-in-my-requests-btn"
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 cursor-pointer transition-all active:scale-[0.99]"
            >
              {language === 'hi' ? 'मेरी रिक्वेस्ट्स में देखें' : 'View in My Requests'}
            </button>
          </div>
        ) : (
          /* Main Service Request Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {/* Category Selector if user wants to change trade */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'सर्विस श्रेणी (Category)' : 'Service Category'}
              </label>
              <select
                id="request-category-select"
                value={selectedCatId}
                onChange={(e) => {
                  const newId = Number(e.target.value);
                  setSelectedCatId(newId);
                  const newCat = categories.find(c => c.id === newId);
                  if (newCat) {
                    const firstSub = language === 'hi'
                      ? (newCat.commonServicesHi?.[0] || 'सामान्य सेवा')
                      : (newCat.commonServices?.[0] || 'General Service');
                    setSelectedService(firstSub);
                  }
                }}
                className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {language === 'hi' ? c.nameHi : c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Service / Work Type Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'विशिष्ट काम चुनें' : 'Specific Work Type'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {subServices.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedService(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedService === sub
                        ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                        : 'bg-slate-50 hover:bg-amber-50/50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {t.problemDescription}
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  {language === 'hi' ? 'आसान शब्दों में लिखें' : 'Brief details'}
                </span>
              </div>
              <textarea
                id="request-problem-desc"
                rows={3}
                placeholder={t.problemPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl p-3 focus:outline-none focus:bg-white focus:border-amber-500 transition-all placeholder:text-slate-400"
              />
              
              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1 pt-0.5">
                {quickProblemChips.slice(0, 3).map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setDescription(chip)}
                    className="text-[10px] px-2 py-0.5 bg-amber-50/80 hover:bg-amber-100 text-amber-900 rounded-md border border-amber-200/60 font-medium cursor-pointer"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Location */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {t.serviceLocation} <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 focus-within:border-amber-500 rounded-2xl px-3 py-2.5">
                <MapPin className="w-4 h-4 text-amber-600 mr-2 shrink-0" />
                <input
                  id="request-location-input"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="शाहदरा, गली नं. 4, दिल्ली"
                  className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                {t.preferredSchedule}
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDateOption('today')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    dateOption === 'today'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'hi' ? 'आज (Today)' : 'Today'}
                </button>
                <button
                  type="button"
                  onClick={() => setDateOption('tomorrow')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    dateOption === 'tomorrow'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'hi' ? 'कल (Tomorrow)' : 'Tomorrow'}
                </button>
                <button
                  type="button"
                  onClick={() => setDateOption('later')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    dateOption === 'later'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'hi' ? 'अन्य दिन' : 'Later'}
                </button>
              </div>

              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl p-2.5 mt-1"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Optional Photo Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                {t.uploadPhotoOptional}
              </label>

              {photoUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-amber-300 bg-slate-50 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={photoUrl}
                      alt="Uploaded problem"
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-amber-400"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {language === 'hi' ? 'फोटो अटैच हो गई ✓' : 'Photo attached ✓'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {language === 'hi' ? 'कारीगर को समस्या समझने में मदद मिलेगी' : 'Helps technician understand issue'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhotoUrl(null)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                    title={t.removePhoto}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl p-3.5 flex items-center justify-center gap-2 text-slate-500 hover:text-amber-600 bg-slate-50/50 hover:bg-amber-50/30 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-semibold">{t.dragDropPhoto}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Rate & Trust Note */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold">{language === 'hi' ? 'निःशुल्क विजिट व नो-कैंसिलेशन फीस' : 'Free Inspection & ₹0 Cancel Fee'}</div>
                  <div className="text-[10px] text-slate-600">{language === 'hi' ? 'काम पूरा होने के बाद ही भुगतान करें' : 'Pay only after service completion'}</div>
                </div>
              </div>
              <span className="font-black text-sm text-slate-900">₹{activeCategory.avgRate || '₹250'}</span>
            </div>

            {/* Submit Button */}
            <button
              id="submit-service-request-btn"
              type="submit"
              disabled={isSubmitting || !location.trim()}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{language === 'hi' ? 'रिक्वेस्ट भेजी जा रही है...' : 'Submitting Request...'}</span>
              ) : (
                <>
                  <span>{t.requestService}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
