export type ServiceCategory = 'web' | 'mobile' | 'ai' | 'software' | 'cloud' | 'consulting' | 'photography'

export type ServiceConfig = {
  id: string
  category: ServiceCategory
  title: string
  chatTitle: string
  quickActions: string[]
  questions: { key: 'existingSystem' | 'priority' | 'projectStage' | 'timeline'; label: string; options: string[] }[]
}

const generalQuestions = [
  { key: 'existingSystem' as const, label: 'Do you already have an existing website, application or system?', options: ['Yes', 'No', 'Partially'] },
  { key: 'priority' as const, label: 'What matters most for this project?', options: ['Launch quickly', 'Quality', 'Scalability', 'Modernisation', 'Automation', 'AI capability', 'Performance', 'Not sure yet'] },
  { key: 'projectStage' as const, label: 'What stage is the project currently at?', options: ['Idea', 'Requirements ready', 'Design ready', 'Existing product', 'Already in development'] },
  { key: 'timeline' as const, label: 'What is your expected timeline?', options: ['ASAP', 'Within 1 month', '1-3 months', '3-6 months', 'Flexible'] },
]

const photographyQuestions = [
  { key: 'existingSystem' as const, label: 'What type of session are you looking for?', options: ['Portrait', 'Headshots', 'Personal branding', 'Corporate', 'Product', 'Property / interior', 'Event', 'Other'] },
  { key: 'priority' as const, label: 'Where will the photographs be used?', options: ['Personal', 'LinkedIn', 'Website', 'Business', 'Social media', 'Marketing', 'Other'] },
  { key: 'projectStage' as const, label: 'What kind of location do you prefer?', options: ['Indoor', 'Outdoor', 'Studio', 'At my workplace', 'Not sure yet'] },
  { key: 'timeline' as const, label: 'When would you ideally like the session?', options: ['ASAP', 'Within 1 month', '1-3 months', '3-6 months', 'Flexible'] },
]

export const serviceConfigs: ServiceConfig[] = [
  { id: 'business-websites', category: 'web', title: 'Business Websites', chatTitle: 'Business Website Development', quickActions: ['New website', 'Redesign existing website', 'E-commerce', 'Booking website', 'Custom functionality', 'Not sure yet'], questions: generalQuestions },
  { id: 'professional-websites', category: 'web', title: 'Personal & Professional Websites', chatTitle: 'Personal & Professional Website', quickActions: ['Professional profile', 'Portfolio / case studies', 'Personal brand', 'Technical blog', 'Downloadable CV', 'Not sure yet'], questions: generalQuestions },
  { id: 'custom-websites', category: 'web', title: 'Custom Website Development', chatTitle: 'Custom Website Development', quickActions: ['Customer portal', 'Booking platform', 'Dashboard', 'Membership system', 'AI-enabled website', 'Not sure yet'], questions: generalQuestions },
  { id: 'website-modernisation', category: 'consulting', title: 'Website Modernisation', chatTitle: 'Website Modernisation', quickActions: ['Visual redesign', 'Mobile improvements', 'Performance', 'Accessibility', 'SEO foundations', 'Migration'], questions: generalQuestions },
  { id: 'ecommerce', category: 'web', title: 'E-Commerce Development', chatTitle: 'E-Commerce Development', quickActions: ['New online store', 'Improve existing store', 'Payments', 'Inventory integration', 'Customer accounts', 'Not sure yet'], questions: generalQuestions },
  { id: 'booking', category: 'web', title: 'Booking & Appointment Websites', chatTitle: 'Booking & Appointment Website', quickActions: ['Clinic / wellness', 'Professional service', 'Accommodation', 'Training provider', 'Payment workflow', 'Not sure yet'], questions: generalQuestions },
  { id: 'automation', category: 'consulting', title: 'Website + Business Automation', chatTitle: 'Website & Business Automation', quickActions: ['CRM workflow', 'Automated email', 'Document collection', 'Payments', 'Internal dashboard', 'AI assistant'], questions: generalQuestions },
  { id: 'mobile', category: 'mobile', title: 'Mobile Application Development', chatTitle: 'Mobile Application Development', quickActions: ['New mobile app', 'Existing app improvement', 'MVP / prototype', 'Business app', 'Customer app', 'Not sure yet'], questions: generalQuestions },
  { id: 'platforms', category: 'mobile', title: 'Mobile + Web Platforms', chatTitle: 'Mobile & Web Platform', quickActions: ['Customer platform', 'Staff platform', 'Administration portal', 'Secure API', 'Cloud platform', 'Not sure yet'], questions: generalQuestions },
  { id: 'software', category: 'software', title: 'Custom Software Development', chatTitle: 'Custom Software Development', quickActions: ['New application', 'Existing system', 'Modernisation', 'Integration', 'Performance problem', 'Not sure yet'], questions: generalQuestions },
  { id: 'dotnet', category: 'software', title: '.NET Backend & API Development', chatTitle: '.NET Backend & API Development', quickActions: ['New API', 'API modernisation', 'Integration', 'Authentication', 'Performance problem', 'Not sure yet'], questions: generalQuestions },
  { id: 'ai', category: 'ai', title: 'AI-Enabled Applications', chatTitle: 'AI-Enabled Application Development', quickActions: ['AI assistant', 'AI workflow', 'Existing product + AI', 'Natural-language analytics', 'AI prototype', 'Not sure yet'], questions: generalQuestions },
  { id: 'mcp', category: 'ai', title: 'AI Workflow & MCP Development', chatTitle: 'AI Workflow & MCP Development', quickActions: ['AI workflow', 'MCP tool server', 'Approval workflow', 'Document assistant', 'Internal knowledge assistant', 'Not sure yet'], questions: generalQuestions },
  { id: 'architecture', category: 'consulting', title: 'Architecture, Performance & Data', chatTitle: 'Architecture & Performance Consultation', quickActions: ['Architecture review', 'Technical due diligence', 'Performance problem', 'SQL / data issue', 'Production issue', 'Not sure yet'], questions: generalQuestions },
  { id: 'cloud', category: 'cloud', title: 'Azure & Release Engineering', chatTitle: 'Azure & Release Engineering', quickActions: ['Azure architecture', 'CI/CD', 'Infrastructure as code', 'Monitoring', 'Cloud migration', 'Not sure yet'], questions: generalQuestions },
  { id: 'photography', category: 'photography', title: 'Photography', chatTitle: 'Photography Enquiry', quickActions: ['Portrait', 'Headshots', 'Personal branding', 'Corporate', 'Product', 'Property / interior', 'Event', 'Other'], questions: photographyQuestions },
]

export const findServiceConfig = (title: string): ServiceConfig => serviceConfigs.find((service) => service.title === title) ?? {
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  category: 'software',
  title,
  chatTitle: title,
  quickActions: ['New application', 'Existing system', 'Modernisation', 'Integration', 'Performance problem', 'Not sure yet'],
  questions: generalQuestions,
}
