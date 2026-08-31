import React, { useState } from 'react';
import { Provider, Booking, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Tag,
  ShieldCheck 
} from 'lucide-react';

interface BookingModalProps {
  provider: Provider | null;
  language: Language;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  provider,
  language,
  onClose,
  onConfirmBooking,
}) => {
  if (!provider) return null;

  const t = translations[language];
  const specialties = language === 'hi' ? provider.specialtiesHi : provider.specialties;
  const [serviceType, setServiceType] = useState<string>(specialties[0] || 'जनरल चेकअप व रिपेयर');
  const [customIssue, setCustomIssue] = useState<string>('');
  const [dateOption, setDateOption] = useState<'today' | 'tomorrow'>('today');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM - 01:00 PM');
  const [address, setAddress] = useState<string>('गली नं. 4, शाहदरा, दिल्ली');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [couponCode, setCouponCode] = useState<string>('MOHALLA100');
  const [discountApplied, setDiscountApplied] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const baseLaborRate = provider.hourlyRate;
  const discount = discountApplied ? Math.min(100, baseLaborRate - 50) : 0;
  const platformFee = 25;
  const totalCost = baseLaborRate - discount + platformFee;

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM (शाम)',
  ];

  const handleBook = () => {
    setIsSubmitting(true);

    const newBooking: Booking = {
      id: 'MH-' + Math.floor(100000 + Math.random() * 900000),
      providerId: provider.id,
      providerName: language === 'hi' ? provider.nameHi : provider.name,
      providerAvatar: provider.avatar,
      providerPhone: provider.phone,
      categoryId: provider.categoryId,
      categoryName: language === 'hi' ? provider.categoryNameHi : provider.categoryName,
      serviceType: customIssue.trim() ? customIssue : serviceType,
      date: dateOption === 'today' ? (language === 'hi' ? 'आज' : 'Today') : (language === 'hi' ? 'कल' : 'Tomorrow'),
      timeSlot: timeSlot,
      address: address,
      notes: phone,
      isEmergency: false,
      totalEstimatedCost: totalCost,
      status: 'confirmed',
      createdAt: language === 'hi' ? 'अभी-अभी' : 'Just now'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onConfirmBooking(newBooking);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        id="booking-flow-modal"
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-400"
            />
            <div>
              <h2 className="text-sm font-bold">
                {language === 'hi' ? `${provider.nameHi} को बुक करें` : `Book ${provider.name}`}
              </h2>
              <p className="text-xs text-amber-200 font-medium">
                {language === 'hi' ? provider.categoryNameHi : provider.categoryName} • ₹{provider.hourlyRate}{t.ratePerHour}
              </p>
            </div>
          </div>

          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {language === 'hi' ? 'बुकिंग कन्फर्म हो गई है!' : 'Booking Confirmed!'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? `${provider.nameHi} को आपकी रिक्वेस्ट मिल गई है और वे निर्धारित समय पर पहुंचेंगे।`
                  : `${provider.name} has accepted your request and will arrive at scheduled time.`}
              </p>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-left text-xs space-y-1">
              <div className="flex justify-between text-slate-700">
                <span>{language === 'hi' ? 'सेवा:' : 'Service:'}</span>
                <span className="font-bold">{serviceType}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{language === 'hi' ? 'समय:' : 'Time:'}</span>
                <span className="font-bold">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-slate-700 font-extrabold text-amber-900 pt-1 border-t border-amber-200">
                <span>{language === 'hi' ? 'कुल अनुमानित राशि:' : 'Total Estimate:'}</span>
                <span>₹{totalCost}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              {language === 'hi' ? 'मेरी बुकिंग्स में देखें' : 'View in My Bookings'}
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Service Selection */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'सर्विस या काम चुनें' : 'Select Service Type'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Date Option */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'तारीख व समय' : 'Preferred Schedule'}
              </label>
              <div className="grid grid-cols-2 gap-2">
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
              </div>

              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl p-2.5 mt-1"
              >
                {timeSlots.map((ts) => (
                  <option key={ts} value={ts}>{ts}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'घर का पता (शाहदरा / दिल्ली इलाका)' : 'Home Address'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none"
              />
            </div>

            {/* Promo Code Box */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>MOHALLA100 (₹100 Off Applied)</span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                -₹{discount}
              </span>
            </div>

            {/* Bill Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'सर्विस चार्ज (1 घंटा):' : 'Labor Charge (1 hr):'}</span>
                <span>₹{baseLaborRate}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{language === 'hi' ? 'मोहल्ला प्रोमो डिस्काउंट:' : 'Mohalla Discount:'}</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'सुरक्षा व विजिट चार्ज:' : 'Convenience & Trust Fee:'}</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-slate-200 font-black text-slate-900 text-sm">
                <span>{language === 'hi' ? 'कुल राशि (काम के बाद दें):' : 'Total (Pay after service):'}</span>
                <span className="text-amber-600">₹{totalCost}</span>
              </div>
            </div>

            <button
              id="confirm-booking-btn"
              onClick={handleBook}
              disabled={isSubmitting || !address.trim()}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              {isSubmitting 
                ? (language === 'hi' ? 'बुकिंग हो रही है...' : 'Booking...') 
                : (language === 'hi' ? `बुकिंग कन्फर्म करें (₹${totalCost})` : `Confirm Booking (₹${totalCost})`)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
