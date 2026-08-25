import {
  ArrowLeft, ArrowRight, Camera, Check, Code2, Github, Linkedin, Mail, MapPin,
  Menu, Send, Smartphone, Sparkles, X,
} from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from './data/profile'
import { findServiceConfig, serviceConfigs, type ServiceConfig } from './data/serviceConfig'
import { submitProjectEnquiry, type ProjectEnquiry } from './services/projectEnquiryService'

type ServiceGroup = {
  number: string
  title: string
  intro: string
  items: string[]
  accent: string
}

const softwareServices: ServiceGroup[] = [
  { number: '01', title: 'Custom Web Applications', intro: 'From business requirement to production-ready application.', items: ['Internal business applications', 'Customer portals and dashboards', 'Workflow and administration platforms', 'Reporting and scheduling systems', 'Secure, authenticated multi-role applications', 'SaaS product features and prototypes'], accent: 'cyan' },
  { number: '02', title: '.NET Backend & API Development', intro: 'Robust APIs designed for real application workloads.', items: ['C# and ASP.NET Core APIs', 'Authentication and authorisation', 'Entity Framework Core and SQL Server', 'Background processing and asynchronous workflows', 'External API integration and versioning', 'Performance investigation and modernisation'], accent: 'violet' },
  { number: '03', title: 'React & Angular Engineering', intro: 'Enterprise frontend systems that remain understandable as they grow.', items: ['React, Angular and TypeScript', 'Component and state architecture', 'Complex forms, dashboards and data grids', 'API integration and authentication flows', 'Reusable UI libraries and accessibility', 'Real-time application updates'], accent: 'pink' },
  { number: '04', title: 'AI-Enabled Applications', intro: 'Add AI where it creates real product value, with conventional engineering around it.', items: ['AI assistants and conversational interfaces', 'Azure OpenAI and Anthropic integrations', 'Semantic Kernel and tool calling', 'Streaming responses and structured outputs', 'Natural-language analytics and search', 'Guardrails, deterministic controls and secure data access'], accent: 'green' },
  { number: '05', title: 'AI Workflow & MCP Development', intro: 'Controlled AI agents for structured business processes.', items: ['Report generation and document analysis', 'Data lookup and guided operational workflows', 'MCP tool servers and workflow orchestration', 'Approval checkpoints and structured information gathering', 'Intent validation and approved capability boundaries', 'Production-ready AI proof of concepts'], accent: 'amber' },
  { number: '06', title: 'SaaS Product Development', intro: 'Build and evolve software products designed for continuous change.', items: ['Multi-tenant architecture and role-based functionality', 'Product feature development across the stack', 'Cloud integrations and operational tooling', 'Analytics, workflow systems and AI features', 'Production troubleshooting and platform modernisation', 'Architecture that the next engineer can continue confidently'], accent: 'blue' },
  { number: '07', title: 'Legacy Modernisation', intro: 'Improve established systems without throwing away the business knowledge inside them.', items: ['Legacy application assessment', 'JavaScript to React and Angular migration', 'API extraction and monolith restructuring', 'Dependency upgrades and cloud migration planning', 'CI/CD and observability improvements', 'Incremental evolution instead of unnecessary rewrites'], accent: 'orange' },
  { number: '08', title: 'Architecture, Performance & Data', intro: 'Find the real constraint before introducing more complexity.', items: ['Independent architecture reviews and due diligence', 'SQL query and API performance analysis', 'Complex business rules and workflow systems', 'Google OR-Tools scheduling and optimisation', 'Distributed systems and integration engineering', 'Production troubleshooting across the full stack'], accent: 'teal' },
  { number: '09', title: 'Azure & Release Engineering', intro: 'Make deployment routine, observable and connected to the application.', items: ['Azure Functions, Service Bus and Azure SQL', 'Azure DevOps pipelines and automated testing', 'Docker, Bicep and infrastructure as code', 'Application Insights and production monitoring', 'Repeatable build, test, deploy and observe workflows', 'Cloud-hosted APIs and secure service integration'], accent: 'indigo' },
]

