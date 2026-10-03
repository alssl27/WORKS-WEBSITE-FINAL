import {whatsappLink} from '@/lib/site';

export function WhatsAppButton() {
  return <a className="whatsapp-float" href={whatsappLink()} aria-label="Message ABS Properties on WhatsApp" target="_blank" rel="noopener noreferrer">
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.8L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.3-6.1-3.5-8.3Zm-8.4 18.1h-.1c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 0 1-1.5-5.2C2 6.4 6.4 2 12.1 2c2.6 0 5.1 1 7 2.9s2.9 4.3 2.9 7c0 5.4-4.5 9.7-9.9 9.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.1-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.1 3.1 1.3 3.3.2.2 2.2 3.5 5.4 4.8 2 .8 2.4.7 2.9.7.5 0 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4Z"/></svg>
    <span>WhatsApp</span>
  </a>;
}
