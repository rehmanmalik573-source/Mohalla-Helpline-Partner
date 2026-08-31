import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send 
} from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [queryText, setQueryText] = useState('');
  const t = translations[language];

  if (!isOpen) return null;

  const faqs = language === 'hi' ? [
    { q: 'सर्विस रिक्वेस्ट कैसे काम करती है?', a: 'बस अपनी श्रेणी चुनें, समस्या का संक्षिप्त विवरण दें, और सबमिट करें। 15 मिनट के अंदर नजदीकी वेरिफाइड कारीगर आपकी रिक्वेस्ट स्वीकार कर लेगा।' },
    { q: 'भुगतान (Payment) कब और कैसे करना है?', a: 'काम पूरा होने और आपकी संतुष्टि के बाद ही आप सीधे कारीगर को UPI या कैश द्वारा भुगतान कर सकते हैं।' },
    { q: 'क्या कोई कैंसिलेशन चार्ज है?', a: 'नहीं, कारीगर के आने से पहले कैंसिलेशन बिल्कुल निःशुल्क है।' },
    { q: 'क्या सभी कारीगर वेरिफाइड हैं?', a: 'हां, हमारे सभी कारीगर आधार, पुलिस वेरिफिकेशन और स्थानीय कौशल परीक्षण के बाद ही जोड़े जाते हैं।' },
  ] : [
    { q: 'How does a Service Request work?', a: 'Simply select your category, enter problem description, and tap submit. Within 15 minutes a verified local pro accepts your request.' },
    { q: 'When and how do I pay?', a: 'Pay directly to the professional via UPI or Cash only after the work is completely finished to your satisfaction.' },
    { q: 'Is there any cancellation fee?', a: 'No, cancellation is 100% free before the technician arrives at your door.' },
    { q: 'Are all technicians verified?', a: 'Yes, all local pros undergo thorough identity, background verification, and skills assessment.' },
  ];

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackRequested(true);
    setTimeout(() => {
      setCallbackRequested(false);
      setQueryText('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="help-support-modal-box"
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0B1A30] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
              💬
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold">{t.helpSupport}</h2>
              <p className="text-xs text-slate-300">
                {language === 'hi' ? '24/7 मोहल्ला हेल्प कस्टमर केयर' : '24/7 Mohalla Help Customer Care'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Helplines */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:18002026000"
              className="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl p-3.5 text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-black text-slate-900">1800-202-6000</span>
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                {language === 'hi' ? 'टोल-फ्री हेल्पलाइन' : 'Toll-Free Call'}
              </span>
            </a>

            <a
              href="https://wa.me/919876543210?text=Hello%20Mohalla%20Help%20Support"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl p-3.5 text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-black text-slate-900">WhatsApp Chat</span>
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                {language === 'hi' ? 'तुरंत सहायता' : 'Instant Reply'}
              </span>
            </a>
          </div>

          {/* Quick Callback Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                {language === 'hi' ? 'कॉल बैक या संदेश भेजें' : 'Request a Callback'}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> 5 Min Response
              </span>
            </div>

            {callbackRequested ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'hi' ? 'धन्यवाद! हमारा सपोर्ट एग्जीक्यूटिव 5 मिनट में कॉल करेगा।' : 'Thank you! Our support executive will call you within 5 minutes.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder={language === 'hi' ? 'अपनी समस्या या प्रश्न लिखें...' : 'Write your query or issue...'}
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'कॉल बैक रिक्वेस्ट भेजें' : 'Send Callback Request'}</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}</span>
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-start gap-1.5">
                    <span className="text-amber-600 font-black">Q.</span>
                    <span>{faq.q}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] pl-4">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
