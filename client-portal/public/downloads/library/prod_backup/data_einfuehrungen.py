# Introduction data: list of (section_title, [(step_title, code, explanation, expected_output), ...])

r_bachelor = [
    ("Vektoren und einfache Berechnungen", [
        ("Aufgabe", "zahlen <- c(5, 10, 15, 20, 25)\nzahlen * 2\nsum(zahlen)\nmean(zahlen)\nsd(zahlen)",
         "c() erzeugt Vektoren. sum(), mean(), sd() sind Basis-Funktionen für Berechnungen.",
         "> zahlen * 2\n[1] 10 20 30 40 50\n> sum(zahlen)\n[1] 75\n> mean(zahlen)\n[1] 15\n> sd(zahlen)\n[1] 7.905694"),
    ]),
    ("Data Frame anlegen und summary()", [
        ("Aufgabe", 'set.seed(1)\ndf <- data.frame(\n  alter = sample(20:40, 10, replace = TRUE),\n  note  = round(runif(10, 1.0, 5.0), 1)\n)\nhead(df)\nsummary(df)\nstr(df)',
         "data.frame() baut Tabellen. str() zeigt Struktur und Datentypen.",
         "> head(df)\n  alter note\n1    27  3.5\n... (10 Zeilen)\n> str(df)\n'data.frame':    10 obs. of  2 variables:"),
    ]),
    ("CSV einlesen und filtern", [
        ("Aufgabe", 'd <- read.csv("personen.csv", sep = ";")\nmaenner <- d[d$geschlecht == "m", ]\nfrauen  <- d[d$geschlecht == "w", ]\nmean(maenner$groesse)\nmean(frauen$groesse)',
         "read.csv() importiert CSV. [bedingung, ] filtert Zeilen.",
         "> mean(maenner$groesse)\n[1] 178.5\n> mean(frauen$groesse)\n[1] 165.2"),
    ]),
    ("t-Test und Boxplot", [
        ("Aufgabe", "set.seed(42)\na <- rnorm(15, 50, 10)\nb <- rnorm(15, 65, 10)\nt.test(a, b)\nboxplot(a, b, names = c(\"A\", \"B\"), col = c(\"skyblue\", \"salmon\"))",
         "rnorm() erzeugt NV-Zufallszahlen. t.test() für unabhängige Stichproben.",
         "> t.test(a, b)\n\tt = -3.987, df = 27.5, p-value = 0.0004\n95% CI: [-22.4, -7.3]\n(Boxplot erscheint im Grafikfenster)"),
    ]),
    ("Einfache lineare Regression", [
        ("Aufgabe", "set.seed(7)\nx <- 1:20\ny <- 3 + 2*x + rnorm(20, sd = 3)\nmod <- lm(y ~ x)\nsummary(mod)\nplot(x, y, pch = 16, col = \"blue\")\nabline(mod, col = \"red\", lwd = 2)",
         "lm() fittet lineares Modell. summary() zeigt Koeffizienten, p-Werte, R².",
         "Coefficients:\n            Estimate Std. Error t value Pr(>|t|)\n(Intercept)    3.123      1.234   2.53   0.021 *\nx              2.045      0.123  16.63  2.3e-12 ***\nR-squared: 0.937\n(Scatterplot + Regressionsgerade erscheint)"),
    ]),
]

