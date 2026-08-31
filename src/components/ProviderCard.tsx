import React from 'react';
import { Provider } from '../types';
import { 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  Zap, 
  Phone,
  CalendarCheck,
  Check
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
  onBook: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onSelect,
  onBook,
}) => {
  return (
    <div 
      id={`provider-card-${provider.id}`}
      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      {/* Card Header Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Avatar and Basic info */}
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-blue-400 transition-all"
              />
              {provider.isAvailableNow && (
                <span 
                  title="Available for immediate dispatch"
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 
                  onClick={() => onSelect(provider)}
                  className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {provider.name}
                </h3>
                {provider.isVerified && (
                  <span title="Verified Professional" className="text-blue-600">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{provider.title}</p>

              {/* Rating & Jobs */}
              <div className="flex items-center gap-2.5 mt-1.5 text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">{provider.jobsCompleted}+ jobs</span>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="text-right shrink-0">
            <div className="text-lg font-extrabold text-slate-900">${provider.hourlyRate}</div>
            <div className="text-[11px] text-slate-400 font-medium">/ hour</div>
          </div>
        </div>

        {/* Location & Response Time */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{provider.distance}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>~{provider.responseMinutes}m response</span>
          </div>
        </div>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {provider.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
            >
              {spec}
            </span>
          ))}
          {provider.specialties.length > 3 && (
            <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
              +{provider.specialties.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          id={`view-profile-btn-${provider.id}`}
          onClick={() => onSelect(provider)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
        >
          View Profile & Reviews
        </button>
        <button
          id={`book-pro-btn-${provider.id}`}
          onClick={() => onBook(provider)}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
