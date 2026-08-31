import React, { useState } from 'react';
import { PaymentRecord, ServiceRequest, Language, UserRole } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Download, 
  ShieldCheck, 
  IndianRupee,
  RefreshCw
} from 'lucide-react';

interface CustomerPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: ServiceRequest[];
  language: Language;
  userRole: UserRole;
  onSimulatePay?: (requestId: string, method: 'upi' | 'qr' | 'gateway' | 'cash') => void;
}

export const CustomerPaymentsModal: React.FC<CustomerPaymentsModalProps> = ({
  isOpen,
  onClose,
  requests,
  language,
  userRole,
  onSimulatePay,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'qr_pay'>('history');
  const [selectedReqForPay, setSelectedReqForPay] = useState<ServiceRequest | null>(null);
  const [payMethod, setPayMethod] = useState<'upi' | 'qr' | 'cash'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  if (!isOpen) return null;
  const t = translations[language];

  // Requests that have payments or need payments
  const completedOrActive = requests.filter(r => r.status === 'completed' || r.status === 'service_started');
  const totalSpent = requests
    .filter(r => r.status === 'completed')
    .reduce((acc, curr) => acc + (curr.estimatedPrice || 0), 0);

  const handlePayNow = (req: ServiceRequest) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaySuccess(true);
      if (onSimulatePay) {
        onSimulatePay(req.id, payMethod);
      }
      setTimeout(() => {
        setPaySuccess(false);
        setSelectedReqForPay(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div 
      id="payments-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {userRole === 'provider' ? t.earningsPayments : t.payments}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'सुरक्षित व पारदर्शी पेमेंट रिकॉर्ड' : 'Secure and transparent payment records'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
              {userRole === 'provider' ? 'Total Earnings (कुल कमाई)' : 'Total Services Billed (कुल खर्च)'}
            </span>
            <div className="text-2xl font-black mt-0.5 flex items-center">
              <span>₹{totalSpent > 0 ? totalSpent : 249}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Mohalla Escrow Guarantee</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            💳
          </div>
        </div>

        {/* Payment QR / Direct Modal when selected */}
        {selectedReqForPay && (
          <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Pay for #{selectedReqForPay.id} ({selectedReqForPay.categoryNameHi})
              </span>
              <button 
                onClick={() => setSelectedReqForPay(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Technician:</span>
              <span className="font-bold text-slate-900">{selectedReqForPay.assignedProvider?.name || 'Assigned Pro'}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Amount Due:</span>
              <span className="text-base text-emerald-700 font-black">₹{selectedReqForPay.estimatedPrice}</span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-1">
              <button
                onClick={() => setPayMethod('upi')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  payMethod === 'upi' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                📱 UPI
              </button>
              <button
                onClick={() => setPayMethod('qr')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  payMethod === 'qr' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 mx-auto mb-0.5" />
                QR Code
              </button>
              <button
                onClick={() => setPayMethod('cash')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  payMethod === 'cash' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                💵 Cash
              </button>
            </div>

            {payMethod === 'qr' && (
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="w-28 h-28 mx-auto bg-slate-100 rounded-xl p-2 flex items-center justify-center border">
                  <div className="grid grid-cols-5 gap-1 w-full h-full opacity-80">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">
                  Scan with GPay, PhonePe, or Paytm to pay ₹{selectedReqForPay.estimatedPrice}
                </p>
              </div>
            )}

            <button
              onClick={() => handlePayNow(selectedReqForPay)}
              disabled={isProcessing || paySuccess}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : paySuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Payment Confirmed! ✓</span>
                </>
              ) : (
                <span>Confirm & Mark as Paid (₹{selectedReqForPay.estimatedPrice})</span>
              )}
            </button>
          </div>
        )}

        {/* Transactions / Requests List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">
            {language === 'hi' ? 'हाल की रसीदें व इनवॉइस' : 'Recent Invoices & Transactions'}
          </span>

          {requests.map((req) => {
            const isPaid = req.status === 'completed' || req.payment?.status === 'paid';
            return (
              <div
                key={req.id}
                className="p-3 bg-slate-50 hover:bg-amber-50/40 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {isPaid ? '✓' : '⏱️'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {language === 'hi' ? req.categoryNameHi : req.categoryName} (#{req.id})
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {req.createdAt} • {req.assignedProvider?.name || 'Local Pro'}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-slate-900">₹{req.estimatedPrice}</div>
                  {isPaid ? (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedReqForPay(req)}
                      className="px-2 py-0.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Note */}
        <div className="p-2.5 bg-slate-100 rounded-xl text-[10px] text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Never share bank OTP or PIN with anyone. All transactions are logged securely.</span>
        </div>
      </div>
    </div>
  );
};
