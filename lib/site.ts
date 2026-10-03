export const site = {
  name: 'ABS Properties',
  email: 'info@abs-properties.co.uk',
  phone: '0161 284 0644',
  phoneHref: 'tel:+441612840644',
  mobile: '07773 754121',
  mobileHref: 'tel:+447773754121',
  whatsapp: '447773754121',
  address: 'Unit 1a, Belgrave Industrial Estate, Honeywell Ln, Oldham OL8 2JP',
  hours: 'Monday–Friday, 9am–5pm. Saturday and Sunday closed.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  social: { linkedin: '', facebook: '', instagram: '' },
};
export function whatsappLink(message = 'Hello ABS Properties, I would like to discuss your property services.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
