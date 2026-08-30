/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Globe, Coffee, Smartphone, LayoutGrid, ShoppingCart, 
  Briefcase, Calendar, Wrench, Rocket, Search, Languages,
  Utensils, Store, Scissors, Dumbbell, Stethoscope, Building2, Car,
  ChevronDown, ArrowRight, CheckCircle2, MessageCircle
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import { Service, PortfolioItem, Industry, ProcessStep, PricingTier, FAQ } from './types';

// Data
const SERVICES: Service[] = [
  {
    id: 'business',
    title: 'Business Websites',
    icon: Globe,
    description: 'Professional websites for businesses that need a strong online presence.',
    features: ['Company websites', 'Responsive design', 'Contact forms']
  },
  {
    id: 'menus',
    title: 'Digital Restaurant Menus',
    icon: Utensils,
    description: 'Modern mobile-first restaurant menus accessible instantly through a QR code.',
    features: ['QR code menus', 'Food categories', 'Arabic / English']
  },
  {
    id: 'landing',
    title: 'Landing Pages',
    icon: Smartphone,
    description: 'High-converting landing pages designed around a specific product, service, or campaign.',
    features: ['Product launches', 'Promotions', 'Event pages', 'Lead-generation']
  },
  {
    id: 'catalog',
    title: 'Product Catalogs',
    icon: LayoutGrid,
    description: 'Beautiful online catalogs that allow customers to browse products seamlessly.',
    features: ['Product images', 'Categories', 'Search/filtering']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Websites',
    icon: ShoppingCart,
    description: 'Complete online stores for businesses that want to sell products online.',
    features: ['Shopping cart', 'Online payments', 'Order management', 'Customer accounts']
  },
  {
    id: 'portfolio',
    title: 'Portfolio & Personal',
    icon: Briefcase,
    description: 'Professional websites for individuals, freelancers, and consultants.',
    features: ['Personal branding', 'Projects showcase', 'About section', 'Contact info']
  },
  {
    id: 'booking',
    title: 'Booking & Appointments',
    icon: Calendar,
    description: 'Websites that allow customers to request or book appointments 24/7.',
    features: ['Service selection', 'Appointment scheduling', 'Availability', 'Confirmations']
  },
  {
    id: 'bilingual',
    title: 'Arabic & English Websites',
    icon: Languages,
    description: 'Bilingual websites designed for businesses serving both Arabic and English speakers.',
    features: ['Arabic / English content', 'RTL support', 'Language switching', 'Responsive']
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    icon: Search,
    description: 'Help your business become more visible and provide a faster experience.',
    features: ['Technical SEO', 'Mobile optimization', 'Image optimization', 'Google indexing']
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    icon: Wrench,
    description: 'Ongoing support, content updates, and bug fixes after launch.',
    features: ['Content updates', 'Performance monitoring', 'Security updates', 'Bug fixes']
  },
  {
    id: 'hosting',
    title: 'Hosting & Deployment',
    icon: Rocket,
    description: 'We handle the technical side so you don\'t have to worry about servers.',
    features: ['Domain setup', 'Hosting setup', 'SSL/HTTPS', 'DNS configuration']
  }
];

const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'nara',
    title: 'NARA',
    category: 'Restaurant Website & Menu',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    description: 'Modern restaurant website with digital menu and QR access.'
  },
  {
    id: 'noir',
    title: 'NOIR',
    category: 'Barbershop Website',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop',
    description: 'Premium barbershop website featuring services, gallery, and booking.'
  },
  {
    id: 'forge',
    title: 'FORGE',
    category: 'Gym Website',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    description: 'Modern fitness website featuring programs, memberships, and contact.'
  },
  {
    id: 'aura',
    title: 'AURA',
    category: 'Fashion Store',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop',
    description: 'Minimal product catalog with WhatsApp ordering.'
  },
  {
    id: 'gloss',
    title: 'GLOSS',
    category: 'Car Detailing',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop',
    description: 'Premium automotive detailing landing page.'
  }
];

const INDUSTRIES: Industry[] = [
  { id: 'restaurants', title: 'Restaurants & Cafés', description: 'Digital menus and restaurant websites.', icon: Coffee },
  { id: 'retail', title: 'Retail & Shops', description: 'Product catalogs and business websites.', icon: Store },
  { id: 'beauty', title: 'Beauty & Grooming', description: 'Barbershop and salon websites.', icon: Scissors },
  { id: 'fitness', title: 'Fitness', description: 'Gym and personal trainer websites.', icon: Dumbbell },
  { id: 'professional', title: 'Professional Services', description: 'Websites for consultants and freelancers.', icon: Briefcase },
  { id: 'auto', title: 'Automotive', description: 'Websites for dealerships and detailing.', icon: Car },
  { id: 'healthcare', title: 'Healthcare', description: 'Modern websites for clinics and professionals.', icon: Stethoscope },
  { id: 'realestate', title: 'Real Estate', description: 'Property-focused websites and landing pages.', icon: Building2 },
];

