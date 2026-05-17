# Klausur data: (nummer, frage, loesung, typ, teil, punkte)

bachelor_fragen = [
    (1, "Welches Skalenniveau hat die Variable 'Studienfach' (z.B. BWL, Medizin, Jura)?\n"
        "a) Intervallskala  b) Ordinalskala  c) Nominalskala  d) Ratioskala",
        "c) Nominalskala – Kategorien ohne Reihenfolge.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (2, "Der p-Wert eines Hypothesentests beträgt 0.03 bei α = 0.05. Was folgt?\n"
        "a) H₀ wird beibehalten  b) H₁ wird abgelehnt  c) H₀ wird abgelehnt  d) α muss erhöht werden",
        "c) H₀ wird abgelehnt, da p (0.03) < α (0.05).", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (3, "Welche Aussage zur Standardnormalverteilung N(0,1) ist richtig?\n"
        "a) Sie ist schief  b) μ = 0, σ = 1  c) μ = 1, σ = 0  d) Sie hat keine Dichtefunktion",
        "b) μ = 0, σ = 1.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (4, "Was beschreibt der Zentrale Grenzwertsatz (ZGS)?\n"
        "a) Der Median ist immer normalverteilt  b) Die Varianz einer Stichprobe ist immer 1\n"
        "c) Der Stichprobenmittelwert ist für große n approximativ normalverteilt  d) Die Summe aller p-Werte ist 1",
        "c) Der Stichprobenmittelwert ist für großes n approximativ normalverteilt.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (5, "Ein t-Test für unabhängige Stichproben prüft:\n"
        "a) Die Varianzgleichheit zweier Gruppen  b) Den Unterschied der Mittelwerte zweier unabhängiger Gruppen\n"
        "c) Den Zusammenhang zweier Variablen  d) Die Normalverteilung der Daten",
        "b) Unterschied der Mittelwerte zweier unabhängiger Gruppen.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (6, "Ein Chi-Quadrat-Unabhängigkeitstest wird eingesetzt für:\n"
        "a) Zwei metrische Variablen  b) Eine metrische und eine kategoriale Variable\n"
        "c) Zwei kategoriale Variablen  d) Eine Variable und eine Konstante",
        "c) Zwei kategoriale Variablen.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (7, "Was bedeutet R² = 0.64 in einer einfachen linearen Regression?\n"
        "a) 64% der Varianz von y werden durch x erklärt  b) 64% der Fehler sind normalverteilt\n"
        "c) Die Korrelation ist r = 0.64  d) 64% der Daten sind Ausreißer",
        "a) 64% der Varianz von y werden durch x erklärt.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (8, "Welche Verteilung modelliert die Anzahl seltener Ereignisse in einem festen Intervall?\n"
        "a) Normalverteilung  b) Binomialverteilung  c) Poisson-Verteilung  d) Gleichverteilung",
        "c) Poisson-Verteilung.", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (9, "Ein 95%-Konfidenzintervall für den Mittelwert enthält die 0. Was bedeutet das?\n"
        "a) Der Mittelwert ist 0  b) Der p-Wert des t-Tests ist > 0.05  c) H₀ wird abgelehnt  d) α = 0.01",
        "b) Der p-Wert des t-Tests ist > 0.05 (da 0 im KI, ist H₀ nicht ablehnbar).", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (10, "Cohens d = 0.8 bedeutet:\n"
        "a) Kleiner Effekt  b) Mittlerer Effekt  c) Großer Effekt  d) Kein Effekt",
        "c) Großer Effekt (nach Cohen: 0.2 klein, 0.5 mittel, 0.8 groß).", "MC", "Teil 1 – Multiple Choice (10 Fragen)", 1),
    
    (11, "Erklären Sie kurz den Unterschied zwischen deskriptiver und induktiver Statistik.",
        "Deskriptive Statistik beschreibt Daten durch Kennzahlen/Grafiken. Induktive Statistik zieht Schlüsse von der Stichprobe auf die Population (Schätzen, Testen).", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 2),
    
    (12, "Nennen Sie drei Voraussetzungen für einen t-Test bei unabhängigen Stichproben.",
        "1) Normalverteilung der AV in beiden Gruppen, 2) Varianzhomogenität (geprüft mit F-Test/Levene), 3) Unabhängigkeit der Beobachtungen.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 2),
    
    (13, "Was ist der Unterschied zwischen einer Punktschätzung und einer Intervallschätzung?",
        "Punktschätzung: ein einzelner Wert (z.B. x̄ = 5.2). Intervallschätzung: ein Bereich mit Vertrauensniveau (z.B. KI: [4.8, 5.6] zu 95%). Das KI gibt zusätzlich die Unsicherheit der Schätzung an.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 2),
    
    (14, "Was besagt der Satz von Bayes? Geben Sie die Formel an und erklären Sie die Komponenten.",
        "P(A|B) = P(B|A) · P(A) / P(B). P(A|B) = posteriori WS, P(A) = a priori WS, P(B|A) = Likelihood, P(B) = totale WS.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 2),
    
    (15, "Interpretieren Sie eine Korrelation von r = −0.72 zwischen Lernzeit und Fehleranzahl.",
        "Starker negativer Zusammenhang: je mehr Lernzeit, desto weniger Fehler. r² = 0.52 → 52% gemeinsame Varianz.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 2),
    
    (16, "Eine Stichprobe (n = 25) hat einen Mittelwert von x̄ = 52 und eine Standardabweichung von s = 10. "
        "Testen Sie auf dem 5%-Niveau, ob der wahre Mittelwert μ von 50 abweicht. (Hinweis: t-Test, t(24; 0.975) ≈ 2.064)",
        "t = (52 − 50) / (10 / √25) = 2 / 2 = 1.0. t(24) = 1.0 < 2.064 → H₀ wird nicht abgelehnt. Kein signifikanter Unterschied zu μ = 50.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 5),
    
    (17, "In einer Umfrage geben 120 von 200 Personen an, mit dem Service zufrieden zu sein. "
        "Berechnen Sie den relativen Anteil zufriedener Kunden. "
        "Ermitteln Sie das 95%-Konfidenzintervall für den Anteil p (approximativ). (z₀.₉₇₅ = 1.96)",
        "p̂ = 120/200 = 0.6. KI: p̂ ± 1.96 · √(p̂(1 − p̂)/n) = 0.6 ± 1.96 · √(0.6·0.4/200) = 0.6 ± 1.96 · 0.0346 = 0.6 ± 0.0679 → [0.532, 0.668]. Der wahre Anteil liegt mit 95% WS zwischen 53.2% und 66.8%.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 5),
    
    (18, "Eine einfache lineare Regression ergibt ŷ = 12.3 + 2.4 · x (R² = 0.81). Interpretieren Sie: "
        "a) Die Steigung b = 2.4  b) Das Bestimmtheitsmaß R²  c) Vorhersage für x = 10",
        "a) Steigt x um 1 Einheit, steigt ŷ um 2.4 Einheiten. b) 81% der Varianz von y wird durch x erklärt. c) ŷ = 12.3 + 2.4 · 10 = 12.3 + 24 = 36.3.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 5),
]

master_fragen = [
    (1, "Welches Verfahren prüft den Effekt mehrerer UVs auf eine metrische AV bei gleichzeitiger Kontrolle einer Kovariate?\n"
        "a) MANOVA  b) ANCOVA  c) Logistische Regression  d) Multiple Regression",
        "b) ANCOVA – ANOVA mit Kovariate.", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (2, "Wann verwendet man einen Mann-Whitney-U-Test statt eines t-Tests?\n"
        "a) Bei normalverteilten Daten  b) Bei Verletzung der Normalverteilungsannahme bei unabhängigen Gruppen\n"
        "c) Bei verbundenen Stichproben  d) Wenn die Varianzen gleich sind",
        "b) Bei Verletzung der Normalverteilungsannahme bei unabhängigen Gruppen (nichtparam. Alternative).", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (3, "Die explorative Faktorenanalyse (EFA) dient dazu:\n"
        "a) Vorhersagen zu treffen  b) Gruppenunterschiede zu prüfen  c) Dimensionsreduktion und Strukturentdeckung  d) Kausale Effekte zu schätzen",
        "c) Dimensionsreduktion und Strukturentdeckung.", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (4, "Ein Interaktionseffekt in einer zweifaktoriellen ANOVA bedeutet:\n"
        "a) Beide Haupteffekte sind signifikant  b) Die Wirkung von Faktor A hängt von Faktor B ab\n"
        "c) Es gibt keine Haupteffekte  d) Die Varianzen sind homogen",
        "b) Die Wirkung von Faktor A hängt von Faktor B ab.", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (5, "Welche Methode wird verwendet, wenn die AV binär ist (0/1)?\n"
        "a) Lineare Regression  b) Logistische Regression  c) ANOVA  d) Faktorenanalyse",
        "b) Logistische Regression.", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (6, "Cronbachs α = 0.82 bedeutet:\n"
        "a) Die Validität ist gut  b) Die interne Konsistenz (Reliabilität) ist akzeptabel (≥ 0.7)\n"
        "c) Das Messinstrument misst nicht das Gewünschte  d) Die Stichprobe ist zu klein",
        "b) Die interne Konsistenz (Reliabilität) ist akzeptabel (≥ 0.7).", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (7, "Die statistische Power (Teststärke) ist definiert als:\n"
        "a) 1 − α  b) 1 − β  c) 1 − p  d) 1 − σ",
        "b) 1 − β (Wahrscheinlichkeit, einen tatsächlichen Effekt zu entdecken).", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (8, "Was ist ein zentrales Ziel einer Poweranalyse (a priori)?\n"
        "a) Die Effektstärke aus Daten berechnen  b) Die benötigte Stichprobengröße vor der Studie bestimmen\n"
        "c) Den p-Wert maximieren  d) Die Reliabilität prüfen",
        "b) Die benötigte Stichprobengröße vor der Studie bestimmen.", "MC", "Teil 1 – Multiple Choice (8 Fragen)", 1),
    
    (9, "Erklären Sie den Unterschied zwischen einer einfachen ANOVA und einer MANOVA.",
        "ANOVA: Eine metrische AV, Gruppenvergleich. MANOVA: Mehrere metrische AVs gleichzeitig, prüft Unterschiede in Mittelwertsvektoren. MANOVA berücksichtigt Korrelationen zwischen AVs.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 3),
    
    (10, "Beschreiben Sie kurz das Prinzip der multiplen linearen Regression. Wozu dient das korrigierte R²?",
        "y = a + b₁x₁ + b₂x₂ + ... + ε. Mehrere Prädiktoren sagen die AV vorher. Korrigiertes R² bestraft die Aufnahme zusätzlicher Prädiktoren und verhindert Überschätzung des R² durch bloße Variablenanzahl.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 3),
    
    (11, "Was ist der Unterschied zwischen Moderation und Mediation?",
        "Moderation: Die Stärke/Richtung des UV→AV-Effekts hängt von einer dritten Variable (Moderator) ab. Mediation: Eine dritte Variable (Mediator) erklärt den Mechanismus, wie UV auf AV wirkt (indirekter Effekt).", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 3),
    
    (12, "Wozu dienen Post-hoc-Tests nach einer signifikanten ANOVA? Nennen Sie zwei Beispiele.",
        "Post-hoc-Tests führen paarweise Gruppenvergleiche durch, um zu bestimmen, welche Gruppen sich unterscheiden. Beispiele: Tukey's HSD (für alle Paare), Bonferroni-Korrektur (konservativ).", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 3),
    
    (13, "Erklären Sie das Konzept der Dummy-Kodierung in der Regression. Wozu wird sie benötigt?",
        "Kategoriale Prädiktoren (z.B. Studienfach mit 3 Kategorien) werden in 0/1-Variablen umgewandelt. Eine Kategorie dient als Referenz. Die Koeffizienten geben den Unterschied zur Referenz an.", "Offene Frage", "Teil 2 – Offene Fragen (5 Fragen)", 3),
    
    (14, "Eine multiple Regression mit 3 Prädiktoren ergibt R² = 0.45 bei n = 100. Berechnen Sie das korrigierte R². "
        "Interpretieren Sie das Ergebnis. (Formel: R²_adj = 1 − ((1 − R²)(n − 1) / (n − k − 1)))",
        "R²_adj = 1 − ((1 − 0.45)(99) / (96)) = 1 − (0.55 · 99 / 96) = 1 − (54.45 / 96) = 1 − 0.567 = 0.433. "
        "Das korrigierte R² = 0.433 liegt nur geringfügig unter R² = 0.45, die Prädiktoren tragen also tatsächlich zur Varianzaufklärung bei.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 6),
    
    (15, "Sie planen eine Studie mit 3 Gruppen (ANOVA, erwarteter mittlerer Effekt f = 0.25, α = 0.05, Power = 0.80). "
        "Mit G*Power ergibt sich eine Gesamtstichprobengröße von N ≈ 159. Interpretieren Sie: "
        "a) Was bedeutet Power = 0.80? b) Was passiert bei f = 0.15?",
        "a) Power = 0.80: Mit 80% WS wird ein tatsächlich vorhandener Effekt dieser Größe entdeckt. β = 0.20 (20% Risiko für Fehler 2. Art). "
        "b) Bei f = 0.15 (kleiner Effekt) steigt die benötigte N deutlich (ca. 322+). Kleinere Effekte benötigen größere Stichproben.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 6),
    
    (16, "Sie führen eine logistische Regression durch. Der Koeffizient für den Prädiktor X ist b = 0.85 (p = 0.003). "
        "Berechnen Sie das Odds-Ratio und interpretieren Sie es.",
        "OR = e^0.85 = 2.34. Mit jeder Einheit von X steigen die Odds für Y = 1 um den Faktor 2.34 (134% Anstieg). "
        "Da p = 0.003 < 0.05, ist der Effekt statistisch signifikant.", "Anwendungsaufgabe", "Teil 3 – Anwendungsaufgaben (3 Aufgaben)", 6),
]
