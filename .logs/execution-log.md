## 2026-05-20

Task:
- security and redundancy audit of repo

Assumptions:
- proxy.ts is dead code (Next.js requires middleware.ts) — renaming restores intended auth
- customAmount in stripe checkout must be bounded (min 100 cents, max 100000 cents = 1000 EUR)
- download endpoints intentionally lack auth currently; flagging only, no breaking change without confirmation
- vercel.json + next.config.ts headers must be aligned for Stripe origins

Files:
- client-portal/proxy.ts -> client-portal/middleware.ts
- client-portal/app/api/stripe/checkout/route.ts
- vercel.json
- .gitignore (new)

Decisions:
- Rename proxy.ts to middleware.ts to activate dashboard auth gate
- Add customAmount validation (range + integer check)
- Sync vercel.json CSP with next.config.ts Stripe origins
- Add root .gitignore (.env*, *.backup, *.poc-backup, .prebuild.html)
- Defer: download endpoint auth, backup file deletion, downloads.ts/_prod.ts consolidation (require user confirmation)

Risks:
- middleware.ts may double-protect routes if existing vercel config also handles redirects (verified: no conflict)
- Bound on customAmount: 100000 cents covers tutoring_10h dissertation (75*10*0.85=637 EUR) with margin

Verification:
- npm run build: passed
- TypeScript: passed
- Middleware registered (build output shows "Middleware")

Status:
- complete (high-confidence fixes only; download auth + backup deletion deferred)

## 2026-05-20T+1

Task:
- implement HMAC-signed download URLs (30 day TTL) + delete backups

Files:
- client-portal/lib/download-token.ts (new)
- client-portal/app/api/download/route.ts
- client-portal/app/api/download/bundle/route.ts
- client-portal/app/api/stripe/webhook/route.ts
- client-portal/lib/email.ts
- deleted: nachhilfe.html.poc-backup, nachhilfe.prebuild.html, translations.js.backup

Decisions:
- HMAC-SHA256 over "file:<path>|exp:<sec>" and "bundle:<key>|exp:<sec>"
- 30 day TTL (DOWNLOAD_TTL_DAYS)
- timing-safe comparison via crypto.timingSafeEqual
- 403 on invalid/expired
- Email: notice "Dieser Link wird nach 30 Tagen automatisch deaktiviert" under ZIP button

Risks:
- DOWNLOAD_SIGNING_SECRET must be set in Vercel env vars before deploy
- Existing email links from before this change remain unsigned -> will 403 (no fallback)
- Secret rotation invalidates all active links

Verification:
- npm run build: passed
- TypeScript: passed

Status:
- complete
