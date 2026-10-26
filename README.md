# RealTech — Official Business Website

> **Tagline:** Real Problems. Smarter Technology.  
> **Location:** Puducherry, India  
> **Brand Palette:** Deep Navy (`#102A43`), Dark Navy (`#0B1728`), Teal Accent (`#39C6B0`), White (`#FFFFFF`), Light Background (`#F5F8FC`), Muted Text (`#60758B`), Borders (`#D9E3EE`).

A complete, responsive, production-ready business website built with **React**, **TypeScript**, and **Tailwind CSS**. Designed specifically to showcase services, explain practical solutions, communicate transparent pricing, and convert visitors into genuine project enquiries.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```

### 2. Production Build
```bash
npm run build
npm run preview
```

---

## 🛠 Configuration & Customisation Guide

All company contact details, services, pricing, FAQs, and portfolio concepts are centralised in:

📂 [`src/config/siteConfig.ts`](file:///home/bhuvi/Companion/realtech/src/config/siteConfig.ts)

### How to update contact details before production:
Open `src/config/siteConfig.ts` and update the `contact` block:
```typescript
contact: {
  emailPlaceholder: 'your-actual-email@domain.com',
  phonePlaceholder: '+91 98765 43210',
  whatsappNumberPlaceholder: '919876543210', // 10-12 digit country code + phone without '+'
  address: 'Puducherry, India — Serving clients locally & remotely',
  workingHours: 'Monday – Saturday: 9:30 AM – 6:30 PM IST',
}
```

---

## 🔌 Backend Architecture & API

The backend is built with **Express**, **TypeScript**, and an atomic persistent JSON database with append-only audit logging in [`data/`](file:///home/bhuvi/Companion/realtech/data).

### Available API Endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check, uptime, and server environment |
| `POST` | `/api/enquiries` | Submit a new project enquiry (validates contact & rate limits) |
| `GET` | `/api/enquiries` | List all enquiries (supports `?status=received` & `x-admin-key`) |
| `GET` | `/api/enquiries/:id` | Fetch an individual enquiry by Reference ID (`RT-2026-XXXX`) |
| `PATCH` | `/api/enquiries/:id/status` | Update enquiry lifecycle (`received` &rarr; `contacted` &rarr; `converted`) |
| `GET` | `/api/enquiries/stats` | Aggregate metrics (total leads, breakdown by service/budget) |

### Database Files:
- 📂 `data/enquiries.json`: Atomic storage of all client briefs, contact information, and statuses.
- 📂 `data/enquiries.log`: Append-only audit log tracking timestamps, IP addresses, and state changes.

### Running Backend & Frontend:
```bash
# 1. Run unified production server (serves API + static frontend on port 3001)
npm run build
npm run start

# 2. Run standalone backend server during development
npm run server

# 3. Run frontend development with live proxy to backend
npm run dev
```

---

## 📁 Project Architecture

```
realtech/
├── index.html                 # SEO metadata, Inter font, OpenGraph tags, favicon
├── package.json               # Dependencies (React, Lucide, Tailwind, TypeScript, Vite)
├── tailwind.config.js         # Custom RealTech brand palette and shadows
├── tsconfig.json              # Strict TypeScript configuration
├── vite.config.ts             # Vite bundler config
└── src/
    ├── main.tsx               # App entrypoint
    ├── App.tsx                # Layout coordinator & state orchestration
    ├── index.css              # Base styles, smooth scrolling, scroll padding
    ├── config/
    │   └── siteConfig.ts      # Centralised business configuration & placeholders
    ├── types/
    │   └── index.ts           # TypeScript interfaces for services, pricing & projects
    └── components/
        ├── Header.tsx         # Sticky navigation, R geometric mark, mobile drawer
        ├── Hero.tsx           # Value proposition & interactive product mockups
        ├── Services.tsx       # 4 premium cards with interactive contact pre-selection
        ├── Approach.tsx       # "Less Complexity" philosophy & agency contrast
        ├── Process.tsx        # 4-step development timeline
        ├── Portfolio.tsx      # Practical concept demonstrations
        ├── ProjectModal.tsx   # Deep-dive interactive mockups (desktop/mobile switch)
        ├── Pricing.tsx        # Starting rates (₹1,500+, ₹4,999+, Custom Quote) & disclaimer
        ├── ConversionCTA.tsx  # High-impact deep navy & teal conversion section
        ├── FAQ.tsx            # 12 accessible accordion questions
        ├── ContactForm.tsx    # Accessible enquiry form with honest demo mode
        ├── LegalModal.tsx     # Privacy Policy & Terms of Service dialogs
        └── Footer.tsx         # Brand links, Puducherry notice & dynamic copyright
```

---

## 🎯 Key Design Features
- **100% Brand Compliant:** Strict adherence to `#102A43`, `#0B1728`, `#39C6B0`, and Inter typography.
- **Accessible & Responsive:** Semantic HTML, ARIA attributes, keyboard navigation for menus, modals, and accordions.
- **Conversion Flow:** CTAs throughout the page automatically pre-populate the enquiry form with the selected service and budget.
- **Ethical & Honest:** Zero fake testimonials, zero invented customer logos, and clear disclosure of concept demonstrations.