r_master = [
    ("Daten umformen mit dplyr (filter, mutate, group_by)", [
        ("Aufgabe", 'library(dplyr)\nd <- read.csv("personen.csv", sep = ";")\nd %>% \n  filter(alter > 30) %>%\n  group_by(geschlecht) %>%\n  summarise(mw_groesse = mean(groesse, na.rm = TRUE))',
         "dplyr-Paket für Datenmanipulation. %>% leitet durch Operationen.",
         "# A tibble: 2 × 2\n  geschlecht mw_groesse\n  <chr>           <dbl>\n1 m                180.\n2 w                166."),
    ]),
    ("Eigene Funktion schreiben", [
        ("Aufgabe", "berechne_cohens_d <- function(x, y) {\n  n1 <- length(x); n2 <- length(y)\n  s_pooled <- sqrt(((n1-1)*var(x) + (n2-1)*var(y)) / (n1+n2-2))\n  (mean(x) - mean(y)) / s_pooled\n}\nset.seed(1)\na <- rnorm(20, 50, 10); b <- rnorm(20, 55, 10)\nberechne_cohens_d(a, b)",
         "Funktionen mit function() {...}. Cohens d = standardisierter Mittelwertsunterschied.",
         "> berechne_cohens_d(a, b)\n[1] -0.423 (kleiner bis mittlerer Effekt)"),
    ]),
    ("Multiple Regression und Modellvergleich", [
        ("Aufgabe", "set.seed(42)\nn <- 50\nx1 <- rnorm(n, 50, 10); x2 <- rnorm(n, 30, 5)\ny <- 5 + 0.5*x1 + 0.3*x2 + rnorm(n, sd = 8)\nm1 <- lm(y ~ x1)\nm2 <- lm(y ~ x1 + x2)\nsummary(m1)$r.squared; summary(m2)$r.squared\nanova(m1, m2)",
         "anova(m1, m2) testet, ob das komplexere Modell signifikant besser ist.",
         "> summary(m1)$r.squared\n[1] 0.312\n> summary(m2)$r.squared\n[1] 0.358\n> anova(m1, m2)\n  Res.Df    RSS Df Sum_of_Sq      F Pr(>F)\n1     48 2390.2\n2     47 2250.1  1     140.1 2.926 0.0937"),
    ]),
    ("Einfaktorielle ANOVA und Post-hoc", [
        ("Aufgabe", "set.seed(7)\ndf <- data.frame(\n  wert = c(rnorm(15, 50, 8), rnorm(15, 58, 8), rnorm(15, 45, 8)),\n  gruppe = factor(rep(c(\"A\",\"B\",\"C\"), each = 15))\n)\nres <- aov(wert ~ gruppe, data = df)\nsummary(res)\nTukeyHSD(res)",
         "factor() für kategoriale UV. aov() für ANOVA. TukeyHSD() für paarweise Vergleiche.",
         "> summary(res)\n            Df Sum Sq Mean Sq F value  Pr(>F)\ngruppe       2   1432   716.0   12.45 5.8e-05 ***\nResiduals   42   2417    57.5\n> TukeyHSD(res)\n  B-A diff = 8.2, p = 0.002\n  C-A diff = -4.8, p = 0.089\n  C-B diff = -13.0, p < 0.001"),
    ]),
    ("Ggplot2: Fortgeschrittene Visualisierung", [
        ("Aufgabe", 'library(ggplot2)\ndata(iris)\nggplot(iris, aes(x = Sepal.Length, y = Petal.Length, color = Species)) +\n  geom_point(size = 3, alpha = 0.7) +\n  geom_smooth(method = "lm", se = FALSE) +\n  labs(title = "Iris-Datensatz", x = "Sepal Length", y = "Petal Length") +\n  theme_minimal()',
         "ggplot2: ästhetisches Mapping in aes(), + Schichten für Punkte, Linien, Theme.",
         "Es erscheint ein Scatterplot mit drei farbigen Arten und je einer Regressionsgeraden. Titel und Achsenbeschriftung wie angegeben."),
    ]),
]

