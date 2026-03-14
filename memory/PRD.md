# Arkaa Scapes - Premium Eco-Luxury Construction Website

## Project Overview
Single-page marketing website for Arkaa Scapes, a premium eco-luxury home construction firm in Bangalore.

## Original Problem Statement
Create a high-converting, premium brand website that builds immediate trust and conveys sustainable, high-quality craftsmanship. Reference structure from buildx.homes but with original eco-luxury branding.

## User Personas
1. **Affluent Homeowners** - Looking to build premium sustainable homes (₹40L - ₹2Cr+ budget)
2. **Environmentally Conscious Families** - Want eco-friendly construction without compromising luxury
3. **First-time Home Builders** - Need guidance through the construction process

## Core Requirements (Static)
- [x] Hero section with animated architectural elements
- [x] Services showcase (4 eco-focused services)
- [x] Turnkey packages (Terra, Solara, Aether) with detailed specs
- [x] 6-step process timeline
- [x] About Us section for credibility building
- [x] Testimonials placeholder
- [x] Projects (Coming Soon)
- [x] FAQs accordion
- [x] Contact form with WhatsApp integration
- [x] Footer with social links

## What's Been Implemented (Jan 2026)

### Frontend
- **React SPA** with framer-motion animations
- **Design System**: Maroon (#6B1C23), Burnt Orange (#D35400), Cream (#FAF5F0)
- **Typography**: Playfair Display (headings), Manrope (body)
- **Components**: Header, Hero, Services, Packages, Process, About, Testimonials, Projects, FAQs, Contact, Footer
- **Mobile Responsive**: Full mobile menu and responsive layouts
- **Animations**: SVG path drawing, scroll reveal, hover effects

### Backend
- **FastAPI** with MongoDB
- **Endpoints**:
  - `GET /api/health` - Health check
  - `POST /api/enquiries` - Submit contact form
  - `GET /api/enquiries` - Retrieve all enquiries
- **WhatsApp Integration**: Generates click-to-chat links with enquiry details

### Key Features
1. **Animated Hero**: SVG architectural lines that draw on load
2. **Interactive Packages**: Expandable specifications for Terra/Solara/Aether
3. **Scroll-based Navigation**: Smooth scrolling to sections
4. **WhatsApp CTA**: Direct chat integration for quick enquiries
5. **Trust Indicators**: Eco badges, warranty info, pricing transparency

## Architecture
```
/app
├── backend/
│   ├── server.py        # FastAPI with enquiry endpoints
│   └── .env             # MONGO_URL, DB_NAME
├── frontend/
│   ├── src/
│   │   ├── pages/HomePage.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Hero.jsx
│   │       ├── Services.jsx
│   │       ├── Packages.jsx
│   │       ├── Process.jsx
│   │       ├── About.jsx
│   │       ├── Testimonials.jsx
│   │       ├── Projects.jsx
│   │       ├── FAQs.jsx
│   │       ├── Contact.jsx
│   │       └── Footer.jsx
│   └── .env             # REACT_APP_BACKEND_URL
```

## Prioritized Backlog

### P0 (Completed)
- [x] All core sections implemented
- [x] Contact form with backend integration
- [x] WhatsApp click-to-chat
- [x] Mobile responsive design
- [x] Navigation and scrolling

### P1 (Next Phase)
- [ ] Replace placeholder phone/email with actual contact info
- [ ] Replace placeholder WhatsApp number
- [ ] Add real social media links
- [ ] SEO meta tags and Open Graph
- [ ] Google Analytics integration

### P2 (Future Enhancements)
- [ ] Email notification for new enquiries (SendGrid)
- [ ] Admin dashboard for enquiry management
- [ ] Blog/News section
- [ ] Live chat widget
- [ ] Project portfolio gallery (when projects complete)
- [ ] Virtual tour integration

## Next Tasks
1. Update WhatsApp number in `/app/backend/server.py` (line WHATSAPP_NUMBER)
2. Update contact placeholders in `/app/frontend/src/components/Contact.jsx`
3. Add actual social media URLs in `/app/frontend/src/components/Footer.jsx`
4. Consider adding email service integration for enquiry notifications

## Technical Notes
- Frontend: React 19, framer-motion, shadcn/ui, Tailwind CSS
- Backend: FastAPI, Motor (async MongoDB), Pydantic
- Hosting: Compatible with static hosting (Netlify, Vercel, GitHub Pages)
- WhatsApp integration uses wa.me click-to-chat API
