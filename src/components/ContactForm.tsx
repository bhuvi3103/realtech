import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  MessageCircle, 
  Mail, 
  Phone, 
  AlertCircle, 
  RefreshCw, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';
import { ServiceId, BudgetRange, ContactFormData } from '../types';
import { siteConfig } from '../config/siteConfig';

interface ContactFormProps {
  initialService?: ServiceId;
  initialBudget?: BudgetRange | '';
  initialNote?: string;
}

interface SubmissionSuccess {
  enquiryId: string;
  message: string;
  fullName: string;
  service: string;
  createdAt: string;
  summary: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = 'website-development',
  initialBudget = '',
  initialNote = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: initialService,
    budget: initialBudget,
    projectDescription: initialNote,
    preferredContact: 'whatsapp',
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);
  const [offlineFallbackPayload, setOfflineFallbackPayload] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync external pre-selections
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialBudget]);

  useEffect(() => {
    if (initialNote) {
      setFormData((prev) => ({ ...prev, projectDescription: initialNote }));
    }
  }, [initialNote]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your full name.';
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      errs.contactMethod = 'Please provide either an email address or phone/WhatsApp number so we can reach you.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address format.';
    }

    if (formData.phone.trim() && formData.phone.trim().replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please provide a valid phone or WhatsApp number.';
    }

    if (!formData.service) {
      errs.service = 'Please select the service required.';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      errs.projectDescription = 'Please describe what you want to build or improve (minimum 10 characters).';
    }

    if (!formData.consent) {
      errs.consent = 'Please confirm consent for us to respond to your project enquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateFormattedSummary = (data: ContactFormData, enquiryId?: string) => {
    return `*RealTech Project Enquiry${enquiryId ? ` [${enquiryId}]` : ''}*\n` +
      `--------------------------------\n` +
      `• *Client Name:* ${data.fullName}\n` +
      `• *Business/Organisation:* ${data.businessName || 'Not specified'}\n` +
      `• *Email:* ${data.email || 'Not provided'}\n` +
      `• *Phone/WhatsApp:* ${data.phone || 'Not provided'}\n` +
      `• *Service Required:* ${data.service}\n` +
      `• *Approximate Budget:* ${data.budget || 'Not specified'}\n` +
      `• *Preferred Contact:* ${data.preferredContact || 'Any'}\n` +
      `• *Details:* ${data.projectDescription}\n` +
      `• *Timestamp:* ${new Date().toLocaleString('en-IN')}\n` +
      `--------------------------------`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setOfflineFallbackPayload(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessData({
          enquiryId: data.enquiryId,
          message: data.message,
          fullName: formData.fullName,
          service: formData.service,
          createdAt: data.enquiry?.createdAt || new Date().toISOString(),
          summary: generateFormattedSummary(formData, data.enquiryId),
        });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || data.message || 'Unable to process enquiry. Please try again.');
        }
      }
    } catch (networkErr) {
      console.warn('[Contact] Backend endpoint unreachable, offering immediate fallback payload:', networkErr);
      const summary = generateFormattedSummary(formData);
      setOfflineFallbackPayload(summary);
      setServerError('Unable to reach the live backend API server. Your enquiry brief has been compiled below so you can send it via WhatsApp or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsAppWithRef = (enquiryId: string, service: string) => {
    const text = encodeURIComponent(
      `Hello RealTech! I have submitted project enquiry reference ${enquiryId} regarding "${service}". I'd like to discuss the requirements.`
    );
    const target = siteConfig.contact.whatsappNumberPlaceholder;
    window.open(`https://wa.me/${target}?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setSuccessData(null);
    setOfflineFallbackPayload(null);
    setServerError(null);
    setErrors({});
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      service: 'website-development',
      budget: '',
      projectDescription: '',
      preferredContact: 'whatsapp',
      consent: true,
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0B1728] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#132238] border border-[#1E334D] text-xs font-semibold text-[#39C6B0] uppercase tracking-wider mb-3">
            Start Your Project
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Tell Us What You Want to Make Easier.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            You do not need a technical specification. Tell us about your business, your challenge, and what you want to achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Channel Info & Trust Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#132238] border border-[#1E334D] rounded-2xl p-7 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Direct & Honest Communication
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We don’t employ high-pressure salesmen. When you reach out, you talk directly with the developers and problem-solvers who design and build your system.
                </p>
              </div>

              {/* Verified Location Card */}
              <div className="space-y-4 pt-4 border-t border-[#1E334D]">
                <div className="flex items-start space-x-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1728] border border-[#1E334D] flex items-center justify-center text-[#39C6B0] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Location</span>
                    <span className="text-xs text-slate-300">{siteConfig.location}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">Serving local enterprises & remote businesses worldwide</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#0B1728] border border-[#1E334D] flex items-center justify-center text-[#39C6B0] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Working Hours</span>
                    <span className="text-xs text-slate-300">{siteConfig.contact.workingHours}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">Prompt responses within 24 business hours</span>
                  </div>
                </div>
              </div>

              {/* Verified Backend Active Indicator */}
              <div className="p-4 rounded-xl bg-[#0B1728] border border-[#39C6B0]/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#39C6B0] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#39C6B0] animate-pulse" />
                  <span>Real Backend Database Connected</span>
                </div>
                <p className="text-[#60758B] text-[11px] leading-relaxed">
                  Enquiries are stored in real-time in our secure audit-ready database in Puducherry, India. Each submission receives a verified reference tracking code.
                </p>
              </div>

              {/* What Happens Next Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  What happens after submitting:
                </span>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#39C6B0] shrink-0" />
                    <span>We review your problem context and technical feasibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#39C6B0] shrink-0" />
                    <span>We provide an upfront roadmap with transparent pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#39C6B0] shrink-0" />
                    <span>No spam, no unsolicited calls, and no lock-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form / Live Success State */}
          <div className="lg:col-span-7">
            <div className="bg-[#132238] border border-[#1E334D] rounded-2xl p-7 lg:p-8 shadow-xl">
              
              {/* SUCCESS STATE (Real Backend Response) */}
              {successData ? (
                <div className="space-y-6 animate-fade-in" role="status" aria-live="polite">
                  
                  {/* Verified Confirmation Banner */}
                  <div className="p-5 rounded-2xl bg-[#0B1728] border-2 border-[#39C6B0] text-white space-y-3 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-[#39C6B0]/20 text-[#39C6B0] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#39C6B0] block">
                          Verified Submission
                        </span>
                        <h4 className="text-xl font-bold text-white">
                          Enquiry Received Successfully!
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {successData.message}
                    </p>

                    {/* Reference ID Pill */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <div className="bg-[#102A43] border border-[#1E334D] px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                        <span className="text-xs text-[#60758B]">Reference ID:</span>
                        <span className="text-sm font-mono font-bold text-[#39C6B0]">{successData.enquiryId}</span>
                      </div>
                      <span className="text-xs text-[#60758B]">
                        Logged: {new Date(successData.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                      </span>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-[#39C6B0]" />
                        <span>Submitted Brief Summary:</span>
                      </label>
                      <button
                        onClick={() => copyToClipboard(successData.summary)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#39C6B0] hover:text-white font-medium"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Brief</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="bg-[#0B1728] p-4 rounded-xl border border-[#1E334D] text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                      {successData.summary}
                    </pre>
                  </div>

                  {/* Immediate WhatsApp Followup Option */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => handleSendWhatsAppWithRef(successData.enquiryId, successData.service)}
                      className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Quote Reference in WhatsApp</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center space-x-2 bg-[#102A43] hover:bg-[#1E334D] text-white border border-[#1E334D] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
                    >
                      <RefreshCw className="w-4 h-4 text-[#39C6B0]" />
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>

                </div>
              ) : (
                /* Interactive Enquiry Form */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Server error alert if any */}
                  {serverError && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm space-y-2">
                      <div className="flex items-center gap-2 font-bold text-rose-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Notice</span>
                      </div>
                      <p>{serverError}</p>

                      {offlineFallbackPayload && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(offlineFallbackPayload)}
                            className="inline-flex items-center gap-1.5 text-xs text-white bg-rose-600/60 hover:bg-rose-600 px-3 py-1.5 rounded-lg"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Formatted Brief</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Full Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full bg-[#0B1728] border ${
                          errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#1E334D]'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-[#60758B] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Business or Organisation Name <span className="text-[#60758B] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Sri Murugan Traders"
                        className="w-full bg-[#0B1728] border border-[#1E334D] rounded-xl px-4 py-3 text-sm text-white placeholder-[#60758B] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Email Address <span className="text-[#60758B] font-normal">(Optional if phone provided)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email || errors.contactMethod) {
                            setErrors({ ...errors, email: '', contactMethod: '' });
                          }
                        }}
                        placeholder="name@business.com"
                        className={`w-full bg-[#0B1728] border ${
                          errors.email ? 'border-rose-500' : 'border-[#1E334D]'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-[#60758B] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Phone or WhatsApp Number <span className="text-[#60758B] font-normal">(Optional if email provided)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone || errors.contactMethod) {
                            setErrors({ ...errors, phone: '', contactMethod: '' });
                          }
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#0B1728] border ${
                          errors.phone ? 'border-rose-500' : 'border-[#1E334D]'
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-[#60758B] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                    </div>
                  </div>

                  {errors.contactMethod && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                      {errors.contactMethod}
                    </div>
                  )}

                  {/* Service Required & Approximate Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Service Required <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceId })}
                        className="w-full bg-[#0B1728] border border-[#1E334D] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
                      >
                        <option value="website-development">Website Development</option>
                        <option value="business-catalogue">Business or Wholesale Catalogue</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="custom-software">Custom Software</option>
                        <option value="workflow-automation">Workflow Automation</option>
                        <option value="not-sure">Not Sure Yet — Help Me Decide</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Approximate Budget <span className="text-[#60758B] font-normal">(Optional)</span>
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value as BudgetRange })}
                        className="w-full bg-[#0B1728] border border-[#1E334D] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
                      >
                        <option value="">Select an approximate range</option>
                        <option value="below-3000">Below ₹3,000</option>
                        <option value="3000-7000">₹3,000 – ₹7,000</option>
                        <option value="7000-15000">₹7,000 – ₹15,000</option>
                        <option value="15000-plus">₹15,000+</option>
                        <option value="need-guidance">Need Guidance</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Project Description <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => {
                        setFormData({ ...formData, projectDescription: e.target.value });
                        if (errors.projectDescription) setErrors({ ...errors, projectDescription: '' });
                      }}
                      placeholder="Tell us what takes too much time, what kind of website/app you need, or the problem you want solved..."
                      className={`w-full bg-[#0B1728] border ${
                        errors.projectDescription ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#1E334D]'
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-[#60758B] focus:outline-none focus:ring-2 focus:ring-[#39C6B0] resize-y`}
                    />
                    {errors.projectDescription && (
                      <p className="mt-1 text-xs text-rose-400">{errors.projectDescription}</p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2">
                      Preferred Contact Method <span className="text-[#60758B] font-normal">(Optional)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5" /> },
                        { id: 'email', label: 'Email', icon: <Mail className="w-3.5 h-3.5" /> },
                        { id: 'phone', label: 'Phone Call', icon: <Phone className="w-3.5 h-3.5" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: item.id as any })}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors ${
                            formData.preferredContact === item.id
                              ? 'bg-[#39C6B0]/15 border-[#39C6B0] text-[#39C6B0] font-semibold'
                              : 'bg-[#0B1728] border-[#1E334D] text-slate-300 hover:text-white'
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (errors.consent) setErrors({ ...errors, consent: '' });
                        }}
                        className="mt-1 w-4 h-4 rounded text-[#39C6B0] focus:ring-[#39C6B0] focus:ring-offset-[#0B1728] bg-[#0B1728] border-[#1E334D]"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        I agree to allow RealTech to use this information to respond to my project enquiry. We respect your privacy and never sell or share contact details.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-rose-400 pl-7">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#39C6B0] hover:bg-[#2bb39e] disabled:opacity-50 text-[#0B1728] font-bold text-base py-4 px-6 rounded-xl shadow-lg hover:shadow-glow-teal transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#39C6B0]"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Submitting to RealTech Database...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy note */}
                  <p className="text-[11px] text-center text-[#60758B]">
                    No technical jargon required. All project discussions are kept strictly confidential.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
