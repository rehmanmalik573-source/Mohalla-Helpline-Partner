import React, { useState } from 'react';
import { Booking, BookingStatus, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Star, 
  AlertCircle, 
  Navigation, 
  ShieldCheck 
} from 'lucide-react';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  language: Language;
  onUpdateBookingStatus: (id: string, status: BookingStatus) => void;
  onCancelBooking: (id: string) => void;
  onRateBooking: (id: string, rating: number, review: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  language,
  onUpdateBookingStatus,
  onCancelBooking,
  onRateBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');

  if (!isOpen) return null;

  const t = translations[language];

  const activeBookings = bookings.filter(
    b => b.status === 'confirmed' || b.status === 'on_the_way' || b.status === 'in_progress'
  );
  const historyBookings = bookings.filter(
    b => b.status === 'completed' || b.status === 'cancelled'
  );

  const displayedBookings = activeTab === 'active' ? activeBookings : historyBookings;

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
            {language === 'hi' ? 'कन्फर्म' : 'Confirmed'}
          </span>
        );
      case 'on_the_way':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center gap-1 animate-pulse">
            <Navigation className="w-3 h-3" />
            {language === 'hi' ? 'रास्ते में हैं (10 min)' : 'En Route (10m)'}
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px]">
            {language === 'hi' ? 'काम चल रहा है' : 'In Progress'}
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
            {language === 'hi' ? 'पूरा हुआ ✓' : 'Completed ✓'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">
            {language === 'hi' ? 'रद्द' : 'Cancelled'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="my-bookings-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="bg-[#0B1A30] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold">{t.myBookings}</h2>
              <p className="text-[11px] text-slate-300">
                {bookings.length} {language === 'hi' ? 'कुल ऑर्डर्स' : 'total orders'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'active'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'hi' ? `सक्रिय बुकिंग (${activeBookings.length})` : `Active (${activeBookings.length})`}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'hi' ? `इतिहास (${historyBookings.length})` : `History (${historyBookings.length})`}
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {displayedBookings.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                📋
              </div>
              <p className="text-xs font-bold text-slate-700">
                {language === 'hi' ? 'कोई बुकिंग नहीं है' : 'No bookings found'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'होम स्क्रीन से किसी भी कारीगर को बुक करें।' : 'Book any local professional from home screen.'}
              </p>
            </div>
          ) : (
            displayedBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-3"
              >
                {/* Top Info */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    ID: {b.id}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={b.providerAvatar}
                    alt={b.providerName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-amber-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {b.providerName}
                    </h4>
                    <p className="text-[11px] text-amber-700 font-semibold truncate">
                      {b.serviceType}
                    </p>
                    <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{b.date}</span>
                      <span>•</span>
                      <span>{b.timeSlot}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-[11px] text-slate-600 flex justify-between">
                  <span>{b.address}</span>
                  <span className="font-bold text-slate-900">₹{b.totalEstimatedCost}</span>
                </div>

                {/* Actions based on status */}
                {b.status === 'confirmed' && (
                  <div className="flex gap-2 pt-1">
                    <a
                      href={`tel:${b.providerPhone}`}
                      className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-slate-600" />
                      <span>{t.callNow}</span>
                    </a>
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'on_the_way')}
                      className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      {language === 'hi' ? 'रास्ते में ट्रैक करें' : 'Track Status'}
                    </button>
                  </div>
                )}

                {b.status === 'on_the_way' && (
                  <div className="flex gap-2 pt-1">
                    <a
                      href={`tel:${b.providerPhone}`}
                      className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{language === 'hi' ? 'ड्राइवर/कारीगर को कॉल' : 'Call Pro'}</span>
                    </a>
                    <button
                      onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      {language === 'hi' ? 'काम पूरा हुआ' : 'Mark Completed'}
                    </button>
                  </div>
                )}

                {b.status === 'completed' && !b.ratingGiven && (
                  <div>
                    {ratingBookingId === b.id ? (
                      <div className="p-2.5 bg-amber-50 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{language === 'hi' ? 'रेटिंग दें:' : 'Rate Pro:'}</span>
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingStars(star)}
                                className="cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${star <= ratingStars ? 'fill-amber-500' : 'text-slate-300'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder={language === 'hi' ? 'काम कैसा रहा?' : 'How was the service?'}
                          value={ratingComment}
                          onChange={(e) => setRatingComment(e.target.value)}
                          className="w-full p-1.5 bg-white border border-amber-200 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => {
                            onRateBooking(b.id, ratingStars, ratingComment);
                            setRatingBookingId(null);
                          }}
                          className="w-full py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs cursor-pointer"
                        >
                          {language === 'hi' ? 'रिव्यू सबमिट करें' : 'Submit Review'}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRatingBookingId(b.id)}
                        className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{language === 'hi' ? 'कारीगर को 5-स्टार रेट करें' : 'Rate Experience'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
