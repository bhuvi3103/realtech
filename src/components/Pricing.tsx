import React from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { ServiceId, BudgetRange } from '../types';
import { siteConfig } from '../config/siteConfig';

interface PricingProps {
  onSelectPlan: (plan: { service: ServiceId; budget: BudgetRange; planName: string }) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const getBudgetForPlan = (planId: string): BudgetRange => {
    switch (planId) {
      case 'starter':
        return 'below-3000';
      case 'catalogue':
        return '3000-7000';
      default:
        return 'need-guidance';
    }
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F5F8FC] text-[#102A43] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#102A43] text-xs font-semibold uppercase tracking-wider mb-3">
            Honest & Direct
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#102A43]">
            Transparent Starting Prices.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#60758B] leading-relaxed">
            Start with what your business needs today. We will clarify the scope and provide a quote before work begins.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteConfig.pricingPlans.map((plan) => {
            const isRec = plan.recommended;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'bg-[#102A43] text-white border-2 border-[#39C6B0] shadow-card-hover lg:-translate-y-2'
                    : 'bg-white text-[#102A43] border border-[#D9E3EE] hover:border-[#102A43]/40 shadow-premium'
                } p-7 lg:p-8`}
              >
                {/* Recommended Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#39C6B0] text-[#0B1728] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular For Small Businesses</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold ${isRec ? 'text-white' : 'text-[#102A43]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-1 ${isRec ? 'text-slate-300' : 'text-[#60758B]'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="my-6 pb-6 border-b border-inherit">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isRec ? 'text-white' : 'text-[#102A43]'}`}>
                        {plan.priceDisplay}
                      </span>
                    </div>
                    <span className={`text-xs block mt-1 font-medium ${isRec ? 'text-[#39C6B0]' : 'text-[#60758B]'}`}>
                      {plan.priceNote}
                    </span>
                  </div>

                  {/* Suitable For */}
                  <div className={`p-3.5 rounded-xl text-xs mb-6 ${isRec ? 'bg-[#0B1728] border border-[#1E334D]' : 'bg-[#F5F8FC] border border-[#D9E3EE]'}`}>
                    <span className="font-semibold block mb-0.5">Suitable for:</span>
                    <span className={isRec ? 'text-slate-300' : 'text-[#60758B]'}>{plan.idealFor}</span>
                  </div>

                  {/* Deliverables List */}
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${isRec ? 'text-slate-200' : 'text-[#102A43]'}`}>
                      Potential Deliverables:
                    </div>
                    <ul className="space-y-3">
                      {plan.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isRec ? 'text-[#39C6B0]' : 'text-[#39C6B0]'}`} />
                          <span className={isRec ? 'text-slate-200' : 'text-[#102A43]'}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div className="mt-8 pt-6 border-t border-inherit">
                  <button
                    onClick={() =>
                      onSelectPlan({
                        service: plan.serviceTarget,
                        budget: getBudgetForPlan(plan.id),
                        planName: plan.name,
                      })
                    }
                    className={`w-full inline-flex items-center justify-center space-x-2 font-bold text-sm py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] ${
                      isRec
                        ? 'bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] shadow-md hover:shadow-glow-teal'
                        : 'bg-[#102A43] hover:bg-[#0B1728] text-white'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Pricing Disclaimer Note as Required */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-[#D9E3EE] shadow-sm">
          <div className="flex items-start space-x-3.5">
            <Info className="w-5 h-5 text-[#102A43] shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm text-[#60758B] leading-relaxed">
              <span className="font-bold text-[#102A43] block">Transparent Pricing Policy & Scope Disclaimer:</span>
              <p>
                All prices are introductory starting estimates, not guaranteed final quotes. Final costs depend on scope, features, content, integrations, and delivery requirements. Domain registration, hosting, paid third-party services, licences, and ongoing maintenance are separate unless explicitly included in the agreed proposal.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
