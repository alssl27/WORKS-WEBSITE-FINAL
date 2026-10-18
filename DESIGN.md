---
version: alpha
name: "ABS Properties"
description: "A confident, local Oldham property brand combining photographic storytelling with calm, trustworthy utility."
colors:
  primary: "#071B36"
  accent: "#A50016"
  accent-hover: "#870012"
  text: "#071B36"
  muted: "#53657E"
  border: "#DCE2E9"
  surface: "#FFFFFF"
  surface-muted: "#F7F8FA"
  focus: "#DA9419"
typography:
  sans:
    fontFamily: "var(--font-geist), Segoe UI, Arial, sans-serif"
    lineHeight: "1.6"
  display:
    fontFamily: "var(--font-geist), Segoe UI, Arial, sans-serif"
    lineHeight: "1.05"
rounded:
  DEFAULT: "0.5rem"
  sm: "0.375rem"
  md: "0.625rem"
  lg: "0.875rem"
spacing:
  section-gap: "4.75rem"
  page-max: "85rem"
components:
  button: {}
  card: {}
  input: {}
  navigation: {}
  dialog: {}
---

# ABS Properties Design System

## Overview

### Creative North Star

The interface should feel like an established independent estate agent’s well-kept office: confident navy signage, precise red wayfinding, generous natural photography, and clear paperwork. It serves buyers, renters, sellers, landlords, and staff in Oldham and Greater Manchester.

### Product context and register

- **Audience and primary job:** Local customers must quickly find a property or request help; staff use a compact demonstration admin to manage listings.
- **Target market and locale:** UK property services, evidenced by the repository content, GBP amounts, Oldham locations, and `en-GB` document locale.
- **Usage scene:** Public pages span mobile property browsing and desktop research; admin is a low-frequency desktop-first demonstration tool.
- **Register:** Hybrid. Public routes lead with brand imagery; search, calculators, forms, property details, and admin prioritise familiar product behaviour.
- **Memorable signature:** Deep navy photographic hero panels with restrained red actions.
- **Restraint:** Forms, calculators, legal content, property facts, and admin controls remain quiet and highly legible.
- **Anti-references:** Avoid generic luxury-estate gold styling, glassmorphism, excessive pills, decorative motion, or invented social proof.
- **Token ownership/runtime mapping:** This file mirrors the canonical runtime tokens in `app/redesign.css` and shared interaction rules in `app/public-pages.css`. System-level changes must update both.

## Colors

Navy is the trust and structure colour; red is reserved for primary actions, active wayfinding, and destructive intent. White and cool grey surfaces keep property data readable. Muted text is never used for critical instructions. Focus uses amber so it stays visible on navy, red, and white surfaces.

## Typography

Geist is loaded once through `next/font` and used for display, body, controls, and data. Headings use 650–720 weight with tight spacing; body copy uses regular weight and comfortable line height. Navigation uses modest uppercase tracking. Prices and calculator outputs retain tabular clarity through consistent numeric formatting.

## Layout

Public content uses a maximum width of 1360px and responsive gutters. Sections follow a spacious editorial rhythm, while forms use compact two-column grids that collapse to one column. The principal breakpoints are 820px for navigation and 560px for narrow-phone refinements. Media always reserves its final aspect or container height.

## Elevation & Depth

Hierarchy comes primarily from tone, borders, and spacing. Cards receive only a restrained hover lift; dialogs use stronger elevation because they interrupt the workflow. Static information panels do not use heavy shadows.

## Shapes

Controls and content cards use 6–14px radii. Floating WhatsApp is the only pill-shaped action. Red underlines provide active navigation state; borders remain one pixel except deliberate focus and selected-image treatments.

## Components

### Foundational visual states

All interactive controls require visible hover, focus-visible, active, disabled, and busy states. Errors appear beside the field and as a form-level summary where needed. Reduced-motion preferences remove transitions and animations.

### Buttons and actions

Red solid buttons are the primary action, navy/white outlines are secondary, and text buttons are tertiary. Destructive actions use explicit red language and an app-owned confirmation dialog. Busy labels must not change control width unexpectedly.

### Navigation and data display

The public header uses four grouped disclosures plus the valuation CTA. Mobile navigation stacks groups without hiding child links. Property cards expose the full card content without hover dependence. Admin rows collapse to a readable vertical layout on narrow screens.

### Forms and overlays

Labels are always visible or available to assistive technology. Validation is app-owned with `noValidate`, inline errors, and first-error focus. Native selects are intentional because platform popup behaviour is acceptable for this UK demonstration. Textareas do not resize. Dialogs use native modal semantics, Escape dismissal, named headings, and safe viewport bounds.

### Iconography

Use simple text-supported symbols only where they improve scanning. Never rely on an icon alone for a business-critical action.

### Motion

Motion is limited to 150–200ms hover/focus feedback and subtle card lift. No scroll-triggered decoration. All motion is removed under `prefers-reduced-motion`.

### Content and data visualization

Use plain UK English, active labels, GBP formatting, and explicit qualifiers for estimates. Do not imply automated alerts, guaranteed returns, confirmed appointments, or verified testimonials without evidence.

## Do's and Don'ts

- **Do:** Keep brand imagery expressive while making tasks and property facts conventional and easy to scan.
- **Do:** Reuse shared buttons, fields, status, and modal behaviour across public and admin routes.
- **Don't:** Use listing photographs as generic page backgrounds.
- **Don't:** invent testimonials, guarantees, legal claims, or decorative interactions that weaken trust.
