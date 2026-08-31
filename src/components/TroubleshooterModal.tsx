import React, { useState } from 'react';
import { Category, Provider } from '../types';
import { 
  X, 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  DollarSign, 
  Clock, 
  Wrench
} from 'lucide-react';

interface TroubleshooterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  providers: Provider[];
  onSelectCategory: (id: number) => void;
  onBookProvider: (provider: Provider) => void;
}

interface PredefinedIssue {
  title: string;
  categoryId: number;
  description: string;
  typicalCost: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  causes: string[];
}

const COMMON_ISSUES: PredefinedIssue[] = [
  {
    title: "Water leaking under sink or ceiling",
    categoryId: 1, // Plumber
    description: "Supply line joint leak, failed P-trap gasket, or valve corrosion.",
    typicalCost: "$75 - $150",
    urgency: "Emergency",
    causes: ["Degraded compression seal", "Corroded copper pipe", "High water pressure valve failure"]
  },
  {
    title: "Circuit breaker tripped & won't stay on",
    categoryId: 2, // Electrician
    description: "Direct ground fault, overloaded circuit branch, or failed breaker switch.",
    typicalCost: "$85 - $180",
    urgency: "High",
    causes: ["Shorted appliance coil", "Loose neutral wire", "Breaker terminal wear"]
  },
  {
    title: "AC running but blowing lukewarm air",
    categoryId: 7, // AC Repair
    description: "Refrigerant leak, burnt start/run capacitor, or frozen evaporator coils.",
    typicalCost: "$90 - $220",
    urgency: "High",
    causes: ["Low Freon levels", "Blown dual run capacitor", "Dirty outdoor condenser"]
  },
  {
    title: "Car brake squealing or soft pedal",
    categoryId: 12, // Mechanic
    description: "Worn ceramic friction material down to wear indicator shim.",
    typicalCost: "$120 - $240",
    urgency: "High",
    causes: ["Brake pad wear past 3mm", "Rotor glazing", "Air in hydraulic line"]
  },
  {
    title: "Refrigerator warm but freezer still cold",
    categoryId: 8, // Fridge Repair
    description: "Evaporator fan failure or defrost thermostat cycle blockage.",
    typicalCost: "$80 - $160",
    urgency: "Medium",
    causes: ["Frosted air damper door", "Failed evaporator blower", "Defrost timer glitch"]
  },
  {
    title: "Washing machine won't drain or spin",
    categoryId: 9, // Washing Machine
    description: "Clogged coin trap filter or defective drain pump motor.",
    typicalCost: "$70 - $140",
    urgency: "Medium",
    causes: ["Debris in impeller", "Broken drive belt", "Lid lock switch open"]
  },
  {
    title: "Computer crashing or slow boot",
    categoryId: 11, // Computer Repair
    description: "Failing mechanical hard drive / full SSD or thermal throttling.",
    typicalCost: "$60 - $130",
    urgency: "Low",
    causes: ["SSD write endurance worn", "Thermal paste dried up", "Malware background processes"]
  }
];

export const TroubleshooterModal: React.FC<TroubleshooterModalProps> = ({
  isOpen,
  onClose,
  categories,
  providers,
  onSelectCategory,
  onBookProvider,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<PredefinedIssue | null>(COMMON_ISSUES[0]);

  if (!isOpen) return null;

  // Search filter
  const matchedIssues = COMMON_ISSUES.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.description.toLowerCase().includes(query.toLowerCase())
  );

  const activeCategory = selectedIssue ? categories.find(c => c.id === selectedIssue.categoryId) : null;
  const matchedPro = selectedIssue ? providers.find(p => p.categoryId === selectedIssue.categoryId) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="troubleshooter-modal"
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 relative">
          <button
            id="close-troubleshooter-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Issue Matcher & Estimator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            What needs fixing today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Describe your problem or pick a common symptom to get an instant diagnosis and pro recommendation.
          </p>

          {/* Quick search inside modal */}
          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search problem (e.g. leaking water, fridge warm, breaker tripped)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs text-slate-900 bg-white rounded-xl pl-9 pr-4 py-2.5 focus:outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Issue Pills */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2">Common Problem Scenarios:</div>
            <div className="flex flex-wrap gap-2">
              {matchedIssues.map((issue) => (
                <button
                  key={issue.title}
                  onClick={() => setSelectedIssue(issue)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                    selectedIssue?.title === issue.title
                      ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {issue.title}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis & Recommended Provider Card */}
          {selectedIssue && activeCategory && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${activeCategory.color} flex items-center justify-center text-2xl shadow-xs`}>
                    <span>{activeCategory.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 uppercase">Recommended Category</div>
                    <div className="text-lg font-extrabold text-slate-900">{activeCategory.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-medium">Estimated Cost Range</div>
                  <div className="text-base font-extrabold text-emerald-600">{selectedIssue.typicalCost}</div>
                </div>
              </div>

              {/* Diagnosis breakdown */}
              <div className="space-y-2 bg-white rounded-xl p-3.5 border border-slate-100 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Probable Causes:</span>
                </div>
                <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                  {selectedIssue.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Matched top provider */}
              {matchedPro && (
                <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedPro.avatar}
                      alt={matchedPro.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{matchedPro.name}</div>
                      <div className="text-[11px] text-slate-500">{matchedPro.distance} • ⭐ {matchedPro.rating.toFixed(1)}</div>
                    </div>
                  </div>

                  <button
                    id="troubleshoot-book-now-btn"
                    onClick={() => {
                      onClose();
                      onBookProvider(matchedPro);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book Now (${matchedPro.hourlyRate}/hr)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            id="troubleshooter-close-btn"
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer"
          >
            Close
          </button>

          {activeCategory && (
            <button
              id="troubleshooter-view-all-category-btn"
              onClick={() => {
                onSelectCategory(activeCategory.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View All {activeCategory.name}s</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
