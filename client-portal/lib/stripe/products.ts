export type ProductKey =
  | "library_bundle"
  | "tutoring_single"
  | "tutoring_5h"
  | "tutoring_10h"

export interface ProductConfig {
  key: ProductKey
  name: string
  description: string
  price: number
  type: "one_time" | "recurring"
  metadata?: Record<string, string>
}

export const PRODUCTS: Record<ProductKey, ProductConfig> = {
  library_bundle: {
    key: "library_bundle",
    name: "Statistics Library – Komplettzugriff",
    description: "Einmaliger Kauf mit lebenslangem Zugriff auf alle Materialien",
    price: 4900,
    type: "one_time",
    metadata: { access: "library" },
  },
  tutoring_single: {
    key: "tutoring_single",
    name: "Einzelsitzung Nachhilfe",
    description: "1 Stunde individuelle Betreuung",
    price: 4500,
    type: "one_time",
    metadata: { access: "tutoring", hours: "1" },
  },
  tutoring_5h: {
    key: "tutoring_5h",
    name: "5-Stunden Paket Nachhilfe",
    description: "5 Stunden Betreuung zum Vorzugspreis",
    price: 20250,
    type: "one_time",
    metadata: { access: "tutoring", hours: "5" },
  },
  tutoring_10h: {
    key: "tutoring_10h",
    name: "10-Stunden Paket Nachhilfe",
    description: "10 Stunden Betreuung mit maximalem Rabatt",
    price: 38250,
    type: "one_time",
    metadata: { access: "tutoring", hours: "10" },
  },
}