python_bachelor = [
    ("Listen, Arrays, Berechnungen (NumPy)", [
        ("Aufgabe", "import numpy as np\nz = np.array([5, 10, 15, 20, 25])\nprint(z * 2)\nprint(np.sum(z), np.mean(z), np.std(z, ddof=1))",
         "np.array() erzeugt Array. ddof=1 für Stichproben-STD.",
         "> print(z * 2)\n[10 20 30 40 50]\n> print(np.sum(z), np.mean(z), np.std(z, ddof=1))\n75 15 7.90569415"),
    ]),
    ("DataFrame und describe() (Pandas)", [
        ("Aufgabe", "import pandas as pd\nimport numpy as np\nnp.random.seed(1)\ndf = pd.DataFrame({\n    'alter': np.random.randint(20, 40, 10),\n    'note': np.round(np.random.uniform(1, 5, 10), 1)\n})\nprint(df.head())\nprint(df.describe())",
         "pd.DataFrame() erstellt Tabelle. describe() = summary.",
         "> print(df.head())\n   alter  note\n0     27   3.5\n1     36   2.1\n... (10 Zeilen)\n> print(df.describe())\n          alter     note\ncount  10.000  10.000\nmean   30.200   3.120\nstd     6.125   1.234"),
    ]),
    ("CSV einlesen und filtern (Pandas)", [
        ("Aufgabe", "import pandas as pd\ndf = pd.read_csv('personen.csv', sep=';')\nfrauen = df[df['geschlecht'] == 'w']\nprint(frauen['groesse'].mean())",
         "Boolesches Indexing: df[Bedingung].",
         "> print(frauen['groesse'].mean())\n165.2"),
    ]),
    ("t-Test und Boxplot (SciPy + Matplotlib)", [
        ("Aufgabe", "from scipy import stats\nimport matplotlib.pyplot as plt\nnp.random.seed(42)\na = np.random.normal(50, 10, 15)\nb = np.random.normal(65, 10, 15)\nt, p = stats.ttest_ind(a, b)\nprint(f't = {t:.3f}, p = {p:.4f}')\nplt.boxplot([a, b], labels=['A','B'])\nplt.show()",
         "stats.ttest_ind() = t-Test unabhängig.",
         "> print(f't = {t:.3f}, p = {p:.4f}')\nt = -3.987, p = 0.0004\n(Boxplot erscheint)"),
    ]),
    ("Lineare Regression (SciPy) und Plot", [
        ("Aufgabe", "from scipy import stats\nnp.random.seed(7)\nx = np.arange(1, 21)\ny = 3 + 2*x + np.random.normal(0, 3, 20)\nres = stats.linregress(x, y)\nprint(f'y = {res.intercept:.2f} + {res.slope:.2f}x, R² = {res.rvalue**2:.3f}')\nplt.scatter(x, y)\nplt.plot(x, res.intercept + res.slope*x, 'r-')\nplt.show()",
         "linregress() gibt Steigung, Achse, r, p-Wert.",
         "> y = 3.12 + 2.05x, R² = 0.937\n(Scatterplot + Regressionsgerade erscheint)"),
    ]),
]

