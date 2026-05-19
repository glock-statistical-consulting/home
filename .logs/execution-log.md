## 2026-05-19

Task:
- update datenschutz.html: section 4 Resend+Supabase, new section 5 login+fileupload, section 5-11 renumbered to 6-12, retention periods in section 9
- login hero header: "Login – Kundenbereich" → "Login – Kundenbereich – Dateiupload"
- translations.js DE+EN: ds_h2* updatet, hero_login geändert, ds_h2_new_5 added

Assumptions:
- Resend + Supabase beide DPF zertifiziert (je Herstellerangabe)
- Section 5 (Kundenbereich+Dateiupload) wird zwischen §4 und §5 eingeschoben
- Supabase Server Frankfurt (AWS) gilt auch für Storage

Files:
- home/datenschutz.html
- home/login.html
- home/translations.js
- home/client-portal/public/datenschutz.html
- home/client-portal/public/login.html
- home/client-portal/public/translations.js

Decisions:
- Saubere Umnummerierung 5→12 statt anhängen an §4
- ds_h2_new_5 als key (nicht ds_h2_5, um Konflikt mit alter Nummerierung zu vermeiden)

Risks:
- EN translations für Supabase/Resend DPF ggf. prüfbar halten

Verification:
- pushed

Status:
- complete

---

## 2026-05-19

Task:
- Fix library Stripe checkout: productKey hardcoded to `library_bundle` regardless of selected tier
- Update library prices in products.ts to match HTML modal (9→19€, 24→39€, 39→49€, 59→89€)

Assumptions:
- HTML modal prices (19/39/49/89€) are correct per user confirmation
- Fallback `library_all_access` für unbekannte tier-Werte ist akzeptabel

Files:
- home/client-portal/lib/stripe/products.ts
- home/nachhilfe.html (libConfirmPurchase)
- home/client-portal/public/nachhilfe.html (libConfirmPurchase)

Decisions:
- mapping: basics→library_basics, standard→library_standard, advanced→library_advanced, full→library_all_access
- library_bundle (4900€) in products.ts belassen für backward compat

Risks:
- products.ts Preise vorher von user bestätigt
- kein downstream-email-change nötig, metadata tier wird korrekt gesetzt

Verification:
- pushed

Status:
- complete

---

## 2026-05-19

Task:
- Copy new library download files (01_dossiers through 07_references) to production pre/ dir
- Clean up non-library artifacts (.py generators, logos, log.md)
- Create downloads_prod.ts with new filenames for later switchover

Assumptions:
- old files remain in pre/ until downloads.ts is updated → old code continues working
- new files are tier-prefixed (basic_*, standard_*, advanced_*, full_access_*) and bilingual (DE+EN)
- tiers are cumulative: basics < standard < advanced < all_access

Files:
- home/client-portal/public/downloads/library/pre/ (436 files)
- home/client-portal/lib/downloads_prod.ts

Status:
- pushed

---

## 2026-05-19 (Session 2 – pre/prod Cleanup)

Task:
- pre/prod Verzeichnisse aufgeräumt: prod/ → prod_backup/, Tier-Prefix-Dateien von pre/ nach prod/ + prod_backup/ umgezogen
- prod_backup/ alte Dateien entfernt, nur noch 259 Tier-Prefix-Dateien
- downloads_prod.ts PREFIX korrigiert: "downloads/library/prod"
- downloads.ts PREFIX unverändert: "downloads/library/pre" (Testbetrieb)

Files:
- home/client-portal/public/downloads/library/prod/ (259 neue Tier-Prefix-Dateien)
- home/client-portal/public/downloads/library/prod_backup/ (259 neue Tier-Prefix-Dateien, alte gelöscht)
- home/client-portal/public/downloads/library/pre/ (160 Dateien: 158×0KB + 2×.py ungeklärt)
- home/client-portal/lib/downloads_prod.ts (PREFIX auf prod)

Decisions:
- pre = pre-production / Testbetrieb (nur 0KB Platzhalter)
- prod = production / Live-Betrieb (echte Dateien)
- Nichts umgeschaltet – downloads.ts zeigt auf pre, downloads_prod.ts auf prod

Risks:
- 2 Python-Dateien (code_python_standard.py, code_python_advanced.py) in pre/ noch mit Inhalt – wartet auf Kevin

Verification:
- Dateizahlen verifiziert: prod=259, prod_backup=259, pre=160 (davon 158×0KB), pre_backup=172×0KB
- downloads.ts PREFIX = pre ✓
- downloads_prod.ts PREFIX = prod ✓

Status:
- complete

Status:
- complete

---

## 2026-05-19

Task:
- Bugfix: datenschutz.html §4 storage description, new §5 login+upload, renumber sections
- Fix library Stripe checkout productKey mapping + prices
- Copy new library files to production, create downloads_prod.ts

Files:
- home/datenschutz.html
- home/login.html
- home/translations.js
- home/client-portal/lib/stripe/products.ts
- home/client-portal/public/datenschutz.html
- home/client-portal/public/login.html
- home/client-portal/public/translations.js
- home/client-portal/public/nachhilfe.html
- home/nachhilfe.html
- home/client-portal/public/downloads/library/pre/ (436 files)
- home/client-portal/lib/downloads_prod.ts

Status:
- pushed
