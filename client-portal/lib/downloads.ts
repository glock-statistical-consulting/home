export interface DownloadItem {
  name: string
  description: string
  fileUrl: string
  fileSize?: string
}

export const DOWNLOADS: Record<string, DownloadItem[]> = {
  library_bundle: [
    {
      name: "Statistik Grundlagen PDF",
      description: "Deskriptive Statistik, Wahrscheinlichkeitsrechnung, Hypothesentests",
      fileUrl: "/downloads/library/statistik-grundlagen.pdf",
    },
    {
      name: "SPSS Einführung",
      description: "Schritt-für-Schritt Anleitung für SPSS",
      fileUrl: "/downloads/library/spss-einfuehrung.pdf",
    },
    {
      name: "R Einführung",
      description: "Grundlagen der statistischen Programmierung mit R",
      fileUrl: "/downloads/library/r-einfuehrung.pdf",
    },
    {
      name: "Python Einführung",
      description: "Data Science Grundlagen mit Python",
      fileUrl: "/downloads/library/python-einfuehrung.pdf",
    },
    {
      name: "Übungsaufgaben mit Lösungen",
      description: "Aufgaben zu Regression, t-Test, ANOVA & mehr",
      fileUrl: "/downloads/library/uebungsaufgaben.pdf",
    },
  ],
}

export function getDownloads(productKey: string): DownloadItem[] {
  return DOWNLOADS[productKey] || []
}