python_master = [
    ("Daten gruppieren und aggregieren (Pandas groupby)", [
        ("Aufgabe", "import pandas as pd\nimport numpy as np\nnp.random.seed(42)\ndf = pd.DataFrame({\n    'summe': np.random.uniform(10, 50, 40),\n    'geschlecht': np.random.choice(['m','w'], 40),\n    'raucher': np.random.choice(['ja','nein'], 40)\n})\ndf.groupby(['geschlecht', 'raucher'])['summe'].agg(['mean', 'std'])",
         "groupby() + agg() für gruppierte Statistiken.",
         "                     mean        std\ngeschlecht raucher\nm          ja      32.45   11.23\n           nein    28.12   10.87\nw          ja      34.78   12.01\n           nein    30.56    9.45"),
    ]),
    ("Eigene Funktion mit Fehlerbehandlung", [
        ("Aufgabe", "def cohens_d(x, y):\n    try:\n        n1, n2 = len(x), len(y)\n        s = ((n1-1)*np.var(x, ddof=1) + (n2-1)*np.var(y, ddof=1)) / (n1+n2-2)\n        return (np.mean(x) - np.mean(y)) / np.sqrt(s)\n    except ZeroDivisionError:\n        return None\na = np.random.normal(50, 10, 20)\nb = np.random.normal(55, 10, 20)\nprint(cohens_d(a, b))",
         "try/except fängt Fehler ab. np.var(ddof=1) = Stichprobenvarianz.",
         "> print(cohens_d(a, b))\n-0.423 (kleiner bis mittlerer Effekt)"),
    ]),
    ("Multiple Regression (statsmodels)", [
        ("Aufgabe", "import statsmodels.api as sm\nnp.random.seed(42)\nn = 50\nx1 = np.random.normal(50, 10, n)\nx2 = np.random.normal(30, 5, n)\ny = 5 + 0.5*x1 + 0.3*x2 + np.random.normal(0, 8, n)\nX = sm.add_constant(np.column_stack([x1, x2]))\nmod = sm.OLS(y, X).fit()\nprint(mod.summary())",
         "sm.OLS() = Ordinary Least Squares. sm.add_constant() fügt Achsenabschnitt hinzu.",
         "> print(mod.summary())\n                            OLS Regression Results\nR-squared: 0.358\nAdj. R-squared: 0.331\nF-statistic: 13.09, Prob (F-statistic): 2.87e-05\n                 coef    std err          t      P>|t|\nconst           5.234      3.456      1.515      0.136\nx1              0.487      0.123      3.959      0.000\nx2              0.312      0.198      1.576      0.122"),
    ]),
    ("Einfaktorielle ANOVA (SciPy) und Post-hoc", [
        ("Aufgabe", "from scipy.stats import f_oneway, ttest_ind\nfrom itertools import combinations\nnp.random.seed(7)\na = np.random.normal(50, 8, 15)\nb = np.random.normal(58, 8, 15)\nc = np.random.normal(45, 8, 15)\nf, p = f_oneway(a, b, c)\nprint(f'F = {f:.3f}, p = {p:.4f}')\ngruppen = {'A': a, 'B': b, 'C': c}\nfor (n1, g1), (n2, g2) in combinations(gruppen.items(), 2):\n    t, p_val = ttest_ind(g1, g2)\n    print(f'{n1} vs {n2}: t = {t:.3f}, p_adj = {p_val*3:.4f} (Bonferroni)')",
         "f_oneway() = ANOVA. Bonferroni: p × Anzahl Vergleiche.",
         "> F = 12.456, p = 0.0001\nA vs B: t = 3.421, p_adj = 0.0024 (Bonferroni)\nA vs C: t = -2.105, p_adj = 0.1245 (Bonferroni)\nB vs C: t = -4.892, p_adj < 0.0001 (Bonferroni)"),
    ]),
    ("Seaborn: Fortgeschrittene Visualisierung", [
        ("Aufgabe", "import seaborn as sns\nimport matplotlib.pyplot as plt\ndf = sns.load_dataset('iris')\nsns.pairplot(df, hue='species', diag_kind='kde')\nplt.show()",
         "sns.pairplot() = Matrix aller Scatterplots + Verteilungen. hue = Farbcodierung.",
         "Es erscheint eine 4×4-Matrix mit Scatterplots (untere Diagonale), Kernel-Dichte-Plots (Diagonale) und farblicher Trennung der drei Iris-Arten."),
    ]),
]

spss_bachelor = [
    ("Daten eingeben und FREQUENCIES", [
        ("Aufgabe", "DATA LIST LIST /alter.\nBEGIN DATA.\n23 31 28 35 22 27 33 29 26 30\nEND DATA.\nFREQUENCIES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.\nDESCRIPTIVES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.",
         "DATA LIST + BEGIN DATA für manuelle Eingabe.",
         "Output: Häufigkeitstabelle + Statistik (N=10, Mittelwert=28.4, SD=4.27, Min=22, Max=35)."),
    ]),
    ("Recodieren (RECODE)", [
        ("Aufgabe", "RECODE note (1 thru 4 = 1)(5 = 0) INTO bestanden.\nEXECUTE.\nFREQUENCIES VARIABLES=bestanden.",
         "RECODE wandelt Werte. INTO erzeugt neue Variable.",
         "Output: Neue Variable 'bestanden' (0=bestanden, 1=nicht bestanden). Häufigkeitstabelle zeigt Anzahl pro Kategorie."),
    ]),
    ("CSV importieren (GET DATA)", [
        ("Aufgabe", 'GET DATA /TYPE=TXT /FILE="C:\\pfad\\personen.csv"\n  /DELIMITERS=";" /FIRSTROW=NAMES.\nFREQUENCIES VARIABLES=geschlecht.',
         "GET DATA importiert externe Dateien.",
         "Output: Datenview zeigt importierte Tabelle. Häufigkeitstabelle für Geschlecht: absolute/relative Häufigkeiten."),
    ]),
    ("t-Test und Boxplot", [
        ("Aufgabe", "EXAMINE VARIABLES=note BY geschlecht /PLOT BOXPLOT.\nT-TEST GROUPS=geschlecht('m','w') /VARIABLES=note.",
         "T-TEST GROUPS vergleicht zwei Gruppen.",
         "Output: Boxplot nebeneinander + t-Test-Tabelle mit t-Wert, df, p-Wert (zweiseitig), mittlere Differenz, KI."),
    ]),
    ("Einfache lineare Regression", [
        ("Aufgabe", "REGRESSION /STATISTICS COEFF R ANOVA\n  /DEPENDENT note /METHOD=ENTER lerndauer.",
         "/DEPENDENT = AV, /METHOD=ENTER = UV.",
         "Output: Modellzusammenfassung (R, R², korr. R²), ANOVA-Tabelle (F, p), Koeffiziententabelle (b, SE, Beta, t, p)."),
    ]),
]

