import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Database, 
  Zap, 
  Search, 
  ShoppingCart, 
  MessageSquare, 
  Activity, 
  ExternalLink 
} from 'lucide-react';

interface HeroProps {
  onTellUsClick: () => void;
  onExploreServicesClick: () => void;
  onOpenMockupDemo: (type: 'catalogue' | 'dashboard' | 'automation') => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onTellUsClick, 
  onExploreServicesClick,
  onOpenMockupDemo
}) => {
  const [activeTab, setActiveTab] = useState<'catalogue' | 'dashboard' | 'automation'>('catalogue');

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-[#0B1728] via-[#0D1E33] to-[#102A43] text-white overflow-hidden"
    >
      {/* Background Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#39C6B0 1px, transparent 1px), radial-gradient(#1E334D 1px, #0B1728 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
      
      {/* Subtle Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#39C6B0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#102A43]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Location & Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#132238] border border-[#1E334D] text-xs font-medium text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#39C6B0] animate-ping" />
              <span className="text-[#39C6B0] font-semibold">RealTech</span>
              <span className="text-[#60758B]">•</span>
              <span>Puducherry, India</span>
              <span className="hidden sm:inline text-[#60758B]">•</span>
              <span className="hidden sm:inline text-slate-300">Practical Digital Solutions</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Real Problems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39C6B0] via-[#5ce1cd] to-white">
                Smarter Technology.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              We build websites, apps, custom software, and automations that help businesses serve customers better, simplify daily work, and grow with confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onTellUsClick}
                className="inline-flex items-center justify-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] text-[#0B1728] font-bold text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-glow-teal transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
              >
                <span>Tell Us What You Need</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreServicesClick}
                className="inline-flex items-center justify-center space-x-2 bg-[#132238] hover:bg-[#1E334D] text-white border border-[#1E334D] hover:border-slate-500 font-medium text-base px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* 3 Concise Value Points */}
            <div className="pt-4 border-t border-[#1E334D]/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#39C6B0] shrink-0" />
                <span className="text-sm font-medium text-slate-200">Built around your workflow</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#39C6B0] shrink-0" />
                <span className="text-sm font-medium text-slate-200">Clear scope and pricing</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#39C6B0] shrink-0" />
                <span className="text-sm font-medium text-slate-200">Designed for real users</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Technology Product Visual Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              
              {/* Product Frame Container */}
              <div className="bg-[#132238] rounded-2xl border border-[#1E334D] shadow-2xl overflow-hidden backdrop-blur-sm">
                
                {/* Window Top Bar */}
                <div className="bg-[#0B1728] px-4 py-3 border-b border-[#1E334D] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400">realtech-core.system</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#39C6B0]/10 text-[#39C6B0] border border-[#39C6B0]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39C6B0]" />
                      Live Mockup
                    </span>
                  </div>
                </div>

                {/* Interactive Demo Tabs */}
                <div className="bg-[#102A43] px-3 pt-2.5 border-b border-[#1E334D] flex items-center space-x-1 overflow-x-auto text-xs">
                  <button
                    onClick={() => setActiveTab('catalogue')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'catalogue'
                        ? 'bg-[#132238] text-[#39C6B0] border-t-2 border-[#39C6B0]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Product Catalogue</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'dashboard'
                        ? 'bg-[#132238] text-[#39C6B0] border-t-2 border-[#39C6B0]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Operations Board</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('automation')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === 'automation'
                        ? 'bg-[#132238] text-[#39C6B0] border-t-2 border-[#39C6B0]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Auto-Sync Flow</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between">
                  {activeTab === 'catalogue' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Search & Filter Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            readOnly
                            value="Industrial Valves & PVC Fittings"
                            className="w-full bg-[#0B1728] border border-[#1E334D] rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200"
                          />
                        </div>
                        <span className="px-2.5 py-1.5 bg-[#0B1728] border border-[#1E334D] rounded-lg text-xs text-[#39C6B0] font-semibold whitespace-nowrap">
                          184 SKUs
                        </span>
                      </div>

                      {/* Mockup Product Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-[#0B1728] border border-[#1E334D] rounded-xl p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">In Stock</span>
                            <span className="text-[10px] text-slate-400">SKU-402</span>
                          </div>
                          <div className="h-10 rounded-lg bg-[#102A43] flex items-center justify-center text-xs font-medium text-slate-300">
                            Brass Ball Valve 1"
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <span className="text-xs font-bold text-white">₹380</span>
                              <span className="text-[10px] text-slate-400"> /unit</span>
                            </div>
                            <span className="text-[10px] text-[#39C6B0] font-semibold flex items-center gap-0.5">
                              <MessageSquare className="w-2.5 h-2.5" /> RFQ
                            </span>
                          </div>
                        </div>

                        <div className="bg-[#0B1728] border border-[#1E334D] rounded-xl p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono">Bulk MOQ: 50</span>
                            <span className="text-[10px] text-slate-400">SKU-780</span>
                          </div>
                          <div className="h-10 rounded-lg bg-[#102A43] flex items-center justify-center text-xs font-medium text-slate-300">
                            SS 304 Flange Class 150
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <span className="text-xs font-bold text-white">₹920</span>
                              <span className="text-[10px] text-slate-400"> /pc</span>
                            </div>
                            <span className="text-[10px] text-[#39C6B0] font-semibold flex items-center gap-0.5">
                              <MessageSquare className="w-2.5 h-2.5" /> RFQ
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Micro Banner */}
                      <div className="p-2.5 rounded-lg bg-[#39C6B0]/10 border border-[#39C6B0]/20 flex items-center justify-between text-xs">
                        <span className="text-slate-200 text-[11px]">
                          Direct WhatsApp enquiry integration with SKU payload
                        </span>
                        <span className="text-[#39C6B0] text-[10px] font-bold uppercase">Zero-Friction</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'dashboard' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Dashboard Metrics */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#0B1728] p-2.5 rounded-xl border border-[#1E334D]">
                          <span className="text-[10px] text-slate-400 block">Active Jobs</span>
                          <span className="text-base font-bold text-white">28</span>
                        </div>
                        <div className="bg-[#0B1728] p-2.5 rounded-xl border border-[#1E334D]">
                          <span className="text-[10px] text-slate-400 block">Delivered</span>
                          <span className="text-base font-bold text-[#39C6B0]">94%</span>
                        </div>
                        <div className="bg-[#0B1728] p-2.5 rounded-xl border border-[#1E334D]">
                          <span className="text-[10px] text-slate-400 block">Pending Inv</span>
                          <span className="text-base font-bold text-amber-300">₹42,500</span>
                        </div>
                      </div>

                      {/* Mock Job Rows */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B1728] border border-[#1E334D] text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-slate-200 font-medium">Batch #B-204 Fab</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 font-mono">
                            Ready for Dispatch
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B1728] border border-[#1E334D] text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-200 font-medium">Site Install Unit 3</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 font-mono">
                            In Progress (Tech: Rajesh)
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#102A43] border border-[#1E334D] flex items-center justify-between text-xs text-slate-300">
                        <span className="text-[11px]">Daily status synchronized across field & office</span>
                        <Activity className="w-4 h-4 text-[#39C6B0]" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'automation' && (
                    <div className="space-y-3.5 animate-fade-in">
                      {/* Automation Workflow Visual Pipeline */}
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-[#0B1728] border border-[#1E334D] rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1E334D] rounded text-slate-300">Trigger</span>
                            <span className="text-slate-200">New Purchase Order Email / Webhook</span>
                          </div>
                          <span className="text-emerald-400 text-[10px] font-mono">0.4s</span>
                        </div>

                        <div className="flex justify-center text-slate-500">
                          <span className="text-[11px] font-mono">↓ Automated Parser & Validator</span>
                        </div>

                        <div className="p-2.5 bg-[#0B1728] border border-[#1E334D] rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1E334D] rounded text-slate-300">Action 1</span>
                            <span className="text-slate-200">Append to Sales Ledger & Stock Database</span>
                          </div>
                          <span className="text-emerald-400 text-[10px] font-mono">Synced</span>
                        </div>

                        <div className="p-2.5 bg-[#0B1728] border border-[#1E334D] rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1E334D] rounded text-slate-300">Action 2</span>
                            <span className="text-slate-200">Generate PDF Challan + WhatsApp Alert</span>
                          </div>
                          <span className="text-[#39C6B0] text-[10px] font-mono">Sent</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 text-center font-medium">
                        Eliminates ~2.5 hours of manual re-typing and clerical errors daily
                      </div>
                    </div>
                  )}

                  {/* Visual Footer with Link to Detailed Project Demos */}
                  <div className="pt-3 border-t border-[#1E334D] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Concept demonstration for local businesses
                    </span>
                    <button
                      onClick={() => onOpenMockupDemo(activeTab)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#39C6B0] hover:text-[#5ce1cd] transition-colors"
                    >
                      <span>Inspect Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Pill on Mockup Edge */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#0B1728] border border-[#1E334D] rounded-xl px-3.5 py-2 shadow-xl flex items-center space-x-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#39C6B0]/10 flex items-center justify-center text-[#39C6B0]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Customised Architecture</div>
                  <div className="text-[10px] text-[#60758B]">No bloated third-party lock-in</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-2 sm:-right-4 bg-[#0B1728] border border-[#1E334D] rounded-xl px-3 py-1.5 shadow-xl flex items-center space-x-2 text-xs">
                <Smartphone className="w-3.5 h-3.5 text-[#39C6B0]" />
                <span className="text-[11px] text-slate-300 font-medium">100% Mobile Ready</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
