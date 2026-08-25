export type ProjectEnquiry = {
  service: string
  projectType: string
  existingSystem: string
  requirement: string
  priority: string
  projectStage: string
  timeline: string
  additionalNotes: string
  contact: { name: string; email: string; phone: string; company: string; preferredMethod: string }
}

export async function submitProjectEnquiry(enquiry: ProjectEnquiry): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 650))
  const subject = encodeURIComponent(`${enquiry.service} enquiry`)
  const body = encodeURIComponent([
    `Service: ${enquiry.service}`,
    `Project type: ${enquiry.projectType}`,
    `Existing system: ${enquiry.existingSystem}`,
    `Requirement: ${enquiry.requirement}`,
    `Priority: ${enquiry.priority}`,
    `Project stage: ${enquiry.projectStage}`,
    `Timeline: ${enquiry.timeline}`,
    `Additional notes: ${enquiry.additionalNotes}`,
    `Name: ${enquiry.contact.name}`,
    `Email: ${enquiry.contact.email}`,
    `Phone: ${enquiry.contact.phone}`,
    `Company: ${enquiry.contact.company}`,
    `Preferred contact: ${enquiry.contact.preferredMethod}`,
  ].join('\n'))
  window.open(`mailto:eng.cham.net@gmail.com?subject=${subject}&body=${body}`, '_blank', 'noopener,noreferrer')
}