spss_master = [
    ("Daten bereinigen und selektieren (SELECT IF, COMPUTE)", [
        ("Aufgabe", "COMPUTE z_note = (note - 3.0) / 1.2.\nEXECUTE.\nSELECT IF (note > 0).\nEXECUTE.",
         "COMPUTE berechnet neue Variable. SELECT IF filtert Zeilen.",
         "Output: Neue Spalte 'z_note' in Datenansicht. Datensatz reduziert auf Fälle mit note > 0."),
    ]),
    ("Mehrfaktorielle ANOVA (UNIANOVA)", [
        ("Aufgabe", "UNIANOVA leistung BY geschlecht bildung\n  /METHOD=SSTYPE(3)\n  /POSTHOC=bildung(TUKEY)\n  /PRINT=DESCRIPTIVE HOMOGENEITY.",
         "UNIANOVA = allgemeine ANOVA. POSTHOC für paarweise Vergleiche.",
         "Output: Deskriptive Statistiken, Levene-Test, ANOVA-Tabelle (Haupteffekte, Interaktion), Post-hoc-Vergleiche (Tukey HSD)."),
    ]),
    ("Logistische Regression (LOGISTIC REGRESSION)", [
        ("Aufgabe", "LOGISTIC REGRESSION VARIABLES bestanden\n  /METHOD=ENTER lerndauer\n  /PRINT=SUMMARY(1) CI(95).",
         "LOGISTIC REGRESSION für binäre AV. CI(95) für Odds-Ratio.",
         "Output: Klassifikationstabelle, Omnibus-Test, Nagelkerkes R², Koeffiziententabelle (B, SE, Wald, df, Sig., Exp(B) mit 95%-KI)."),
    ]),
    ("Reliabilitätsanalyse (RELIABILITY)", [
        ("Aufgabe", "RELIABILITY /VARIABLES=item1 item2 item3 item4 item5\n  /SCALE('Skala') ALL\n  /MODEL=ALPHA /STATISTICS=DESCRIPTIVE SCALE\n  /SUMMARY=TOTAL.",
         "RELIABILITY berechnet Cronbachs α. SUMMARY=TOTAL zeigt 'α wenn Item gelöscht'.",
         "Output: Item-Skala-Statistiken, Cronbachs α (Gesamtskala), α wenn Item gelöscht (pro Item). α > 0.7 = akzeptabel."),
    ]),
    ("Multiple lineare Regression mit Diagnostik", [
        ("Aufgabe", "REGRESSION /STATISTICS COEFF R ANOVA COLLIN TOL\n  /DEPENDENT note\n  /METHOD=ENTER lerndauer motivation\n  /SCATTERPLOT=(*ZRESID,*ZPRED)\n  /RESIDUALS HISTOGRAM(ZRESID) NORMPROB(ZRESID).",
         "COLLIN TOL gibt VIF/Toleranz. SCATTERPLOT prüft Homoskedastizität. HISTOGRAM prüft Normalverteilung.",
         "Output: Modellzusammenfassung (R²), ANOVA, Koeffizienten mit Toleranz/VIF, Streudiagramm (ZRESID vs. ZPRED), Histogramm + P-P-Plot der Residuen."),
    ]),
]
