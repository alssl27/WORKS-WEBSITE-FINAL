# ABS Properties website

The website is a fresh, responsive Next.js project. You edit the property information and add your own property photographs in VS Code. Public property cards are created only from records that pass the publishing checks.

## Open the project

1. Install **Node.js 22.18 or later** on your computer. Check with `node --version` in VS Code’s terminal.
2. Open this folder in VS Code: `abs-properties`.
3. Open **Terminal → New Terminal**.
4. Run `npm.cmd ci` and wait until it finishes.
5. Copy `.env.example` to `.env.local` in the same folder. The copy works for previewing without any passwords.
6. Run `npm.cmd run dev`.
7. Open `http://localhost:3000` in your browser. Leave the terminal running while you view the site.

Press `Ctrl+C` in the terminal to stop the local preview.

## Changes restored for your new laptop

- Abbeyhills Road, Oldham: published rental house, 3 bedrooms, 1 bathroom, £1,200 pcm, unfurnished, available from October 2026.
- Property page at http://localhost:3000/properties/abs-001.
- Carousel with Previous/Next, a photo counter, thumbnails, keyboard arrows and enlarged view.
- Office number 0161 284 0644 and mobile/WhatsApp 07773 754121.
- Windows commands use npm.cmd to avoid the PowerShell script-policy error.

Abbeyhills gallery photographs are stored in `public/images/` and linked from the property record. The restore script preserves existing gallery entries and can be run with `npm.cmd run restore:photos` if photographs are copied from a backup.

The Abbeyhills property uses postcode OL8 2DH, has a £1,200 deposit and Council Tax band A. The EPC rating is shown as “Ask agent”; availability is from October 2026 with the exact date to be confirmed. Any other edits made only on an old laptop need to be copied from that laptop or its backup.

## Edit the 14 property records

Open `data/properties.json`. It contains 10 residential rental records, 3 commercial records and 1 sales record. Abbeyhills Road is the approved published listing; the other records remain unpublished drafts. Drafts and fictional examples are excluded from production. Fill in verified details and save changes before publishing another record.

Put original, authorised property photographs in `public/images/`. Use short names made from letters, numbers, underscores or hyphens, for example `kelverlow_street_lounge.jpg`. Then add each photograph to the record’s `images` list:

```json
"images": [
  { "src": "/images/kelverlow_street_lounge.jpg", "alt": "Lounge viewed from the entrance" },
  { "src": "/images/kelverlow_street_kitchen.jpg", "alt": "Fitted kitchen" }
]
```

Write accurate, specific alt text. Do not use the illustrative branding image as property photography. Set `published` to `true` only after you have checked the price, real photos, availability, postcode, description and material information. Use `status: "Available"` only when the property can accept enquiries. Possible values are `Available`, `Let agreed`, `Sold STC` and `Draft`. `priceUnit` must be `pcm`, `purchase` or `pa`.

To check the records, run `npm.cmd run check:properties`. Missing images, duplicate identifiers and invalid details will be reported in the terminal. Do not add fictional properties to `data/properties.json`; examples belong in `data/examples.json` and only appear in local development previews.

## What's included

- Responsive homepage and service pages for lettings, management, sales, commercial property and investments.
- Property search filters, property details, photographs, material information and print-friendly particulars.
- Landlord valuation requests, general enquiries, property viewing requests and property-alert registration.
- WhatsApp, phone, email and map links. Social links are omitted until ABS supplies its real profile addresses.
- Oldham, Chadderton and Royton area guides linked to council, Bee Network and NHS sources.
- Privacy, cookies and accessibility information; sitemap; basic search metadata; keyboard focus styles.
- A local-demo staff administration workflow at `/admin/login`, with a protected dashboard and add/edit/delete listing tools. It uses the JSON data file for local demonstrations and is not a production authentication or database solution.
- An email API route with server-side input validation, size limits, same-origin checks, a spam honeypot, development rate limits, production Turnstile verification and provider-confirmed success. The Resend idempotency key prevents duplicate mail retries.

## Set up email before enabling forms

Forms remain disabled until email is configured. They will not pretend to submit successfully. For launch, ABS must select an email provider account and verify the company’s sending domain. Add the sender address, provider API key and recipient email address to `.env.local`. Use `.env.example` as the field list and never commit `.env.local` or paste keys into chat.

Before production form submission is enabled, also create a Cloudflare Turnstile widget for the final website domain and set its public site key and server secret in the deployment environment. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS site address. Check email delivery from the deployed website, including reply-to, spam-folder handling and alert consent records.

Property-alert registrations are emailed to the office; staff match listings and send relevant alerts. There is no database, account or automated matching service in this launch build. Do not describe alerts as automatic or allow enquiries to confirm viewings without staff confirmation.

## Verify the website

```text
npm.cmd run typecheck
npm.cmd test
npm.cmd run check:properties
npm.cmd run build
```

The API route accepts only same-origin JSON requests. In production, set a correct website URL and Turnstile credentials. Email delivery needs valid credentials and a verified sending domain. This project does not store website enquiries in a database.

## Deploy with Vercel

1. Import this project into the ABS Properties Vercel account.
2. Use the default Next.js build settings. The build command is `npm run build`.
3. Add these environment variables to the Vercel Production environment:
   - `NEXT_PUBLIC_SITE_URL=https://www.absproperties.uk`
   - `SHOW_DEMO_LISTINGS=false`
   - `RESEND_API_KEY`
   - `ENQUIRY_FROM`
   - `ENQUIRY_TO=info@abs-properties.co.uk`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
4. Add `www.absproperties.uk` and the root domain in Vercel, then follow the DNS records Vercel provides.
5. Verify the domain in Resend and create the Cloudflare Turnstile widget for the final production hostname.
6. Redeploy after adding the environment variables, then test the homepage, property search, brochure download and enquiry fallback links.

Keep API keys and Turnstile secrets in Vercel environment variables only. Do not commit them to `.env.local` or the repository.

## Launch work that still needs ABS details

Before publishing, replace the illustrative home image and complete each listing with approved photographs and verified information; review the privacy notice, cookie statement and service descriptions; confirm the legal business identity and email handling; configure domain hosting, email delivery, Turnstile and analytics only if needed; test real forms and mobile layouts; and agree the production domain/DNS changes. The later staff login and authorised Zoopla connection remain a separate phase as agreed.

The source code does not itself publish to `www.absproperties.uk`. Connect the finished project to an authorised hosting account and configure the domain when the company account and launch credentials are available.

## Local admin demonstration

The demo admin is available at `http://localhost:3000/admin/login`. Configure
`ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env.local`
before using it. The example file contains non-production defaults for a quick
local walkthrough; replace them with local-only values. Listing changes are
written to `data/properties.json` so they persist during the demo, but this
file-backed workflow must be replaced with a managed database and production
identity provider before deployment.