const digitalServices = [
  ['Business Websites', 'Professional responsive websites for businesses, startups, consultants, healthcare, hospitality, property, education and professional services.'],
  ['Personal & Professional Websites', 'A strong presence beyond LinkedIn or a traditional CV, with profiles, case studies, publications, portfolios and contact workflows.'],
  ['Custom Website Development', 'Customer portals, booking platforms, membership systems, dashboards, quotation tools, reporting platforms and AI-enabled websites.'],
  ['Website Modernisation', 'Visual redesign, responsive improvements, performance, accessibility, SEO foundations, integrations and migration from older technologies.'],
  ['E-Commerce Development', 'Product catalogues, checkout, payments, customer accounts, order management, inventory integration and analytics.'],
  ['Booking & Appointment Websites', 'Service selection, availability, appointments, customer details, payments, confirmations and business administration.'],
  ['Website + Business Automation', 'Connect enquiries, CRM workflows, email, document collection, payments, dashboards, third-party APIs and AI assistants.'],
  ['Mobile Application Development', 'Customer and staff applications for bookings, field operations, scheduling, reporting, payments, notifications and secure account access.'],
  ['Mobile + Web Platforms', 'A connected customer app, website, administration portal, secure API, database and cloud infrastructure sharing one business logic.'],
]

const photographyServices = [
  ['Portraits & Headshots', 'Natural, professional imagery for individuals, executives, LinkedIn, CVs, company websites and personal brands.'],
  ['Personal Branding', 'A planned collection of consistent images for websites, social media, articles, presentations, advertising and campaigns.'],
  ['Business & Corporate', 'Staff portraits, teams, workplaces, leadership, business activities, events and authentic website imagery.'],
  ['Product, Property & Interior', 'Clear, professional imagery for online stores, catalogues, accommodation, hotels, restaurants, offices and commercial spaces.'],
  ['Events & Social Content', 'Corporate events, gatherings, celebrations and reusable visual content for Instagram, Facebook, LinkedIn and digital campaigns.'],
]

function ServiceHeader({ open, setOpen, onStart }: { open: boolean; setOpen: (value: boolean) => void; onStart: () => void }) {
  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Services navigation">
        <a className="brand" href="./index.html" aria-label="Back to portfolio">
          <img className="brand-mark" src={profile.photo} alt="" />
          <span>{profile.name}</span>
        </a>
        <div className="desktop-nav services-nav">
          <a href="#software">Software</a>
          <a href="#digital">Digital</a>
          <a href="#photography">Photography</a>
          <a href="#process">Process</a>
          <button className="button button-small" onClick={onStart}><Mail size={15} /> Start a conversation</button>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && <div className="mobile-nav container services-mobile-nav">
        <a href="#software" onClick={() => setOpen(false)}>Software</a>
        <a href="#digital" onClick={() => setOpen(false)}>Digital development</a>
        <a href="#photography" onClick={() => setOpen(false)}>Photography</a>
        <a href="#process" onClick={() => setOpen(false)}>How I work</a>
        <button className="button" onClick={onStart}><Mail size={16} /> Start a conversation</button>
      </div>}
    </header>
  )
}

type ChatStep = 'quick' | 'requirement' | 'questions' | 'contact' | 'summary' | 'success'

const emptyEnquiry = (service: ServiceConfig): ProjectEnquiry => ({
  service: service.chatTitle,
  projectType: '',
  existingSystem: '',
  requirement: '',
  priority: '',
  projectStage: '',
  timeline: '',
  additionalNotes: '',
  contact: { name: '', email: '', phone: '', company: '', preferredMethod: 'Email' },
})

