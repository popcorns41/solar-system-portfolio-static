export const contact = {
  id: 'panel-0',
  type: 'contact',
  title: 'Contact Me',
  links: [
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/oliver-hill-7143b3110/' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/popcorns41' },
  ],
  fields: [
    { name: 'user_name', type: 'text', label: 'Your Name' },
    { name: 'user_email', type: 'email', label: 'Your Email' },
    { name: 'message', type: 'textarea', label: 'Your Message' },
  ],
  submitLabel: 'Send Message',
};
