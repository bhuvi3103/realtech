import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Workflow, 
  ArrowRight, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';
import { ServiceId } from '../types';
import { siteConfig } from '../config/siteConfig';

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void;
}

const serviceIcons: Record<ServiceId, React.ReactNode> = {
  'website-development': <Globe className="w-6 h-6 text-[#39C6B0]" />,
  'mobile-app': <Smartphone className="w-6 h-6 text-[#39C6B0]" />,
  'custom-software': <Cpu className="w-6 h-6 text-[#39C6B0]" />,
  'workflow-automation': <Workflow className="w-6 h-6 text-[#39C6B0]" />,
  'business-catalogue': <Globe className="w-6 h-6 text-[#39C6B0]" />,
  'not-sure': <Sparkles className="w-6 h-6 text-[#39C6B0]" />,
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5F8FC] text-[#102A43] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-[#102A43] text-xs font-semibold uppercase tracking-wider mb-3">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#102A43]">
            Technology That Solves Real Problems.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#60758B] leading-relaxed">
            Every business works differently. We understand your requirements first and then build a solution around your goals, customers, and budget.
          </p>
        </div>

        {/* 4 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          {siteConfig.services.map((service) => {
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-7 lg:p-8 border border-[#D9E3EE] hover:border-[#39C6B0]/60 shadow-premium hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1728] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                      {serviceIcons[service.id]}
                    </div>
                    <span className="text-xs font-semibold text-[#60758B] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#D9E3EE]">
                      Tailored Delivery
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-[#102A43] group-hover:text-[#0B1728] transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#60758B] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 pt-6 border-t border-[#D9E3EE]/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-3">
                      What we build:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#102A43]">
                          <CheckCircle className="w-4 h-4 text-[#39C6B0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA: Pre-selects service in contact form */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#102A43] hover:bg-[#0B1728] text-white font-semibold text-sm py-3 px-5 rounded-xl transition-all duration-200 group-hover:bg-[#0B1728] group-hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#39C6B0] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contextual Reassurance */}
        <div className="mt-12 bg-white rounded-xl p-5 border border-[#D9E3EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39C6B0]" />
            <span className="text-sm font-medium text-[#102A43]">
              Need a mix of services or not sure where to start?
            </span>
          </div>
          <button
            onClick={() => onSelectService('not-sure')}
            className="text-sm font-bold text-[#102A43] hover:text-[#39C6B0] underline underline-offset-4 decoration-[#39C6B0] transition-colors"
          >
            Request a Free Project Consultation &rarr;
          </button>
        </div>

      </div>
    </section>
  );
};