function ProjectChatDrawer({ service, onClose }: { service: ServiceConfig; onClose: () => void }) {
  const [step, setStep] = useState<ChatStep>('quick')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [enquiry, setEnquiry] = useState(() => emptyEnquiry(service))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const firstControlRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    firstControlRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href]')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = previousOverflow }
  }, [onClose])

  const update = (field: keyof ProjectEnquiry, value: string) => setEnquiry((current) => ({ ...current, [field]: value }))
  const updateContact = (field: keyof ProjectEnquiry['contact'], value: string) => setEnquiry((current) => ({ ...current, contact: { ...current.contact, [field]: value } }))
  const question = service.questions[questionIndex]

  const chooseQuickAction = (value: string) => { update('projectType', value); setStep('requirement') }
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!enquiry.contact.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.contact.email)) return
    setSubmitting(true); setError('')
    try { await submitProjectEnquiry(enquiry); setStep('success') } catch { setError("We couldn't send the enquiry just now. Your project details are still here — please try again.") } finally { setSubmitting(false) }
  }

  return <>
    <div className="project-chat-overlay" onClick={onClose} />
    <aside className="project-chat-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="project-chat-title">
      <header className="project-chat-header">
        <div><span className="project-chat-status"><i /> PROJECT ASSISTANT</span><h2 id="project-chat-title">{service.chatTitle}</h2><p>{service.category === 'photography' ? "Let's plan your photography session." : "Let's understand what you're looking to build."}</p></div>
        <button className="chat-close" onClick={onClose} aria-label="Close project assistant"><X size={20} /></button>
      </header>
      <div className="project-chat-trust" aria-label="Project enquiry assurances"><div><span>▣</span><strong>Confidential</strong><small>Your details are secure</small></div><div><span>◇</span><strong>Tailored solutions</strong><small>Based on your needs</small></div><div><span>✓</span><strong>No obligation</strong><small>Discuss freely</small></div></div>
      <div className="project-chat-layout">
      <nav className="project-journey" aria-label="Project journey"><span className="chat-label">PROJECT JOURNEY</span>{[['Service', 'You are here'], ['Project Type', 'What are you planning?'], ['Requirements', 'Tell us more'], ['Project Details', 'Timeline, priorities & more'], ['Contact Details', 'How to reach you'], ['Review & Submit', 'Confirm & send']].map(([title, subtitle], index) => <div className={`journey-step ${index === (step === 'quick' ? 0 : step === 'requirement' ? 2 : step === 'questions' ? 3 : step === 'contact' ? 4 : step === 'summary' || step === 'success' ? 5 : 0) ? 'is-current' : ''}`} key={title}><span>{index === 0 ? '✓' : index + 1}</span><div><strong>{title}</strong><small>{index === 0 ? service.chatTitle : subtitle}</small></div></div>)}<div className="journey-help"><span>?</span><strong>Need help?</strong><p>I'm here to help you shape your ideas into real solutions.</p><button className="chat-text-link" onClick={() => setStep('requirement')}>Talk to me <ArrowRight size={14} /></button></div></nav>
      <div className="project-chat-body" aria-live="polite">
        {step === 'quick' && <div className="chat-message assistant-message"><span className="chat-label">PROJECT DISCOVERY</span><p>Hi — you're enquiring about <strong>{service.chatTitle}</strong>.</p><p>What best describes what you are planning?</p><div className="chat-actions">{service.quickActions.map((action, index) => <button ref={index === 0 ? firstControlRef : undefined} key={action} onClick={() => chooseQuickAction(action)}>{action}</button>)}</div><button className="chat-text-link" onClick={() => setStep('requirement')}>Describe everything instead</button></div>}
        {step === 'requirement' && <div className="chat-message assistant-message"><span className="chat-label">REQUIREMENT</span><p>Tell me a little about what you are planning. A few sentences is enough.</p><textarea autoFocus value={enquiry.requirement} onChange={(event) => update('requirement', event.target.value)} placeholder="Describe your requirement..." maxLength={1200} /><div className="chat-footer-action"><button className="button" disabled={!enquiry.requirement.trim()} onClick={() => setStep('questions')}>Continue <ArrowRight size={16} /></button></div></div>}
        {step === 'questions' && question && <div className="chat-message assistant-message"><span className="chat-label">{question.key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span><p>{question.label}</p><div className="chat-actions">{question.options.map((option, index) => <button ref={questionIndex === 0 && index === 0 ? firstControlRef : undefined} key={option} onClick={() => { update(question.key, option); if (questionIndex < service.questions.length - 1) setQuestionIndex((current) => current + 1); else setStep('contact') }}>{option}</button>)}</div><button className="chat-text-link" onClick={() => { if (questionIndex < service.questions.length - 1) setQuestionIndex((current) => current + 1); else setStep('contact') }}>Skip this question</button></div>}
        {step === 'contact' && <form className="chat-message assistant-message chat-form" onSubmit={(event) => { event.preventDefault(); if (enquiry.contact.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.contact.email)) setStep('summary') }}><span className="chat-label">CONTACT</span><p>Great — I have enough context to understand the initial requirement. How should I contact you?</p><label>Name *<input required value={enquiry.contact.name} onChange={(event) => updateContact('name', event.target.value)} /></label><label>Email *<input required type="email" value={enquiry.contact.email} onChange={(event) => updateContact('email', event.target.value)} /></label><label>Phone / WhatsApp<input value={enquiry.contact.phone} onChange={(event) => updateContact('phone', event.target.value)} /></label><label>Company / Organisation<input value={enquiry.contact.company} onChange={(event) => updateContact('company', event.target.value)} /></label><label>Preferred contact<select value={enquiry.contact.preferredMethod} onChange={(event) => updateContact('preferredMethod', event.target.value)}><option>Email</option><option>Phone</option><option>WhatsApp</option><option>LinkedIn</option></select></label><button className="button" type="submit">Review enquiry <ArrowRight size={16} /></button><small>Your details will only be used to respond to this project enquiry.</small></form>}
        {step === 'summary' && <div className="chat-message assistant-message"><span className="chat-label">PROJECT ENQUIRY</span><h3>Review your enquiry</h3><dl className="chat-summary"><dt>Service</dt><dd>{enquiry.service}</dd><dt>Project</dt><dd>{enquiry.projectType || 'Not specified'}</dd><dt>Requirement</dt><dd>{enquiry.requirement || 'Not specified'}</dd><dt>Stage</dt><dd>{enquiry.projectStage || 'Not specified'}</dd><dt>Timeline</dt><dd>{enquiry.timeline || 'Not specified'}</dd><dt>Contact</dt><dd>{enquiry.contact.name}<br />{enquiry.contact.email}</dd></dl>{error && <p className="chat-error">{error}</p>}<div className="chat-footer-action"><button className="button button-ghost" onClick={() => setStep('contact')}>Edit</button><button className="button" disabled={submitting} onClick={() => void submit(new Event('submit') as unknown as FormEvent)}>{submitting ? 'Sending...' : <>Send enquiry <Send size={16} /></>}</button></div></div>}
        {step === 'success' && <div className="chat-message assistant-message chat-success"><span className="chat-label">ENQUIRY RECEIVED</span><div className="success-mark">✓</div><h3>Thanks, {enquiry.contact.name}.</h3><p>Your <strong>{enquiry.service}</strong> enquiry has been received. I’ll review the project details and get back to you using your preferred contact method.</p><button className="button" onClick={onClose}>Close assistant</button><button className="chat-text-link" onClick={onClose}>Explore more services</button></div>}
      </div></div>
      {step !== 'success' && step !== 'contact' && step !== 'summary' && <div className="project-chat-input"><textarea value={enquiry.additionalNotes} onChange={(event) => update('additionalNotes', event.target.value)} placeholder="Add anything else..." aria-label="Additional project notes" /><button aria-label="Add project note" disabled={!enquiry.additionalNotes.trim()} onClick={() => setEnquiry((current) => ({ ...current, additionalNotes: current.additionalNotes.trim() }))}><Send size={17} /></button></div>}
    </aside>
  </>
}

