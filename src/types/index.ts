export type ServiceId = 
  | 'website-development'
  | 'business-catalogue'
  | 'mobile-app'
  | 'custom-software'
  | 'workflow-automation'
  | 'not-sure';

export interface ServiceItem {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export type BudgetRange = 
  | 'below-3000'
  | '3000-7000'
  | '7000-15000'
  | '15000-plus'
  | 'need-guidance';

export interface ContactFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  service: ServiceId;
  budget: BudgetRange | '';
  projectDescription: string;
  preferredContact: 'whatsapp' | 'email' | 'phone' | '';
  consent: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceDisplay: string;
  priceNote: string;
  idealFor: string;
  deliverables: string[];
  ctaLabel: string;
  serviceTarget: ServiceId;
  recommended?: boolean;
}

export interface ProjectConcept {
  id: string;
  title: string;
  category: string;
  summary: string;
  clientType: string;
  problemStatement: string;
  solutionDelivered: string[];
  keyHighlights: string[];
  features: string[];
  mockupType: 'catalogue' | 'dashboard' | 'automation';
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
