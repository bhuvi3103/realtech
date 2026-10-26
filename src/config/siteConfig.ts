/**
 * RealTech Site Configuration
 * 
 * Update contact placeholders below with your genuine business contact channels
 * before deploying to production.
 */

export const siteConfig = {
  brandName: 'RealTech',
  tagline: 'Real Problems. Smarter Technology.',
  coreMessage: 'We help businesses solve real problems through practical websites, applications, software, and automation.',
  location: 'Puducherry, India',
  
  // Contact Configuration Placeholders
  contact: {
    // Replace with your real business email
    emailPlaceholder: 'hello@realtech.placeholder',
    // Replace with your real 10-digit phone/WhatsApp number e.g. '919876543210'
    phonePlaceholder: '+91 98765 XXXXX',
    whatsappNumberPlaceholder: '919876543210',
    address: 'Puducherry, India — Serving clients locally & remotely',
    workingHours: 'Monday – Saturday: 9:30 AM – 6:30 PM IST',
    isPlaceholderConfig: true,
  },

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],

  services: [
    {
      id: 'website-development' as const,
      name: 'Website Development',
      tagline: 'Professional web presence built for credibility and conversion',
      description: 'Professional websites that establish credibility, communicate your services, and help customers contact your business easily.',
      features: [
        'Business websites',
        'Landing pages',
        'Portfolio websites',
        'Responsive websites',
        'Business and product catalogues',
        'Enquiry-focused websites',
      ],
      ctaLabel: 'Build My Website',
    },
    {
      id: 'mobile-app' as const,
      name: 'Mobile App Development',
      tagline: 'Useful mobile tools for customers, field staff, and businesses',
      description: 'Useful mobile applications designed around the needs of customers, teams, and businesses for smooth everyday operations.',
      features: [
        'Customer-facing applications',
        'Business utility apps',
        'Internal team applications',
        'Booking and task workflows',
        'App prototypes and MVPs',
      ],
      ctaLabel: 'Discuss an App',
    },
    {
      id: 'custom-software' as const,
      name: 'Custom Software Solutions',
      tagline: 'Tailored systems to manage stock, workflows, and operations',
      description: 'Practical software that helps businesses organise information, manage operations, and improve everyday workflows.',
      features: [
        'Inventory and stock tools',
        'Dashboards and reporting',
        'Business management tools',
        'Data-entry solutions',
        'Custom internal systems',
        'Workflow-specific applications',
      ],
      ctaLabel: 'Explore Software Solutions',
    },
    {
      id: 'workflow-automation' as const,
      name: 'Workflow Automation',
      tagline: 'Eliminate repetitive manual tasks and speed up operations',
      description: 'Reduce repetitive tasks, manual data entry, and time-consuming processes with practical automation built around your current tools.',
      features: [
        'Repetitive task automation',
        'Data processing',
        'Automated reports',
        'Business workflow integrations',
        'Notifications and follow-ups',
        'Connected tools and processes',
      ],
      ctaLabel: 'Automate My Workflow',
    },
  ],

  pricingPlans: [
    {
      id: 'starter',
      name: 'Starter Website',
      tagline: 'For individuals and small shops needing an online identity',
      priceDisplay: '₹1,500+',
      priceNote: 'Introductory starting estimate',
      idealFor: 'Individuals and small businesses that need a simple online presence.',
      deliverables: [
        'Basic landing page or business introduction',
        'Essential business information & opening hours',
        'Mobile-friendly responsive design',
        'Direct contact or enquiry link',
        'Agreed basic revisions prior to launch',
      ],
      ctaLabel: 'Ask About a Starter Website',
      serviceTarget: 'website-development' as const,
      recommended: false,
    },
    {
      id: 'catalogue',
      name: 'Business Catalogue Website',
      tagline: 'For merchants and wholesalers needing showcase & leads',
      priceDisplay: '₹4,999+',
      priceNote: 'Introductory starting estimate',
      idealFor: 'Wholesalers, distributors, retailers, and businesses that want to showcase products online.',
      deliverables: [
        'Multi-section business website',
        'Product or service catalogue structure',
        'Organised product categories & filters',
        'One-click contact & enquiry workflow',
        'WhatsApp enquiry option where appropriate',
        'Responsive mobile & tablet design',
      ],
      ctaLabel: 'Discuss a Catalogue Website',
      serviceTarget: 'business-catalogue' as const,
      recommended: true,
    },
    {
      id: 'custom-solutions',
      name: 'Custom Digital Solutions',
      tagline: 'For complex applications, custom logic, and automation',
      priceDisplay: 'Custom Quote',
      priceNote: 'Scoped to your specific requirements',
      idealFor: 'Businesses needing applications, custom software, integrations, or automation.',
      deliverables: [
        'In-depth requirements discussion & discovery',
        'Clear feature planning & milestone roadmap',
        'Custom web/mobile app or software build',
        'Third-party software & tool integrations',
        'Rigorous testing and agreed handover session',
        'Optional ongoing support arrangements',
      ],
      ctaLabel: 'Get a Custom Quote',
      serviceTarget: 'custom-software' as const,
      recommended: false,
    },
  ],

  faqList: [
    {
      question: 'What services does RealTech provide?',
      answer: 'RealTech specializes in 4 practical digital services: professional website development, mobile app development, custom business software (such as inventory and management dashboards), and workflow automations to reduce repetitive manual tasks.',
    },
    {
      question: 'How much does a website cost?',
      answer: 'Our introductory starting price for a clean starter website begins at ₹1,500+, while product and wholesale catalogue websites typically start from ₹4,999+. Custom web applications and complex systems are quoted individually after scoping your exact requirements.',
    },
    {
      question: 'Can you build a website for a small business?',
      answer: 'Yes, absolutely. A significant portion of our work focuses on small and medium businesses, local shops, and independent service providers who need a professional, trustworthy online presence without paying agency bloat.',
    },
    {
      question: 'Can you create a product catalogue for a wholesaler?',
      answer: 'Yes. We design structured digital catalogues that enable wholesalers and distributors to display their SKUs, categories, specifications, and minimum order quantities with direct WhatsApp or email enquiry buttons for prospective buyers.',
    },
    {
      question: 'Do you build mobile applications?',
      answer: 'Yes. We develop practical mobile applications for Android and cross-platform devices, focusing on utility tools, customer booking or ordering workflows, internal staff tracking, and early MVP prototypes for startups.',
    },
    {
      question: 'What types of tasks can you automate?',
      answer: 'We automate repetitive business workflows such as compiling daily sales summaries into spreadsheets, syncing customer inquiries into CRM systems, generating PDF invoices or dispatch notes automatically, and triggering WhatsApp/email notifications on order status changes.',
    },
    {
      question: 'How long does a project take?',
      answer: 'Timelines depend directly on scope. A starter landing page can typically be delivered within 3 to 7 working days once content is ready. A product catalogue website typically takes 1 to 3 weeks. Custom software and app development timelines are estimated during the planning stage.',
    },
    {
      question: 'Can I request changes during development?',
      answer: 'Yes. We include agreed revision checkpoints during the review milestone so you can provide direct feedback. Any scope expansions beyond the agreed baseline will be discussed transparently with revised quotes before implementation.',
    },
    {
      question: 'Do you provide maintenance after launch?',
      answer: 'Yes. After handing over your project, we offer optional monthly or quarterly maintenance agreements for security updates, content updates, backups, and technical support.',
    },
    {
      question: 'What if I do not know exactly what solution I need?',
      answer: 'That is completely normal! You don\'t need technical specifications to get started. Simply reach out through our enquiry form or WhatsApp, describe the business problem or inefficiency you are facing, and we will advise you on the most practical and cost-effective approach.',
    },
    {
      question: 'Are hosting and domain costs included?',
      answer: 'Introductory development rates cover design, code, and implementation. Third-party recurring expenses such as custom domain registration (.com / .in) and cloud hosting are billed transparently at actual provider costs, or we can deploy to your existing hosting account.',
    },
    {
      question: 'How do I get a project quotation?',
      answer: 'Simply complete the enquiry form below or click "Discuss Your Project". Once we receive your business details and requirements, we will schedule a brief discovery call or message exchange and send an itemized scope with upfront pricing.',
    },
  ],

  projects: [
    {
      id: 'concept-wholesale-catalogue',
      title: 'Wholesale & Distribution Catalogue',
      category: 'Website & Product Showcase',
      summary: 'A fast, mobile-first digital catalogue designed for regional distributors to display bulk inventory with instant WhatsApp RFQ (Request for Quote) flows.',
      clientType: 'B2B Wholesale & FMCG Distribution (Concept Demo)',
      problemStatement: 'Distributors rely on unorganised PDF price sheets and endless phone calls, causing errors in stock inquiries and delayed order confirmations.',
      solutionDelivered: [
        'Structured category navigation with instant search and filter by brand/grade',
        'Direct "Inquire on WhatsApp" pre-filled with SKU name and desired quantity',
        'Clear wholesale pack sizes, minimum order limits, and downloadable spec sheets',
        'Responsive layout optimized for low-bandwidth mobile devices in warehouse settings',
      ],
      keyHighlights: ['Instant SKU Search', 'WhatsApp RFQ Workflow', 'Zero PDF Clutter'],
      features: ['Tiered Pricing Display', 'Category Browsing', 'Real-time Stock Badges', 'Bulk Inquiry Cart'],
      mockupType: 'catalogue' as const,
    },
    {
      id: 'concept-workflow-dashboard',
      title: 'Operations & Job Tracking Dashboard',
      category: 'Custom Business Software',
      summary: 'A unified operations control panel for local service and manufacturing firms to monitor job orders, technician assignments, and payment statuses.',
      clientType: 'Commercial Services & Production Units (Concept Demo)',
      problemStatement: 'Whiteboards and manual notebook logs lead to misplaced client orders, missed deadlines, and lost revenue from untracked billable items.',
      solutionDelivered: [
        'Kanban-style job stage tracker (Received, In-Progress, Quality Check, Delivered)',
        'Technician task dispatch with completion timestamps and photo proof attachment',
        'Real-time revenue and pending payment receivables summary',
        'Automatic client SMS notification on stage transition',
      ],
      keyHighlights: ['Live Status Board', 'Receivables Tracking', 'Audit-ready Records'],
      features: ['Kanban Board', 'Technician Dispatch', 'Payment Milestones', 'Automated Receipts'],
      mockupType: 'dashboard' as const,
    },
    {
      id: 'concept-automation-tool',
      title: 'Automated Invoice & Order Sync Engine',
      category: 'Workflow Automation',
      summary: 'An automated background pipeline that extracts incoming order emails, updates internal Google Sheets, and sends WhatsApp dispatch alerts to customers.',
      clientType: 'Multi-channel Retail & Logistics (Concept Demo)',
      problemStatement: 'Staff wasted 2.5 hours every evening retyping order details from emails and WhatsApp into billing software and sending manual dispatch tracking codes.',
      solutionDelivered: [
        'Automated parser for incoming purchase order emails and formatted messages',
        'Instant record entry into master sales ledger and Google Sheets database',
        'One-click generation of PDF delivery challans with QR verification',
        'Triggered WhatsApp notification with live courier tracking link sent to recipient',
      ],
      keyHighlights: ['Saves 2.5 Hrs Daily', 'Zero Typo Invoices', 'Instant WhatsApp Alerts'],
      features: ['Auto Email Parser', 'Spreadsheet Sync', 'Automated PDF Challans', 'Webhook Triggers'],
      mockupType: 'automation' as const,
    },
  ],
};
