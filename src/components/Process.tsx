import React from 'react';
import { 
  Compass, 
  FileText, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface ProcessProps {
  onStartPlanningClick: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onStartPlanningClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Understand',
      subtitle: 'Discovery & Context',
      icon: <Compass className="w-6 h-6 text-[#39C6B0]" />,
      description: "We learn about the customer's business, users, challenges, objectives, and budget. No assumptions—just listening to your daily bottlenecks.",
      deliverable: 'Problem audit & requirements summary',
    },
    {
      number: '02',
      title: 'Plan',
      subtitle: 'Scope & Architecture',
      icon: <FileText className="w-6 h-6 text-[#39C6B0]" />,
      description: 'We identify the right solution and agree on features, deliverables, pricing, and timeline before writing a single line of code.',
      deliverable: 'Clear project scope & milestone roadmap',
    },
    {
      number: '03',
      title: 'Build and Review',
      subtitle: 'Development & Checkpoints',
      icon: <Code2 className="w-6 h-6 text-[#39C6B0]" />,
      description: 'We develop the solution, share progress, and collect feedback at agreed milestones so you stay in total control of how it looks and works.',
      deliverable: 'Iterative demos & feedback review checkpoints',
    },
    {
      number: '04',
      title: 'Launch and Support',
      subtitle: 'Deployment & Handover',
      icon: <Rocket className="w-6 h-6 text-[#39C6B0]" />,
      description: 'We deliver the agreed work, explain how to use it, and discuss maintenance or future improvements to ensure smooth business continuity.',
      deliverable: 'Deployment, walkthrough session & maintenance plan',
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F5F8FC] text-[#102A43] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#102A43] text-xs font-semibold uppercase tracking-wider mb-3">
            Predictable & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#102A43]">
            Our Development Process.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#60758B] leading-relaxed">
            From initial problem discovery to final handover, every phase has agreed deliverables, clear pricing, and no technical confusion.
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-7 border border-[#D9E3EE] hover:border-[#39C6B0] shadow-premium hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Header with Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#102A43]/15 group-hover:text-[#39C6B0]/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#0B1728] flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <div className="text-xs font-bold uppercase tracking-wider text-[#39C6B0] mb-1">
                  Step {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#102A43] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Output / Deliverable Pill */}
              <div className="pt-4 border-t border-[#D9E3EE] bg-[#F5F8FC]/50 -mx-7 -mb-7 p-4 px-7 rounded-b-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#102A43]">
                  <CheckCircle2 className="w-4 h-4 text-[#39C6B0] shrink-0" />
                  <span>{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#D9E3EE] shadow-sm">
            <span className="text-sm text-[#60758B]">
              Ready to map out the next step for your business?
            </span>
            <button
              onClick={onStartPlanningClick}
              className="inline-flex items-center space-x-2 bg-[#102A43] hover:bg-[#0B1728] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <span>Schedule Initial Discovery</span>
              <ArrowRight className="w-4 h-4 text-[#39C6B0]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
