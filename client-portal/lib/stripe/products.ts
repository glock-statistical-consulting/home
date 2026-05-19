export type ProductKey =
  | "library_bundle"
  | "library_basics"
  | "library_standard"
  | "library_advanced"
  | "library_all_access"
  | "tutoring_single"
  | "tutoring_5h"
  | "tutoring_10h"

export interface ProductConfig {
  key: ProductKey
  name: string
  description: string
  nameEn?: string
  descriptionEn?: string
  price: number
  type: "one_time" | "recurring"
  metadata?: Record<string, string>
}

export const PRODUCTS: Record<ProductKey, ProductConfig> = {
  library_bundle: {
    key: "library_bundle",
    name: "Statistics Library – Komplettzugriff",
    description: "Einmaliger Kauf mit lebenslangem Zugriff auf alle Materialien",
    nameEn: "Statistics Library – Full Access",
    descriptionEn: "One-time purchase with lifetime access to all materials",
    price: 4900,
    type: "one_time",
    metadata: { access: "library" },
  },
  library_basics: {
    key: "library_basics",
    name: "Statistics Library – Basics",
    description: "Entscheidungsbaum, Diktionär Abi, Dossiers 10–13, Prüfungen 10–13",
    nameEn: "Statistics Library – Basics",
    descriptionEn: "Decision tree, dictionary Abi, dossiers 10–13, exams 10–13",
    price: 1900,
    type: "one_time",
    metadata: { access: "library", tier: "basics" },
  },
  library_standard: {
    key: "library_standard",
    name: "Statistics Library – Standard",
    description: "Basics + Bachelor-Diktionär, Code-Einführungen, Dossiers 10–37, alle Prüfungen",
    nameEn: "Statistics Library – Standard",
    descriptionEn: "Basics + bachelor dictionary, code introductions, dossiers 10–37, all exams",
    price: 3900,
    type: "one_time",
    metadata: { access: "library", tier: "standard" },
  },
  library_advanced: {
    key: "library_advanced",
    name: "Statistics Library – Advanced",
    description: "Standard + Master-Diktionär, Master-Code, Dossiers 38–42, Klausurkonstruktionen",
    nameEn: "Statistics Library – Advanced",
    descriptionEn: "Standard + master dictionary, master code, dossiers 38–42, exam constructions",
    price: 4900,
    type: "one_time",
    metadata: { access: "library", tier: "advanced" },
  },
  library_all_access: {
    key: "library_all_access",
    name: "Statistics Library – All-Access",
    description: "Alle Materialien inkl. PhD, EN-Versionen & Literaturverzeichnis",
    nameEn: "Statistics Library – All-Access",
    descriptionEn: "All materials incl. PhD, EN versions & bibliography",
    price: 8900,
    type: "one_time",
    metadata: { access: "library", tier: "all_access" },
  },
  tutoring_single: {
    key: "tutoring_single",
    name: "Einzelsitzung Nachhilfe",
    description: "1 Stunde individuelle Betreuung",
    nameEn: "Single Tutoring Session",
    descriptionEn: "1 hour individual support",
    price: 4500,
    type: "one_time",
    metadata: { access: "tutoring", hours: "1" },
  },
  tutoring_5h: {
    key: "tutoring_5h",
    name: "5-Stunden Paket Nachhilfe",
    description: "5 Stunden Betreuung zum Vorzugspreis",
    nameEn: "5-Hour Tutoring Package",
    descriptionEn: "5 hours of support at a reduced rate",
    price: 20250,
    type: "one_time",
    metadata: { access: "tutoring", hours: "5" },
  },
  tutoring_10h: {
    key: "tutoring_10h",
    name: "10-Stunden Paket Nachhilfe",
    description: "10 Stunden Betreuung mit maximalem Rabatt",
    nameEn: "10-Hour Tutoring Package",
    descriptionEn: "10 hours of support at the best rate",
    price: 38250,
    type: "one_time",
    metadata: { access: "tutoring", hours: "10" },
  },
}
