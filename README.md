# Alexanders Career Strategy — Executive Search & Headhunting Website

Independent executive search and headhunting consultancy website serving the United States market.

- **Brand Name:** Alexanders Career Strategy
- **Tagline:** “Executive Search. Exceptional Talent. Strategic Impact.”
- **Authoritative Colour System:**
  - Forest Green: `#123D2B`
  - Deep Green: `#0B2A1E`
  - Rich Black: `#101311`
  - Gold Accent: `#C6A15B`
  - Light Gold: `#E0C98B`
  - Warm White: `#F7F7F2`

---

## 1. Local Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and configure environment variables as needed:
   ```bash
   cp .env.example .env
   ```
3. Run unit tests (form validations, vacancy expiry rules, and email sanitization):
   ```bash
   npx --yes tsx --test src/utils/validation.test.ts
   ```
4. Start the full-stack development server on port 3000:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

---

## 2. How to Edit Dynamic Content (`src/data/siteContent.ts` & Content Studio)

All brand configuration, page copy, team profiles, insights articles, functional expertise cards, and job listings are centralized in:
- **`src/data/siteContent.ts`** (source-of-truth code configuration)
- **Interactive Content & Launch Readiness Studio** (accessible via the footer button *"Content & Launch Readiness Studio"* for live browser inspection and testing)

### Team Member Portraits (`public/images/team/`)
To display real portraits for the five team members, place their actual WebP photographs at:
- `public/images/team/alexander-divine.webp`
- `public/images/team/paul-alexander.webp`
- `public/images/team/piers-fisher.webp`
- `public/images/team/fred-geerken.webp`
- `public/images/team/eunice-angelo.webp`

Then set `photoSuppliedByOwner: true` on the corresponding record in `src/data/siteContent.ts` (or toggle it in the Content Studio). All supplied portraits display plainly and unblurred immediately with zero click-to-reveal behavior. Until an actual photo file is provided, a neutral monogram placeholder is displayed.

### Approved Public Team Contacts (Section 22)
- **Alexander Divine:** `alexander.divine.hr@gmail.com` | X: `https://x.com/Divinecareers` | Facebook: `https://www.facebook.com/share/1MBZjCZnLH/`
- **Paul Alexander:** `paulpatog@gmail.com`
- **Piers Fisher:** `pier.fisher.hr@gmail.com`
- **Fred Geerken:** LinkedIn: `https://www.linkedin.com/in/fred-g-geerken-2a92b25/`
- **Eunice Angelo:** No public email or social link supplied.

*(Superseded email addresses `divinecareerstrategy@gmail.com`, `piersfishersearch@gmail.com`, and `piersfisherexecutivesearch@gmail.com` are automatically blocked by `sanitizePublicTeamEmail` in `src/utils/validation.ts`.)*

---

## 3. Environment Variables & Production Launch Configuration

Before launching publicly on Netlify or Cloud Run, configure the following environment variables in your hosting dashboard:

| Variable | Purpose |
| :--- | :--- |
| `SITE_URL` | Canonical public URL (e.g. `https://www.alexanderscareerstrategy.com` or verified `.netlify.app` URL) |
| `SUPABASE_URL` | Supabase project URL for persistent enquiry metadata and private CV bucket |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase Service Role key (never expose to client code) |
| `SUPABASE_CV_BUCKET` | Name of restricted private Supabase Storage bucket for candidate CVs |
| `RESEND_API_KEY` | Server-only Resend API key for transactional email delivery |
| `EMAIL_FROM` | Verified sender email address in Resend |
| `EMPLOYER_NOTIFICATION_EMAIL` | Destination inbox for employer hiring enquiries and general contact submissions |
| `CANDIDATE_NOTIFICATION_EMAIL` | Destination inbox for candidate CV registrations and internal career interest submissions |

### Local Server Private Vault Fallback
When `SUPABASE_URL` or `RESEND_API_KEY` are not yet set in the environment, `server.ts` validates all submissions server-side and stores submission metadata and uploaded CV files in `.private_storage/` (with `0600` restricted permissions outside the public web directory) so no CV is ever exposed via a public URL.
