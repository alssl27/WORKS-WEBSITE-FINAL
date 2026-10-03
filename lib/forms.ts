import 'server-only';
export function formsEnabled(){return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM && process.env.ENQUIRY_TO && (process.env.NODE_ENV!=='production'||(process.env.TURNSTILE_SECRET_KEY&&process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)))}
