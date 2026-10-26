import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ConversionCTAProps {
  onStartConversationClick: () => void;
  onViewServicesClick: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  onStartConversationClick,
  onViewServicesClick,
}) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0B1728] via-[#102A43] to-[#0B1728] text-white relative overflow-hidden">
      {/* Decorative teal radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#39C6B0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132238] border border-[#39C6B0]/40 text-xs font-semibold text-[#39C6B0] mb-6 shadow-sm">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>No High-Pressure Sales • Friendly Technical Guidance</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Have a Business Problem Technology Could Solve?
        </h2>

        {/* Supporting text */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Tell us what takes too much time, complicates your workflow, or makes things harder for your customers. Let's explore a practical solution.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartConversationClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-glow-teal transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onViewServicesClick}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#132238] hover:bg-[#1E334D] text-white border border-[#1E334D] font-medium text-base px-7 py-4 rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <span>View Our Services</span>
          </button>
        </div>

        {/* Micro reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#39C6B0]" />
            Fast response within 24 hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#39C6B0]" />
            Itemised quotes before you commit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#39C6B0]" />
            Serving clients from Puducherry & across India
          </span>
        </div>

      </div>
    </section>
  );
};
