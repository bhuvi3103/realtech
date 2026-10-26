import React from 'react';
import { X, Shield } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1728]/85 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#102A43] border border-[#1E334D] rounded-2xl max-w-2xl w-full text-white p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E334D] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B1728] border border-[#1E334D] flex items-center justify-center text-[#39C6B0]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <span className="text-xs text-[#60758B]">
              RealTech • {siteConfig.location}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1E334D] pt-4">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>RealTech</strong>, we are committed to respecting and protecting the privacy of our website visitors and clients.
              </p>
              <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
              <p>
                When you submit a project enquiry through our website, we collect your name, business name (if provided), contact method (email or phone/WhatsApp), service interest, and details of the project you describe.
              </p>
              <h4 className="text-sm font-bold text-white">2. How We Use Your Information</h4>
              <p>
                We use this information exclusively to review your request, prepare a scope and cost estimate, and communicate with you directly about your requirements.
              </p>
              <h4 className="text-sm font-bold text-white">3. No Third-Party Sales or Spam</h4>
              <p>
                We do not sell, rent, or lease enquiry details to third parties, advertising networks, or data brokers.
              </p>
              <h4 className="text-sm font-bold text-white">4. Contact & Inquiries</h4>
              <p>
                For any questions regarding your data, you can reach out via our contact details in Puducherry, India.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>RealTech</strong>. By browsing our website or engaging our services, you agree to the following terms:
              </p>
              <h4 className="text-sm font-bold text-white">1. Proposals & Estimates</h4>
              <p>
                All figures displayed on the website are introductory starting estimates. Definitive project fees, deliverables, revisions, and schedules are documented in an agreed proposal signed before development commences.
              </p>
              <h4 className="text-sm font-bold text-white">2. Intellectual Property</h4>
              <p>
                Upon final settlement of project dues, ownership of custom-developed code, websites, or software assets is handed over to the client as stipulated in the agreed scope.
              </p>
              <h4 className="text-sm font-bold text-white">3. Third-Party Services</h4>
              <p>
                Clients maintain ownership and responsibility for their domain names, third-party software subscriptions, and cloud hosting accounts.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#1E334D] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#39C6B0] text-[#0B1728] text-xs font-bold hover:bg-[#2bb39e]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
