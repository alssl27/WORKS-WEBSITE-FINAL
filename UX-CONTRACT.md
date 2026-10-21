# ABS Properties UX Contract

This contract records observable interface behaviour. Business and launch constraints come from `README.md`, the API routes, and validation schemas.

## Navigation

- Public routes retain the global header, footer, skip link, and floating WhatsApp action.
- Grouped desktop navigation uses native disclosure behaviour; mobile navigation is opened by a labelled button and closes after navigation or Escape.
- Every route has an honest page title. Missing and runtime-error pages provide recovery actions.

## Search and calculators

- Property filters use URL query parameters as the source of truth after submission.
- Text search provides an explicit clear control that returns focus to the field.
- A no-results state explains how to broaden the search and links to alerts/contact.
- Landlord calculator inputs update locally, preserve values while switching tools, announce results, and expose inline validation guidance.

## Enquiry forms

- Forms use the shared `EnquiryForm`, app-owned validation, inline errors, a form-level error, and focus on the first invalid field.
- Submit is disabled while unavailable or sending. Success confirms only receipt, never an appointment.
- When email is not configured, the form presents phone, email, and WhatsApp alternatives.

## Admin demonstration

- Admin authentication and JSON-backed CRUD remain demonstration-only as documented in `README.md`.
- Create and edit return to the dashboard after success and preserve the form after recoverable failure.
- Delete requires an app-owned modal naming the property and consequence; failure remains recoverable in the modal.
- Image entry uses visible path and description fields rather than browser prompts.

## Accessibility and resilience

- Target WCAG 2.2 AA: semantic controls, visible focus, sufficient contrast, labelled fields, keyboard operation, and reduced-motion support.
- Native select popups are an intentional platform-owned choice for this UK demonstration.
- Global scrollbars remain visible and receive the shared application styling, with forced-colours fallback.