const PROCESS: ProcessStep[] = [
  { id: 'step1', number: '01', title: 'Tell Us What You Need', description: 'Send us your business details and tell us what you want your website to achieve.' },
  { id: 'step2', number: '02', title: 'Design', description: 'We create the visual direction and website structure around your business.' },
  { id: 'step3', number: '03', title: 'Build', description: 'The website is developed, optimized, tested, and prepared for launch.' },
  { id: 'step4', number: '04', title: 'Launch', description: 'Your website goes live with hosting, domain, SSL, and final configuration.' },
];

const PRICING: PricingTier[] = [
  { id: 'landing', title: 'Landing Page', price: '100 JOD', description: 'For businesses that need a simple professional online presence.' },
  { id: 'menu', title: 'Digital Menu', price: '100 JOD', description: 'For restaurants, cafés, and food businesses.' },
  { id: 'business', title: 'Business Website', price: '150 JOD', description: 'For businesses that need multiple pages and more features.', isPopular: true },
  { id: 'custom', title: 'Custom Website', price: 'Let\'s Talk', description: 'For e-commerce, booking systems, dashboards, and custom functionality.' },
];

const FAQS: FAQ[] = [
  { question: 'How long does a website take?', answer: 'Most simple websites can be completed within a few days depending on the requirements and content.' },
  { question: 'Do you provide hosting?', answer: 'Yes. Hosting and deployment can be handled as part of the project.' },
  { question: 'Can you create an Arabic website?', answer: 'Yes. Websites can be built in Arabic, English, or both.' },
  { question: 'Can I update my website later?', answer: 'Yes. Content can be updated manually or through a custom dashboard depending on the project.' },
  { question: 'Can you redesign my existing website?', answer: 'Yes. Existing websites can be redesigned and modernized.' },
  { question: 'Do you provide maintenance?', answer: 'Yes. Ongoing maintenance and updates can be provided as an optional service.' },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">STUDIO</div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-sm font-bold tracking-widest uppercase items-center">
          {['Services', 'Industries', 'Process', 'About', 'Pricing'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#070716]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {['Services', 'Industries', 'Process', 'About', 'Pricing', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-3xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-6 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp CTA for Mobile */}
      <a 
        href="https://wa.me/962780077090"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-6 z-40 bg-[#4fb7b3] text-black p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* HERO SECTION */}
      <header className="relative min-h-[100svh] h-auto flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-24 lg:pt-20 lg:pb-0">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12 md:mt-0"
        >
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center gap-3 text-xs md:text-sm font-mono text-[#a8fbd3] tracking-[0.2em] uppercase mb-6 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5"
            >
              <span className="w-2 h-2 bg-[#4fb7b3] rounded-full animate-pulse"/>
              <span>Web Studio for Local Businesses</span>
            </motion.div>

            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.3 }}
               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 break-words"
            >
              Modern websites for businesses that want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">stand out.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-lg md:text-xl font-light text-gray-300 leading-relaxed max-w-xl mb-10"
            >
              Create fast, beautiful, mobile-friendly websites designed to help businesses build credibility, showcase their products or services, and turn visitors into customers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#a8fbd3] transition-colors text-center"
                data-hover="true"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => scrollToSection('our-work')}
                className="border border-white/30 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors text-center"
                data-hover="true"
              >
                View Our Work
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#637ab9] to-[#4fb7b3] rounded-2xl rotate-3 opacity-20 blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
              <div className="h-8 bg-black/50 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" 
                alt="Website Mockup" 
                className="w-full h-[500px] object-cover object-top opacity-80"
              />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* WHY CHOOSE US */}
      <section className="relative z-10 py-16 bg-black/40 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { title: 'Modern Design', desc: 'Beautiful & branded' },
              { title: 'Mobile First', desc: 'Perfect on phones' },
              { title: 'Fast Performance', desc: 'Optimized for speed' },
              { title: 'Easy to Contact', desc: 'WhatsApp & Maps' },
              { title: 'Bilingual', desc: 'Arabic & English' },
              { title: 'Built to Grow', desc: 'Scalable solutions' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-[#4fb7b3] mb-3" />
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Comprehensive web solutions tailored for your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="p-8 border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/5 transition-all duration-300 group"
              >
                <service.icon className="w-10 h-10 text-[#4fb7b3] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold font-heading mb-4">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed h-16">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-1 h-1 bg-[#a8fbd3] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / OUR WORK */}
      <section id="our-work" className="relative z-10 py-24 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-6">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Works</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-xl font-light">
                Explore example projects demonstrating the quality and style you can expect.
              </p>
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-bold uppercase tracking-widest text-[#a8fbd3] hover:text-white transition-colors flex items-center gap-2"
              data-hover="true"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PORTFOLIO.map((item, index) => (
              <div 
                key={item.id} 
                className={`group cursor-pointer ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
                data-hover="true"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 mb-6 bg-black/40 h-[300px] md:h-[400px]">
                  <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono tracking-wider rounded border border-white/10">
                    Example
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[#a8fbd3] text-xs font-bold tracking-widest uppercase mb-2">{item.category}</p>
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">{item.title}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-4 px-2">
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-6">
              Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Served</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind.id} className="p-6 border border-white/10 bg-black/20 backdrop-blur-sm text-center group hover:bg-white/5 transition-colors">
                <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/5 mb-4 group-hover:scale-110 transition-transform">
                  <ind.icon className="w-6 h-6 text-[#a8fbd3]" />
                </div>
                <h4 className="font-bold text-sm md:text-base mb-2">{ind.title}</h4>
                <p className="text-xs text-gray-400">{ind.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative z-10 py-24 md:py-32 bg-black/20 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-6">
              Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              From idea to launch in four straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="text-6xl md:text-7xl font-heading font-bold text-white/20 mb-6">{step.number}</div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-[#4fb7b3]" />
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                
                {index < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-6 break-words">
              Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Pricing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Simple starting points. Final pricing depends on your exact requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING.map((tier) => (
              <div 
                key={tier.id} 
                className={`relative p-8 border ${tier.isPopular ? 'border-[#4fb7b3] bg-[#4fb7b3]/5' : 'border-white/10 bg-black/20'} backdrop-blur-sm flex flex-col`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#4fb7b3] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-heading font-bold mb-2">{tier.title}</h3>
                <div className="text-3xl font-bold mb-6 text-[#a8fbd3]">{tier.price}</div>
                <p className="text-gray-400 text-sm mb-8 flex-grow">{tier.description}</p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-colors border ${tier.isPopular ? 'bg-[#4fb7b3] text-black hover:bg-white border-[#4fb7b3]' : 'border-white/30 text-white hover:bg-white hover:text-black'}`}
                  data-hover="true"
                >
                  Get a Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 md:py-32 bg-black/20 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Studio</span>
              </h2>
              <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed">
                <p>
                  We are a boutique web development studio focused on building modern digital experiences for local businesses.
                </p>
                <p>
                  Our goal is to help you build credibility, showcase your services, and ultimately generate more business. We prioritize design, performance, and reliability over unnecessary technical complexity.
                </p>
                <p>
                  Whether you need a digital menu for your café, a booking system for your salon, or a complete e-commerce platform, we deliver polished, production-ready solutions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#637ab9] to-[#4fb7b3] rounded-2xl rotate-3 opacity-20 blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop" 
                alt="Workspace" 
                className="relative rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase leading-tight mb-6">
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-colors"
                  data-hover="true"
                >
                  <span className="font-bold text-sm md:text-base">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#4fb7b3] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / CONTACT */}
      <section id="contact" className="relative z-10 py-32 md:py-48 bg-black/40 backdrop-blur-xl border-t border-white/10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase leading-tight mb-8 break-words">
            Ready to build your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">online presence?</span>
          </h2>
          <p className="text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto">
            Tell us about your business and what you need. We'll help you figure out the right website for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* <button 
              className="w-full sm:w-auto bg-white text-black px-12 py-5 text-sm font-bold tracking-widest uppercase hover:bg-[#a8fbd3] transition-colors"
              data-hover="true"
            >
              Start Your Project
            </button> */}
            <a 
              href="https://wa.me/962780077090"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/30 text-white px-12 py-5 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
              data-hover="true"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 bg-black/80 backdrop-blur-xl text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-heading text-2xl font-bold tracking-tighter text-white">STUDIO</div>
            <div className="text-xs font-mono text-gray-500 mt-2">
              © {new Date().getFullYear()} Studio Web Design. All rights reserved.
            </div>
          </div>
          <div className="flex gap-6">
             {/* <a href="#" className="text-gray-400 hover:text-white text-xs tracking-widest uppercase font-bold transition-colors">Instagram</a> */}
             {/* <a href="#" className="text-gray-400 hover:text-white text-xs tracking-widest uppercase font-bold transition-colors">LinkedIn</a> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
