import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface FAQProps {
  onAskOtherQuestionClick: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onAskOtherQuestionClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white text-[#102A43] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#102A43] text-xs font-semibold uppercase tracking-wider mb-3">
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#102A43]">
            Frequently Asked Questions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#60758B] leading-relaxed">
            Straightforward answers about our capabilities, pricing estimates, delivery timelines, and how we work with you.
          </p>
        </div>

        {/* 12 Accordion Questions */}
        <div className="space-y-3.5">
          {siteConfig.faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#39C6B0] bg-[#F5F8FC] shadow-sm'
                    : 'border-[#D9E3EE] bg-white hover:border-[#102A43]/30'
                }`}
              >
                <button
                  type="button"
                  id={headingId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39C6B0] focus-visible:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-base sm:text-lg font-bold text-[#102A43] flex items-center gap-3">
                    <span className="text-xs font-mono text-[#60758B] w-6">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#102A43] text-[#39C6B0] rotate-180'
                        : 'bg-slate-100 text-[#60758B]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#60758B] leading-relaxed border-t border-[#D9E3EE]/60"
                  >
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0B1728] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#132238] flex items-center justify-center text-[#39C6B0] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Have a question not listed here?</div>
              <div className="text-xs text-slate-400">Ask us directly and we’ll give you a clear, honest response.</div>
            </div>
          </div>
          <button
            onClick={onAskOtherQuestionClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Your Question</span>
          </button>
        </div>

      </div>
    </section>
  );
};