function Services() {
  const [open, setOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceConfig | null>(null)
  const originatingControl = useRef<HTMLElement | null>(null)

  const openEnquiry = (title: string, control?: HTMLElement) => {
    setSelectedService(findServiceConfig(title))
    originatingControl.current = control ?? null
  }
  const closeEnquiry = () => {
    setSelectedService(null)
    window.setTimeout(() => originatingControl.current?.focus(), 0)
  }

  useEffect(() => {
    const serviceId = new URLSearchParams(window.location.search).get('enquire')
    const linkedService = serviceId ? serviceConfigs.find((service) => service.id === serviceId) : undefined
    if (linkedService) setSelectedService(linkedService)
  }, [])

  return <div className="app-shell services-page">
    <ServiceHeader open={open} setOpen={setOpen} onStart={() => openEnquiry('Business Websites')} />
    <main>
      <section className="services-hero section">
        <div className="container services-hero-grid">
          <div>
            <div className="services-hero-meta">
              <a className="back-link" href="./index.html"><ArrowLeft size={16} /> Back to portfolio</a>
              <span className="section-label">Services</span>
            </div>
            <h1>Build something useful.<br /><span>Make it last.</span></h1>
            <p className="hero-subtitle">Senior engineering, digital development and photography for people and organisations ready to turn an idea into something real.</p>
            <p className="hero-description">From an architecture review or AI workflow to a complete website, mobile platform or visual identity, I can help you define the right solution and take it through design, development, deployment and improvement.</p>
            <div className="hero-actions">
              <button className="button" onClick={() => openEnquiry('Business Websites')}>Discuss a project <ArrowRight size={17} /></button>
              <a className="button button-ghost" href="#software">Explore services</a>
            </div>
          </div>
          <div className="services-signal" aria-label="Service areas">
            <div className="signal-orbit signal-orbit-one" /><div className="signal-orbit signal-orbit-two" /><div className="signal-orbit signal-orbit-three" />
            <svg className="signal-transfer-lines" viewBox="0 0 100 100" aria-hidden="true">
            </svg>
            <div className="signal-core"><Sparkles size={28} /><strong>YOUR IDEA</strong><small>DISCOVERY → DELIVERY</small></div>
            <div className="signal-node signal-node-one"><Code2 size={17} /> Software</div>
            <div className="signal-node signal-node-two"><Smartphone size={17} /> Digital</div>
            <div className="signal-node signal-node-three"><Camera size={17} /> Creative</div>
          </div>
        </div>
      </section>

      <section id="software" className="section section-alt">
        <div className="container">
          <div className="services-section-heading"><div><span className="section-label">Software & engineering</span><h2>Senior expertise for products that need more than extra development capacity.</h2></div><p>Work independently on a defined technical problem, join an existing team or take ownership of a larger piece of delivery.</p></div>
          <div className="service-grid">{softwareServices.map((service) => <button className={`service-card service-${service.accent}`} key={service.number} onClick={(event) => openEnquiry(service.title, event.currentTarget)}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.intro}</p><ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><span className="service-card-cta">Discuss this service <ArrowRight size={15} /></span></button>)}</div>
        </div>
      </section>

      <section id="digital" className="section">
        <div className="container">
          <div className="services-section-heading"><div><span className="section-label">Web, mobile & AI</span><h2>Digital products shaped around the way your organisation works.</h2></div><p>A website can be a professional presence, a sales channel or the front door to a much larger business platform.</p></div>
          <div className="digital-list">{digitalServices.map(([title, description], index) => <button className="digital-service-link" onClick={(event) => openEnquiry(title, event.currentTarget)} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><span className="digital-service-cta">Discuss this service</span><ArrowRight size={19} aria-hidden="true" /></button>)}</div>
        </div>
      </section>

      <section id="photography" className="section section-alt photography-section">
        <div className="container">
          <div className="services-section-heading"><div><span className="section-label">Creative service</span><h2>Photography that makes the work feel like yours.</h2></div><p>Photography is offered independently from software engineering, or as an optional part of a website project when original imagery matters.</p></div>
          <div className="photo-service-grid">{photographyServices.map(([title, description]) => <button className="photo-service-card" onClick={(event) => openEnquiry('Photography', event.currentTarget)} key={title}><Camera size={20} /><h3>{title}</h3><p>{description}</p><span className="service-card-cta">Discuss this service <ArrowRight size={15} /></span></button>)}</div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container">
          <span className="section-label">From concept to launch</span><h2>A practical path from uncertainty to a working product.</h2>
          <div className="process-grid">{['Discovery', 'Requirements', 'UX & Structure', 'Architecture', 'Development', 'Testing', 'Deployment', 'Support & Evolution'].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{['Understand the business, users and objectives.', 'Find what the first version genuinely needs.', 'Define pages, screens and user journeys.', 'Choose proportionate frontend, backend and cloud.', 'Build incrementally with maintainability in mind.', 'Validate functionality across relevant scenarios.', 'Make production delivery repeatable.', 'Improve the product using real-world feedback.'][index]}</small></div>)}</div>
        </div>
      </section>

      <section className="section contact-section services-contact">
          <div className="container contact-card"><div><span className="section-label">Start with a conversation</span><h2>Tell me what you are trying to achieve.</h2><p>You do not need a complete technical specification. Share what currently exists, what is making it difficult and what a successful outcome looks like.</p><p className="location"><MapPin size={17} /> {profile.location} · Remote UK / Europe · International projects considered</p></div><div className="contact-actions"><a className="button" href={`mailto:${profile.email}`}><Mail size={18} /> Email me</a><a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a><a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a></div></div>
      </section>
    </main>
    <footer><div className="container footer-inner"><span>© 2026 {profile.name}. All rights reserved.</span><div className="footer-links"><a href="./index.html">Portfolio</a><span>•</span><a href={`mailto:${profile.email}`}>Email</a></div><span>Digital development and photography services.</span></div></footer>
    {selectedService && <ProjectChatDrawer service={selectedService} onClose={closeEnquiry} />}
  </div>
}

export default Services
