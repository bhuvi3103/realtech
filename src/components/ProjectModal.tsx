import React, { useState } from 'react';
import { 
  X, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Send, 
  Filter, 
  Smartphone, 
  Monitor, 
  AlertCircle 
} from 'lucide-react';
import { ProjectConcept } from '../types';

interface ProjectModalProps {
  project: ProjectConcept | null;
  onClose: () => void;
  onDiscussSimilar: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose, 
  onDiscussSimilar 
}) => {
  const [catalogueFilter, setCatalogueFilter] = useState('All');
  const [simulatedAutomationStep, setSimulatedAutomationStep] = useState<number>(3);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1728]/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className="relative w-full max-w-4xl bg-[#102A43] border border-[#1E334D] rounded-2xl shadow-2xl text-white overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#0B1728] border-b border-[#1E334D] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#39C6B0]/15 text-[#39C6B0] border border-[#39C6B0]/30">
              Concept Demo
            </span>
            <h3 id="modal-headline" className="text-lg font-bold text-white truncate max-w-md">
              {project.title}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E334D] transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Honesty Notice */}
          <div className="p-3.5 rounded-xl bg-[#0B1728]/60 border border-[#39C6B0]/30 flex items-start space-x-3 text-xs text-slate-300">
            <AlertCircle className="w-4 h-4 text-[#39C6B0] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Honest Disclosure:</span> This interactive prototype is an architectural concept built by RealTech to demonstrate how we address real operational challenges for wholesale, retail, and service businesses.
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="rounded-xl border border-[#1E334D] bg-[#0B1728] overflow-hidden">
            {/* Viewport bar */}
            <div className="px-4 py-2.5 bg-[#132238] border-b border-[#1E334D] flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-mono text-slate-300 ml-1">https://demo.realtech.local/{project.id}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1 rounded ${deviceMode === 'desktop' ? 'bg-[#1E334D] text-[#39C6B0]' : 'hover:text-slate-200'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1 rounded ${deviceMode === 'mobile' ? 'bg-[#1E334D] text-[#39C6B0]' : 'hover:text-slate-200'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Simulated UI Screen based on mockupType */}
            <div className={`p-4 sm:p-6 transition-all mx-auto ${deviceMode === 'mobile' ? 'max-w-sm border-x border-[#1E334D]' : 'w-full'}`}>
              
              {/* Concept 1: Catalogue UI */}
              {project.mockupType === 'catalogue' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E334D] pb-3">
                    <div>
                      <div className="text-xs uppercase text-[#39C6B0] font-bold">Sri Murugan Hardwares (B2B Catalogue)</div>
                      <div className="text-sm font-semibold text-white">Wholesale Pipes & Industrial Valves</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                        <input
                          type="text"
                          readOnly
                          value="Search 240+ SKUs..."
                          className="bg-[#102A43] border border-[#1E334D] rounded-lg pl-8 pr-2 py-1 text-xs text-slate-300 w-44"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filter pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                    <Filter className="w-3 h-3 text-[#39C6B0] shrink-0" />
                    {['All', 'Valves', 'PVC Pipes', 'Flanges', 'Brass Fittings'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setCatalogueFilter(f)}
                        className={`px-2.5 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
                          catalogueFilter === f
                            ? 'bg-[#39C6B0] text-[#0B1728] font-bold'
                            : 'bg-[#102A43] text-slate-300 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Product Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#102A43] rounded-xl border border-[#1E334D] space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">Heavy Duty Gate Valve 2"</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">MOQ: 10 pcs</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Forged brass body, rated PN16, ISI certified.</p>
                      <div className="pt-2 border-t border-[#1E334D] flex items-center justify-between">
                        <span className="font-bold text-white text-sm">₹1,240 <span className="text-[10px] text-slate-400">/pc</span></span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#39C6B0] bg-[#39C6B0]/10 px-2 py-1 rounded-md">
                          <MessageSquare className="w-3 h-3" /> WhatsApp RFQ
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#102A43] rounded-xl border border-[#1E334D] space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">UPVC Schedule 40 Pipe (6m)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">MOQ: 20 pcs</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Class 1 pressure rated for commercial plumbing.</p>
                      <div className="pt-2 border-t border-[#1E334D] flex items-center justify-between">
                        <span className="font-bold text-white text-sm">₹680 <span className="text-[10px] text-slate-400">/unit</span></span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#39C6B0] bg-[#39C6B0]/10 px-2 py-1 rounded-md">
                          <MessageSquare className="w-3 h-3" /> WhatsApp RFQ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Concept 2: Dashboard UI */}
              {project.mockupType === 'dashboard' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1E334D] pb-3 text-xs">
                    <div>
                      <span className="text-[#39C6B0] font-bold uppercase text-[10px] block">RealTech ServiceOps</span>
                      <span className="text-white font-semibold text-sm">Active Job Tickets & Dispatch</span>
                    </div>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-[11px]">
                      3 Jobs Due Today
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#102A43] p-2.5 rounded-lg border border-[#1E334D]">
                      <span className="text-[10px] text-slate-400 block">Open Tickets</span>
                      <span className="text-base font-bold text-white">14</span>
                    </div>
                    <div className="bg-[#102A43] p-2.5 rounded-lg border border-[#1E334D]">
                      <span className="text-[10px] text-slate-400 block">Avg Resolution</span>
                      <span className="text-base font-bold text-[#39C6B0]">4.2 Hrs</span>
                    </div>
                    <div className="bg-[#102A43] p-2.5 rounded-lg border border-[#1E334D]">
                      <span className="text-[10px] text-slate-400 block">Unbilled Work</span>
                      <span className="text-base font-bold text-amber-300">₹31,000</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-[#102A43] rounded-lg border border-[#1E334D] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">RO Water Plant Maintenance #902</div>
                        <div className="text-[11px] text-slate-400">Assigned: Manikandan • Puducherry White Town</div>
                      </div>
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-[10px] font-mono">
                        Technician En Route
                      </span>
                    </div>

                    <div className="p-3 bg-[#102A43] rounded-lg border border-[#1E334D] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Cold Storage Motor Rewinding #889</div>
                        <div className="text-[11px] text-slate-400">Completed & Signed • Invoice Dispatched</div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono">
                        Ready for Billing
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Concept 3: Automation UI */}
              {project.mockupType === 'automation' && (
                <div className="space-y-4 text-xs">
                  <div className="border-b border-[#1E334D] pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[#39C6B0] font-bold uppercase text-[10px] block">RealTech FlowEngine</span>
                      <span className="text-white font-semibold text-sm">Automated Sales & Dispatch Pipeline</span>
                    </div>
                    <button
                      onClick={() => setSimulatedAutomationStep((prev) => (prev % 3) + 1)}
                      className="px-2.5 py-1 bg-[#39C6B0] text-[#0B1728] font-bold rounded text-[11px] hover:bg-[#2bb39e]"
                    >
                      Simulate Event Trigger
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className={`p-3 rounded-xl border transition-all ${simulatedAutomationStep >= 1 ? 'bg-[#102A43] border-[#39C6B0]/60' : 'bg-[#0B1728] border-[#1E334D]'}`}>
                      <div className="flex items-center justify-between font-medium">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#39C6B0]" />
                          <span>1. Trigger: Inbound PO Email Received</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">Processed in 0.12s</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Extracted customer GSTIN, delivery address, 4 item line codes, and delivery deadline.
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border transition-all ${simulatedAutomationStep >= 2 ? 'bg-[#102A43] border-[#39C6B0]/60' : 'bg-[#0B1728] border-[#1E334D]'}`}>
                      <div className="flex items-center justify-between font-medium">
                        <span className="flex items-center gap-2">
                          <FileSpreadsheet className="w-4 h-4 text-[#39C6B0]" />
                          <span>2. Data Sync: Ledger & Inventory Updated</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">Spreadsheet Synced</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Row appended to Master Google Sheet; stock reserve held; invoice draft generated.
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border transition-all ${simulatedAutomationStep >= 3 ? 'bg-[#102A43] border-[#39C6B0]/60' : 'bg-[#0B1728] border-[#1E334D]'}`}>
                      <div className="flex items-center justify-between font-medium">
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4 text-[#39C6B0]" />
                          <span>3. Notification: Dispatch WhatsApp Sent</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#39C6B0]">Delivered to Buyer</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        "Your order #RT-812 is confirmed and queued for packing. Delivery challan PDF attached."
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#0B1728] p-4 rounded-xl border border-[#1E334D] space-y-2">
              <span className="text-xs uppercase font-bold text-rose-400 block">The Business Problem Addressed:</span>
              <p className="text-slate-300 leading-relaxed">{project.problemStatement}</p>
            </div>

            <div className="bg-[#0B1728] p-4 rounded-xl border border-[#1E334D] space-y-2">
              <span className="text-xs uppercase font-bold text-[#39C6B0] block">How RealTech Solves It:</span>
              <ul className="space-y-1.5 text-slate-200">
                {project.solutionDelivered.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39C6B0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0B1728] border-t border-[#1E334D] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Want a tailored version of this solution for your company?
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg border border-[#1E334D] text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                onClose();
                onDiscussSimilar(project.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-lg bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] text-xs font-bold transition-all shadow-md"
            >
              Discuss This Concept
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
