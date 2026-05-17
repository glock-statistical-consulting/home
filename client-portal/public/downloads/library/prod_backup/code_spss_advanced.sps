# GSC Services — SPSS Code (advanced)
# Aus dem Einführungsdokument extrahiert

# ============================================================
# Daten bereinigen und selektieren (SELECT IF, COMPUTE)
# ============================================================

# Aufgabe
# COMPUTE berechnet neue Variable. SELECT IF filtert Zeilen.

COMPUTE z_note = (note - 3.0) / 1.2.
EXECUTE.
SELECT IF (note > 0).
EXECUTE.

# ============================================================
# Mehrfaktorielle ANOVA (UNIANOVA)
# ============================================================

# Aufgabe
# UNIANOVA = allgemeine ANOVA. POSTHOC für paarweise Vergleiche.

UNIANOVA leistung BY geschlecht bildung
  /METHOD=SSTYPE(3)
  /POSTHOC=bildung(TUKEY)
  /PRINT=DESCRIPTIVE HOMOGENEITY.

# ============================================================
# Logistische Regression (LOGISTIC REGRESSION)
# ============================================================

# Aufgabe
# LOGISTIC REGRESSION für binäre AV. CI(95) für Odds-Ratio.

LOGISTIC REGRESSION VARIABLES bestanden
  /METHOD=ENTER lerndauer
  /PRINT=SUMMARY(1) CI(95).

# ============================================================
# Reliabilitätsanalyse (RELIABILITY)
# ============================================================

# Aufgabe
# RELIABILITY berechnet Cronbachs α. SUMMARY=TOTAL zeigt 'α wenn Item gelöscht'.

RELIABILITY /VARIABLES=item1 item2 item3 item4 item5
  /SCALE('Skala') ALL
  /MODEL=ALPHA /STATISTICS=DESCRIPTIVE SCALE
  /SUMMARY=TOTAL.

# ============================================================
# Multiple lineare Regression mit Diagnostik
# ============================================================

# Aufgabe
# COLLIN TOL gibt VIF/Toleranz. SCATTERPLOT prüft Homoskedastizität. HISTOGRAM prüft Normalverteilung.

REGRESSION /STATISTICS COEFF R ANOVA COLLIN TOL
  /DEPENDENT note
  /METHOD=ENTER lerndauer motivation
  /SCATTERPLOT=(*ZRESID,*ZPRED)
  /RESIDUALS HISTOGRAM(ZRESID) NORMPROB(ZRESID).
