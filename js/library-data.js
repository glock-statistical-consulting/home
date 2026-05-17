var LIBRARY_DATA = [
  {
    key: 'basics',
    name: 'Einstieg',
    nameEn: 'Basics',
    icon: 'img/badge_basic.png',
    categories: [
      {
        name: 'Spickzettel',
        nameEn: 'Cheatsheets',
        items: [
          { name: "Spickzettel Basics", nameEn: "Cheatsheet Basics", desc: "Kompaktübersicht Einstiegsniveau (DE/EN)", descEn: "Compact overview entry level (DE/EN)" },
        ]
      },
      {
        name: 'Diktionär & Entscheidungsbaum',
        nameEn: 'Dictionary & Decision Tree',
        items: [
          { name: "Entscheidungsbaum – Welcher Test?", nameEn: "Decision Tree – Which Test?", desc: "Flussdiagramm zur Testauswahl", descEn: "Flowchart for test selection" },
          { name: "Diktionär Basics", nameEn: "Dictionary Basics", desc: "DE–EN Fachbegriffe Einstieg", descEn: "DE–EN terminology entry level" },
        ]
      },
      {
        name: 'Dossiers',
        nameEn: 'Dossiers',
        items: [
          { name: "Dossier 10 – Einfache lineare Regression", nameEn: "Dossier 10 – Simple Linear Regression", desc: "Grundlagen der linearen Regression", descEn: "Fundamentals of linear regression" },
          { name: "Dossier 11 – Multiple lineare Regression", nameEn: "Dossier 11 – Multiple Linear Regression", desc: "Multiple Regressionsanalyse", descEn: "Multiple regression analysis" },
          { name: "Dossier 12 – Logistische Regression", nameEn: "Dossier 12 – Logistic Regression", desc: "Logistische Regressionsmodelle", descEn: "Logistic regression models" },
          { name: "Dossier 13 – t-Test & Gruppenvergleich", nameEn: "Dossier 13 – t-Test & Group Comparison", desc: "t-Tests und Gruppenvergleiche", descEn: "t-tests and group comparisons" },
        ]
      },
      {
        name: 'Prüfungen',
        nameEn: 'Exams',
        items: [
          { name: "Prüfung 10 – Einfache lineare Regression", nameEn: "Exam 10 – Simple Linear Regression", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 11 – Multiple lineare Regression", nameEn: "Exam 11 – Multiple Linear Regression", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 12 – Logistische Regression", nameEn: "Exam 12 – Logistic Regression", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 13 – t-Test & Gruppenvergleich", nameEn: "Exam 13 – t-Test & Group Comparison", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
        ]
      },
    ]
  },
  {
    key: 'standard',
    name: 'Standard',
    nameEn: 'Standard',
    includes: 'Alles aus Einstieg',
    includesEn: 'Everything from Basics',
    icon: 'img/badge_standard.png',
    categories: [
      {
        name: 'Spickzettel',
        nameEn: 'Cheatsheets',
        items: [
          { name: "Spickzettel Standard", nameEn: "Cheatsheet Standard", desc: "Kompaktübersicht Bachelor (DE/EN)", descEn: "Compact overview bachelor level (DE/EN)" },
        ]
      },
      {
        name: 'Diktionär',
        nameEn: 'Dictionary',
        items: [
          { name: "Diktionär Standard", nameEn: "Dictionary Standard", desc: "DE–EN Fachbegriffe Bachelor", descEn: "DE–EN terminology bachelor level" },
        ]
      },
      {
        name: 'Einführungen & Code',
        nameEn: 'Introductions & Code',
        items: [
          { name: "Einführung R (Standard)", nameEn: "Introduction to R (Standard)", desc: "R-Grundlagen", descEn: "R fundamentals" },
          { name: "Code R (Standard)", nameEn: "R Code (Standard)", desc: "R-Skripte", descEn: "R scripts" },
          { name: "Einführung Python (Standard)", nameEn: "Introduction to Python (Standard)", desc: "Python-Grundlagen", descEn: "Python fundamentals" },
          { name: "Code Python (Standard)", nameEn: "Python Code (Standard)", desc: "Python-Skripte", descEn: "Python scripts" },
          { name: "Einführung SPSS (Standard)", nameEn: "Introduction to SPSS (Standard)", desc: "SPSS-Grundlagen", descEn: "SPSS fundamentals" },
          { name: "Code SPSS (Standard)", nameEn: "SPSS Code (Standard)", desc: "SPSS-Syntax", descEn: "SPSS syntax" },
        ]
      },
      {
        name: 'Klausurfragen',
        nameEn: 'Exam Questions',
        items: [
          { name: "Klausurfragen Standard", nameEn: "Exam Questions Standard", desc: "Aufgabensammlung mit Musterlösungen", descEn: "Exercise collection with sample solutions" },
        ]
      },
      {
        name: 'Dossiers',
        nameEn: 'Dossiers',
        items: [
          { name: "Dossier 14 – ANOVA (einfaktoriell)", nameEn: "Dossier 14 – One-Way ANOVA", desc: "Einfaktorielle Varianzanalyse", descEn: "One-way analysis of variance" },
          { name: "Dossier 15 – ANOVA (ANCOVA, mehrfaktoriell)", nameEn: "Dossier 15 – ANOVA, ANCOVA, Factorial", desc: "Mehrfaktorielle Varianzanalyse", descEn: "Multi-factorial analysis of variance" },
          { name: "Dossier 16 – Nichtparametrische Tests", nameEn: "Dossier 16 – Nonparametric Tests", desc: "Rangbasierte Testverfahren", descEn: "Rank-based test procedures" },
          { name: "Dossier 17 – Chi-Quadrat-Tests", nameEn: "Dossier 17 – Chi-Square Tests", desc: "Kategoriale Datenanalyse", descEn: "Categorical data analysis" },
          { name: "Dossier 18 – Korrelation (Pearson, Spearman)", nameEn: "Dossier 18 – Correlation (Pearson, Spearman)", desc: "Korrelationsanalysen", descEn: "Correlation analysis" },
          { name: "Dossier 19 – Mehrebenenanalyse (Multilevel)", nameEn: "Dossier 19 – Multilevel Analysis", desc: "Hierarchische Datenmodelle", descEn: "Hierarchical data models" },
          { name: "Dossier 20 – Faktorenanalyse (EFA, CFA)", nameEn: "Dossier 20 – Factor Analysis (EFA, CFA)", desc: "Explorative & konfirmatorische FA", descEn: "Exploratory & confirmatory FA" },
          { name: "Dossier 21 – Bayes-Statistik", nameEn: "Dossier 21 – Bayesian Statistics", desc: "Bayessche Inferenz", descEn: "Bayesian inference" },
          { name: "Dossier 22 – Machine Learning (Supervised)", nameEn: "Dossier 22 – Supervised Learning", desc: "Überwachtes Lernen", descEn: "Supervised learning" },
          { name: "Dossier 23 – Machine Learning (Unsupervised)", nameEn: "Dossier 23 – Unsupervised Learning", desc: "Unüberwachtes Lernen", descEn: "Unsupervised learning" },
          { name: "Dossier 24 – Zeitreihenanalyse", nameEn: "Dossier 24 – Time Series Analysis", desc: "Analyse von Zeitreihendaten", descEn: "Analysis of time series data" },
          { name: "Dossier 25 – Bootstrap & Resampling", nameEn: "Dossier 25 – Bootstrap & Resampling", desc: "Resampling-Verfahren", descEn: "Resampling methods" },
          { name: "Dossier 26 – Wissenschaftstheorie", nameEn: "Dossier 26 – Philosophy of Science", desc: "Grundlagen der Wissenschaftstheorie", descEn: "Fundamentals of philosophy of science" },
          { name: "Dossier 27 – Erkenntnistheorie & Ontologie", nameEn: "Dossier 27 – Epistemology & Ontology", desc: "Philosophische Grundlagen", descEn: "Philosophical foundations" },
          { name: "Dossier 28 – Forschungsdesign (Grundlagen)", nameEn: "Dossier 28 – Research Design Basics", desc: "Studiendesigns", descEn: "Study designs" },
          { name: "Dossier 29 – Messtheorie & Operationalisierung", nameEn: "Dossier 29 – Measurement Theory & Operationalization", desc: "Messinstrumente & Skalen", descEn: "Measurement instruments & scales" },
          { name: "Dossier 30 – Stichprobenverfahren", nameEn: "Dossier 30 – Sampling Methods", desc: "Sampling-Methoden", descEn: "Sampling methods" },
          { name: "Dossier 31 – Explorative Datenanalyse", nameEn: "Dossier 31 – Exploratory Data Analysis", desc: "EDA-Techniken", descEn: "EDA techniques" },
          { name: "Dossier 32 – Qualitative Methoden (Überblick)", nameEn: "Dossier 32 – Qualitative Methods Overview", desc: "Grundlagen qualitativer Forschung", descEn: "Fundamentals of qualitative research" },
          { name: "Dossier 33 – Qualitatives Interview", nameEn: "Dossier 33 – Qualitative Interview", desc: "Interviewmethoden", descEn: "Interview methods" },
          { name: "Dossier 34 – Inhaltsanalyse (Mayring)", nameEn: "Dossier 34 – Content Analysis (Mayring)", desc: "Qualitative Inhaltsanalyse", descEn: "Qualitative content analysis" },
          { name: "Dossier 35 – Grounded Theory", nameEn: "Dossier 35 – Grounded Theory", desc: "Grounded-Theory-Methodologie", descEn: "Grounded theory methodology" },
          { name: "Dossier 36 – Diskursanalyse", nameEn: "Dossier 36 – Discourse Analysis", desc: "Diskurstheoretische Methoden", descEn: "Discourse theoretical methods" },
          { name: "Dossier 37 – Qualitative Beobachtung & Ethnographie", nameEn: "Dossier 37 – Qualitative Observation & Ethnography", desc: "Ethnographische Forschungsmethoden", descEn: "Ethnographic research methods" },
        ]
      },
      {
        name: 'Prüfungen',
        nameEn: 'Exams',
        items: [
          { name: "Prüfung 14 – ANOVA (einfaktoriell)", nameEn: "Exam 14 – One-Way ANOVA", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 15 – ANOVA (ANCOVA)", nameEn: "Exam 15 – ANOVA, ANCOVA, Factorial", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 16 – Nichtparametrische Tests", nameEn: "Exam 16 – Nonparametric Tests", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 17 – Chi-Quadrat-Tests", nameEn: "Exam 17 – Chi-Square Tests", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 18 – Korrelation", nameEn: "Exam 18 – Correlation", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 19 – Mehrebenenanalyse", nameEn: "Exam 19 – Multilevel Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 20 – Faktorenanalyse", nameEn: "Exam 20 – Factor Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 21 – Bayes-Statistik", nameEn: "Exam 21 – Bayesian Statistics", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 22 – ML (Supervised)", nameEn: "Exam 22 – Supervised Learning", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 23 – ML (Unsupervised)", nameEn: "Exam 23 – Unsupervised Learning", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 24 – Zeitreihenanalyse", nameEn: "Exam 24 – Time Series Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 25 – Bootstrap & Resampling", nameEn: "Exam 25 – Bootstrap & Resampling", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 26 – Wissenschaftstheorie", nameEn: "Exam 26 – Philosophy of Science", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 27 – Erkenntnistheorie", nameEn: "Exam 27 – Epistemology & Ontology", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 28 – Forschungsdesign", nameEn: "Exam 28 – Research Design Basics", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 29 – Messtheorie", nameEn: "Exam 29 – Measurement Theory", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 30 – Stichprobenverfahren", nameEn: "Exam 30 – Sampling Methods", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 31 – Explorative Datenanalyse", nameEn: "Exam 31 – Exploratory Data Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 32 – Qualitative Methoden", nameEn: "Exam 32 – Qualitative Methods Overview", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 33 – Qualitatives Interview", nameEn: "Exam 33 – Qualitative Interview", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 34 – Inhaltsanalyse", nameEn: "Exam 34 – Content Analysis (Mayring)", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 35 – Grounded Theory", nameEn: "Exam 35 – Grounded Theory", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 36 – Diskursanalyse", nameEn: "Exam 36 – Discourse Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 37 – Qualitative Beobachtung", nameEn: "Exam 37 – Qualitative Observation", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
        ]
      },
    ]
  },
  {
    key: 'advanced',
    name: 'Advanced',
    nameEn: 'Advanced',
    includes: 'Alles aus Standard',
    includesEn: 'Everything from Standard',
    icon: 'img/badge_advanced.png',
    categories: [
      {
        name: 'Spickzettel',
        nameEn: 'Cheatsheets',
        items: [
          { name: "Spickzettel Advanced", nameEn: "Cheatsheet Advanced", desc: "Kompaktübersicht Master (DE/EN)", descEn: "Compact overview master level (DE/EN)" },
        ]
      },
      {
        name: 'Diktionär',
        nameEn: 'Dictionary',
        items: [
          { name: "Diktionär Advanced", nameEn: "Dictionary Advanced", desc: "DE–EN Fachbegriffe Master", descEn: "DE–EN terminology master level" },
        ]
      },
      {
        name: 'Einführungen & Code',
        nameEn: 'Introductions & Code',
        items: [
          { name: "Einführung R (Advanced)", nameEn: "Introduction to R (Advanced)", desc: "R für Fortgeschrittene", descEn: "R for advanced users" },
          { name: "Code R (Advanced)", nameEn: "R Code (Advanced)", desc: "R-Skripte Master", descEn: "R scripts master" },
          { name: "Einführung Python (Advanced)", nameEn: "Introduction to Python (Advanced)", desc: "Python für Fortgeschrittene", descEn: "Python for advanced users" },
          { name: "Code Python (Advanced)", nameEn: "Python Code (Advanced)", desc: "Python-Skripte Master", descEn: "Python scripts master" },
          { name: "Einführung SPSS (Advanced)", nameEn: "Introduction to SPSS (Advanced)", desc: "SPSS für Fortgeschrittene", descEn: "SPSS for advanced users" },
          { name: "Code SPSS (Advanced)", nameEn: "SPSS Code (Advanced)", desc: "SPSS-Syntax Master", descEn: "SPSS syntax master" },
        ]
      },
      {
        name: 'Klausurfragen',
        nameEn: 'Exam Questions',
        items: [
          { name: "Klausurfragen Advanced", nameEn: "Exam Questions Advanced", desc: "Aufgabensammlung Master-Niveau", descEn: "Exercise collection master level" },
        ]
      },
      {
        name: 'Dossiers',
        nameEn: 'Dossiers',
        items: [
          { name: "Dossier 38 – Experimentelles Design", nameEn: "Dossier 38 – Experimental Design", desc: "Experimentelle Versuchspläne", descEn: "Experimental design plans" },
          { name: "Dossier 39 – Poweranalyse", nameEn: "Dossier 39 – Power Analysis", desc: "Statistische Teststärke", descEn: "Statistical power analysis" },
          { name: "Dossier 40 – Survey Design", nameEn: "Dossier 40 – Survey Design", desc: "Fragebogenkonstruktion", descEn: "Questionnaire design" },
          { name: "Dossier 41 – Mixed Methods", nameEn: "Dossier 41 – Mixed Methods", desc: "Kombination quanti. & quali. Methoden", descEn: "Combining quantitative & qualitative methods" },
          { name: "Dossier 42 – Systematic Reviews & Meta-Analyse", nameEn: "Dossier 42 – Systematic Reviews & Meta-Analysis", desc: "Evidenzsynthese", descEn: "Evidence synthesis" },
        ]
      },
      {
        name: 'Prüfungen',
        nameEn: 'Exams',
        items: [
          { name: "Prüfung 38 – Experimentelles Design", nameEn: "Exam 38 – Experimental Design", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 39 – Poweranalyse", nameEn: "Exam 39 – Power Analysis", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 40 – Survey Design", nameEn: "Exam 40 – Survey Design", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 41 – Mixed Methods", nameEn: "Exam 41 – Mixed Methods", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
          { name: "Prüfung 42 – Systematic Reviews", nameEn: "Exam 42 – Systematic Reviews", desc: "Übungsprüfung mit Lösungen (DE/EN)", descEn: "Practice exam with solutions (DE/EN)" },
        ]
      },
    ]
  },
  {
    key: 'full',
    name: 'Full Access',
    nameEn: 'Full Access',
    includes: 'Alles aus Advanced',
    includesEn: 'Everything from Advanced',
    icon: 'img/badge_full_access.png',
    categories: [
      {
        name: 'Spickzettel',
        nameEn: 'Cheatsheets',
        items: [
          { name: "Spickzettel All-Access", nameEn: "Cheatsheet All-Access", desc: "Kompaktübersicht Promotion (DE/EN)", descEn: "Compact overview PhD level (DE/EN)" },
        ]
      },
      {
        name: 'Diktionär & Literatursammlung',
        nameEn: 'Dictionary & References',
        items: [
          { name: "Diktionär All-Access", nameEn: "Dictionary All-Access", desc: "DE–EN Fachbegriffe Promotion", descEn: "DE–EN terminology PhD level" },
          { name: "Literaturverzeichnis", nameEn: "Reference List", desc: "Umfassende Literatursammlung", descEn: "Comprehensive reference collection" },
        ]
      },
      {
        name: 'EN-Versionen (Dossiers)',
        nameEn: 'English Versions (Dossiers)',
        items: [
          { name: "EN – Simple Linear Regression", nameEn: "EN – Simple Linear Regression", desc: "Englische Version Dossier 10", descEn: "English version Dossier 10" },
          { name: "EN – Multiple Linear Regression", nameEn: "EN – Multiple Linear Regression", desc: "Englische Version Dossier 11", descEn: "English version Dossier 11" },
          { name: "EN – Logistic Regression", nameEn: "EN – Logistic Regression", desc: "Englische Version Dossier 12", descEn: "English version Dossier 12" },
          { name: "EN – t-Test & Group Comparison", nameEn: "EN – t-Test & Group Comparison", desc: "Englische Version Dossier 13", descEn: "English version Dossier 13" },
          { name: "EN – One-Way ANOVA", nameEn: "EN – One-Way ANOVA", desc: "Englische Version Dossier 14", descEn: "English version Dossier 14" },
          { name: "EN – ANOVA, ANCOVA, Factorial", nameEn: "EN – ANOVA, ANCOVA, Factorial", desc: "Englische Version Dossier 15", descEn: "English version Dossier 15" },
          { name: "EN – Nonparametric Tests", nameEn: "EN – Nonparametric Tests", desc: "Englische Version Dossier 16", descEn: "English version Dossier 16" },
          { name: "EN – Chi-Square Tests", nameEn: "EN – Chi-Square Tests", desc: "Englische Version Dossier 17", descEn: "English version Dossier 17" },
          { name: "EN – Correlation (Pearson, Spearman)", nameEn: "EN – Correlation (Pearson, Spearman)", desc: "Englische Version Dossier 18", descEn: "English version Dossier 18" },
          { name: "EN – Multilevel Analysis", nameEn: "EN – Multilevel Analysis", desc: "Englische Version Dossier 19", descEn: "English version Dossier 19" },
          { name: "EN – Factor Analysis (EFA, CFA)", nameEn: "EN – Factor Analysis (EFA, CFA)", desc: "Englische Version Dossier 20", descEn: "English version Dossier 20" },
          { name: "EN – Bayesian Statistics", nameEn: "EN – Bayesian Statistics", desc: "Englische Version Dossier 21", descEn: "English version Dossier 21" },
          { name: "EN – Supervised Learning", nameEn: "EN – Supervised Learning", desc: "Englische Version Dossier 22", descEn: "English version Dossier 22" },
          { name: "EN – Unsupervised Learning", nameEn: "EN – Unsupervised Learning", desc: "Englische Version Dossier 23", descEn: "English version Dossier 23" },
          { name: "EN – Time Series Analysis", nameEn: "EN – Time Series Analysis", desc: "Englische Version Dossier 24", descEn: "English version Dossier 24" },
          { name: "EN – Bootstrap & Resampling", nameEn: "EN – Bootstrap & Resampling", desc: "Englische Version Dossier 25", descEn: "English version Dossier 25" },
          { name: "EN – Philosophy of Science", nameEn: "EN – Philosophy of Science", desc: "Englische Version Dossier 26", descEn: "English version Dossier 26" },
          { name: "EN – Epistemology & Ontology", nameEn: "EN – Epistemology & Ontology", desc: "Englische Version Dossier 27", descEn: "English version Dossier 27" },
          { name: "EN – Research Design Basics", nameEn: "EN – Research Design Basics", desc: "Englische Version Dossier 28", descEn: "English version Dossier 28" },
          { name: "EN – Measurement Theory", nameEn: "EN – Measurement Theory", desc: "Englische Version Dossier 29", descEn: "English version Dossier 29" },
          { name: "EN – Sampling Methods", nameEn: "EN – Sampling Methods", desc: "Englische Version Dossier 30", descEn: "English version Dossier 30" },
          { name: "EN – Exploratory Data Analysis", nameEn: "EN – Exploratory Data Analysis", desc: "Englische Version Dossier 31", descEn: "English version Dossier 31" },
          { name: "EN – Qualitative Methods Overview", nameEn: "EN – Qualitative Methods Overview", desc: "Englische Version Dossier 32", descEn: "English version Dossier 32" },
          { name: "EN – Qualitative Interview", nameEn: "EN – Qualitative Interview", desc: "Englische Version Dossier 33", descEn: "English version Dossier 33" },
          { name: "EN – Content Analysis (Mayring)", nameEn: "EN – Content Analysis (Mayring)", desc: "Englische Version Dossier 34", descEn: "English version Dossier 34" },
          { name: "EN – Grounded Theory", nameEn: "EN – Grounded Theory", desc: "Englische Version Dossier 35", descEn: "English version Dossier 35" },
          { name: "EN – Discourse Analysis", nameEn: "EN – Discourse Analysis", desc: "Englische Version Dossier 36", descEn: "English version Dossier 36" },
          { name: "EN – Qualitative Observation & Ethnography", nameEn: "EN – Qualitative Observation & Ethnography", desc: "Englische Version Dossier 37", descEn: "English version Dossier 37" },
          { name: "EN – Experimental Design", nameEn: "EN – Experimental Design", desc: "Englische Version Dossier 38", descEn: "English version Dossier 38" },
          { name: "EN – Power Analysis", nameEn: "EN – Power Analysis", desc: "Englische Version Dossier 39", descEn: "English version Dossier 39" },
          { name: "EN – Survey Design", nameEn: "EN – Survey Design", desc: "Englische Version Dossier 40", descEn: "English version Dossier 40" },
          { name: "EN – Mixed Methods", nameEn: "EN – Mixed Methods", desc: "Englische Version Dossier 41", descEn: "English version Dossier 41" },
          { name: "EN – Systematic Reviews & Meta-Analysis", nameEn: "EN – Systematic Reviews & Meta-Analysis", desc: "Englische Version Dossier 42", descEn: "English version Dossier 42" },
        ]
      },
    ]
  }
];

function getCurrentLang() {
  var saved = localStorage.getItem('lang');
  return saved === 'en' ? 'en' : 'de';
}

function renderMaterials() {
  var lang = getCurrentLang();
  var container = document.getElementById('materialsList');
  if (!container) return;
  var html = '';
  for (var s = 0; s < LIBRARY_DATA.length; s++) {
    var section = LIBRARY_DATA[s];
    var sectionName = lang === 'en' ? section.nameEn : section.name;
    html += '<div class="mat-section">';
    html += '<div class="mat-section-header"><img src="' + section.icon + '" alt="">' + sectionName + '</div>';
    if (section.includes) {
      var inclText = lang === 'en' ? section.includesEn : section.includes;
      html += '<div class="mat-includes">+ ' + inclText + '</div>';
    }
    for (var c = 0; c < section.categories.length; c++) {
      var cat = section.categories[c];
      var catName = lang === 'en' ? cat.nameEn : cat.name;
      html += '<div class="mat-sub-header">' + catName + '</div>';
      for (var i = 0; i < cat.items.length; i++) {
        var item = cat.items[i];
        var itemName = (lang === 'en' && item.nameEn) ? item.nameEn : item.name;
        var itemDesc = (lang === 'en' && item.descEn) ? item.descEn : item.desc;
        html += '<div class="mat-item">';
        html += '<span class="mat-item-name">' + itemName + '</span>';
        html += '<span class="mat-item-desc">' + itemDesc + '</span>';
        html += '</div>';
      }
    }
    html += '</div>';
  }
  container.innerHTML = html;
}
