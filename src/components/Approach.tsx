import React from 'react';
import { 
  Smile, 
  Target, 
  Smartphone, 
  ClipboardCheck, 
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ApproachProps {
  onDiscussProblemClick: () => void;
}

export const Approach: React.FC<ApproachProps> = ({ onDiscussProblemClick }) => {
  const benefits = [
    {
      icon: <Smile className="w-6 h-6 text-[#39C6B0]" />,
      title: 'Simple to Use',
      description: 'Clear interfaces that customers and employees can understand without hours of training or confusion.',
    },
    {
      icon: <Target className="w-6 h-6 text-[#39C6B0]" />,
      title: 'Built Around Your Needs',
      description: "Features and workflows planned directly around the customer's requirements, never forced into rigid templates.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#39C6B0]" />,
      title: 'Mobile-Friendly',
      description: 'Flawless responsive experiences across smartphones, tablets, and laptops for field staff and on-the-go buyers.',
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-[#39C6B0]" />,
      title: 'Clear Expectations',
      description: 'Agreed scope, pricing, deliverables, and timelines before development begins. No surprise hidden charges.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#102A43] text-white relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#39C6B0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0B1728]/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#132238] border border-[#1E334D] text-xs font-semibold text-[#39C6B0] uppercase tracking-wider mb-3">
            Our Honest Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Less Complexity. More Useful Technology.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            RealTech focuses on solving actual customer problems rather than selling unnecessary technology, buzzwords, or expensive subscriptions you don’t need.
          </p>
        </div>

        {/* Contrast Comparison Grid: The Generic Agency Trap vs The RealTech Approach */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* What others do */}
          <div className="bg-[#0B1728]/80 border border-rose-500/20 rounded-2xl p-6 sm:p-7 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>The Typical Agency Approach</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Pushing complex frameworks and high recurring software retainers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Opaque pricing that explodes midway through development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Cluttered dashboards that actual employees refuse to adopt</span>
              </li>
            </ul>
          </div>

          {/* The RealTech Way */}
          <div className="bg-[#132238] border border-[#39C6B0]/40 rounded-2xl p-6 sm:p-7 space-y-3 shadow-lg">
            <div className="flex items-center space-x-2 text-[#39C6B0] font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>The RealTech Practical Way</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-[#39C6B0] font-bold">•</span>
                <span>Lightweight, reliable solutions tailored to your genuine business workflow</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39C6B0] font-bold">•</span>
                <span>Clear upfront deliverables and transparent scope before writing code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39C6B0] font-bold">•</span>
                <span>Intuitive user interfaces that save your team hours every day</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-[#0B1728]/90 border border-[#1E334D] hover:border-[#39C6B0]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#132238] border border-[#1E334D] flex items-center justify-center mb-5">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* Approach Section CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onDiscussProblemClick}
            className="inline-flex items-center space-x-2.5 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] font-bold text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-glow-teal transition-all active:scale-[0.98]"
          >
            <span>Let's Discuss Your Problem</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
