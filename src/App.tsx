import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Approach } from './components/Approach';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { ConversionCTA } from './components/ConversionCTA';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ProjectModal } from './components/ProjectModal';
import { ServiceId, BudgetRange, ProjectConcept } from './types';
import { siteConfig } from './config/siteConfig';

export function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('website-development');
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | ''>('');
  const [projectNote, setProjectNote] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [activeConceptModal, setActiveConceptModal] = useState<ProjectConcept | null>(null);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
    scrollToContact();
  };

  const handleSelectPlan = (plan: { service: ServiceId; budget: BudgetRange; planName: string }) => {
    setSelectedService(plan.service);
    setSelectedBudget(plan.budget);
    setProjectNote(`Interested in discussing the ${plan.planName} (introductory starting package).`);
    scrollToContact();
  };

  const handleDiscussConcept = (conceptName: string) => {
    setProjectNote(`Interested in exploring a solution similar to the "${conceptName}" demonstration.`);
    scrollToContact();
  };

  const handleOpenMockupDemo = (type: 'catalogue' | 'dashboard' | 'automation') => {
    const found = siteConfig.projects.find((p) => p.mockupType === type);
    if (found) {
      setActiveConceptModal(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] selection:bg-[#39C6B0] selection:text-[#0B1728]">
      {/* Navigation Header */}
      <Header onDiscussClick={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onTellUsClick={scrollToContact}
          onExploreServicesClick={scrollToServices}
          onOpenMockupDemo={handleOpenMockupDemo}
        />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Customer Problems & Our Approach */}
        <Approach onDiscussProblemClick={scrollToContact} />

        {/* Our Development Process */}
        <Process onStartPlanningClick={scrollToContact} />

        {/* Portfolio & Project Demonstrations */}
        <Portfolio onDiscussConcept={handleDiscussConcept} />

        {/* Transparent Pricing Section */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* High Conversion CTA Section */}
        <ConversionCTA
          onStartConversationClick={scrollToContact}
          onViewServicesClick={scrollToServices}
        />

        {/* Frequently Asked Questions */}
        <FAQ onAskOtherQuestionClick={scrollToContact} />

        {/* Contact & Project Enquiry Form */}
        <ContactForm
          initialService={selectedService}
          initialBudget={selectedBudget}
          initialNote={projectNote}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={handleSelectService}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Legal Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Hero Mockup Inspector Modal */}
      {activeConceptModal && (
        <ProjectModal
          project={activeConceptModal}
          onClose={() => setActiveConceptModal(null)}
          onDiscussSimilar={(title) => {
            setActiveConceptModal(null);
            handleDiscussConcept(title);
          }}
        />
      )}
    </div>
  );
}

export default App;
