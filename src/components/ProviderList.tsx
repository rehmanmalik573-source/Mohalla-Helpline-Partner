import React from 'react';
import { Provider, FilterOptions } from '../types';
import { ProviderCard } from './ProviderCard';
import { 
  SlidersHorizontal, 
  Check, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowUpDown,
  SearchX
} from 'lucide-react';

interface ProviderListProps {
  providers: Provider[];
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onSelectProvider: (provider: Provider) => void;
  onBookProvider: (provider: Provider) => void;
  onResetFilters: () => void;
}

export const ProviderList: React.FC<ProviderListProps> = ({
  providers,
  filters,
  onFilterChange,
  onSelectProvider,
  onBookProvider,
  onResetFilters,
}) => {
  return (
    <section id="provider-list-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Control Bar & Filter Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Result Count & Active Quick Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-slate-800">
            {providers.length} {providers.length === 1 ? 'Professional Available' : 'Professionals Available'}
          </span>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Available Now Toggle */}
          <button
            id="toggle-available-now"
            onClick={() => onFilterChange({ onlyAvailableNow: !filters.onlyAvailableNow })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filters.onlyAvailableNow
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Available Now</span>
            {filters.onlyAvailableNow && <Check className="w-3 h-3 ml-0.5" />}
          </button>

          {/* Verified Only Toggle */}
          <button
            id="toggle-verified-only"
            onClick={() => onFilterChange({ onlyVerified: !filters.onlyVerified })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filters.onlyVerified
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Pros Only</span>
            {filters.onlyVerified && <Check className="w-3 h-3 ml-0.5" />}
          </button>
        </div>

        {/* Right: Sort Options */}
        <div className="flex items-center gap-2.5 self-end md:self-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </div>
          <select
            id="provider-sort-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="rating">Top Rated (Highest Rating)</option>
            <option value="jobs">Most Experienced (Job Count)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="fastest">Fastest Response Time</option>
          </select>
        </div>
      </div>

      {/* Grid of Providers */}
      {providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onSelect={onSelectProvider}
              onBook={onBookProvider}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Service Providers Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, clear filters, or select another service category.
          </p>
          <button
            id="reset-all-filters-empty-btn"
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
