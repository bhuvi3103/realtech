import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  ArrowRight, 
  Info, 
  ShoppingBag,
  BarChart3,
  Cpu
} from 'lucide-react';
import { ProjectConcept } from '../types';
import { siteConfig } from '../config/siteConfig';
import { ProjectModal } from './ProjectModal';

interface PortfolioProps {
  onDiscussConcept: (conceptName: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onDiscussConcept }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectConcept | null>(null);

  const getCategoryIcon = (mockupType: string) => {
    switch (mockupType) {
      case 'catalogue':
        return <ShoppingBag className="w-4 h-4 text-[#39C6B0]" />;
      case 'dashboard':
        return <BarChart3 className="w-4 h-4 text-[#39C6B0]" />;
      case 'automation':
        return <Cpu className="w-4 h-4 text-[#39C6B0]" />;
      default:
        return <Layers className="w-4 h-4 text-[#39C6B0]" />;
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#0B1728] text-white relative">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#39C6B0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#102A43]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#132238] border border-[#1E334D] text-xs font-semibold text-[#39C6B0] uppercase tracking-wider mb-3">
            Proof of Capability
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Practical Solutions. Real Business Needs.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore interactive prototypes built to solve tangible operational challenges: wholesale stock ordering, job ticket tracking, and multi-app automation.
          </p>

          {/* Honesty Badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#102A43] border border-[#1E334D] text-xs text-slate-300 shadow-sm">
            <Info className="w-4 h-4 text-[#39C6B0] shrink-0" />
            <span>
              All featured examples below are verified <strong>Concept Demonstrations</strong> built to showcase our technical architecture.
            </span>
          </div>
        </div>

        {/* 3 Project Concept Cards with Interface Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {siteConfig.projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#132238] rounded-2xl border border-[#1E334D] hover:border-[#39C6B0]/60 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Visual Interface Preview Banner */}
                <div className="relative bg-[#0B1728] p-5 border-b border-[#1E334D] min-h-[190px] flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle top bar dots */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    {/* Concept Demo Pill */}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#39C6B0]/15 text-[#39C6B0] border border-[#39C6B0]/30">
                      Concept Demo
                    </span>
                  </div>

                  {/* Micro Visual Layout based on mockup type */}
                  <div className="my-3 p-3 rounded-xl bg-[#102A43] border border-[#1E334D]/80 space-y-2">
                    {project.mockupType === 'catalogue' && (
                      <>
                        <div className="flex justify-between items-center text-[11px] text-slate-300">
                          <span className="font-semibold text-white">B2B Product Listing</span>
                          <span className="text-[#39C6B0] font-mono">240+ Items</span>
                        </div>
                        <div className="flex gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-[#132238] text-slate-300">Pipes & Valves</span>
                          <span className="px-2 py-0.5 rounded bg-[#39C6B0]/20 text-[#39C6B0]">WhatsApp RFQ</span>
                        </div>
                      </>
                    )}

                    {project.mockupType === 'dashboard' && (
                      <>
                        <div className="flex justify-between items-center text-[11px] text-slate-300">
                          <span className="font-semibold text-white">Job Stage Kanban</span>
                          <span className="text-emerald-400 font-mono">14 In Progress</span>
                        </div>
                        <div className="flex gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Technician Dispatch</span>
                          <span className="px-2 py-0.5 rounded bg-[#132238] text-slate-300">Invoice Ready</span>
                        </div>
                      </>
                    )}

                    {project.mockupType === 'automation' && (
                      <>
                        <div className="flex justify-between items-center text-[11px] text-slate-300">
                          <span className="font-semibold text-white">Auto Sync Engine</span>
                          <span className="text-[#39C6B0] font-mono">2.5h Saved/Day</span>
                        </div>
                        <div className="flex gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-[#132238] text-slate-300">PO Parser</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Instant PDF Challan</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Preview Button Overlay on Hover */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      {getCategoryIcon(project.mockupType)}
                      <span className="text-slate-300 text-[11px]">{project.category}</span>
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#39C6B0] hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Demo</span>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#39C6B0] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Core Features:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.keyHighlights.map((hl, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-xs bg-[#0B1728] border border-[#1E334D] text-slate-200"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 pt-0 border-t border-[#1E334D]/50 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#102A43] hover:bg-[#1E334D] text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#39C6B0]" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onDiscussConcept(project.title)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] text-xs font-bold transition-all shadow-sm"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal when user opens a concept */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onDiscussSimilar={(title) => {
              setSelectedProject(null);
              onDiscussConcept(title);
            }}
          />
        )}

      </div>
    </section>
  );
};
