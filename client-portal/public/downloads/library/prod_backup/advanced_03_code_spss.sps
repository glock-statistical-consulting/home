# GSC Services — SPSS Code (advanced)
# Extracted from the introductory document

# ============================================================
# Clean and select data (SELECT IF, COMPUTE)\n# ============================================================

# Task\n# COMPUTE calculates new variable. SELECT IF filters rows.\n
COMPUTE z_note = (note - 3.0) / 1.2.
EXECUTE.
SELECT IF (note > 0).
EXECUTE.

# ============================================================
# Mehrfaktorielle ANOVA (UNIANOVA)
# ============================================================

# Task\n# UNIANOVA = general ANOVA. POSTHOC for pairwise comparisons.\n
UNIANOVA leistung BY geschlecht bildung
  /METHOD=SSTYPE(3)
  /POSTHOC=bildung(TUKEY)
  /PRINT=DESCRIPTIVE HOMOGENEITY.

# ============================================================
# Logistic regression (LOGISTIC REGRESSION)\n# ============================================================

# Task\n# LOGISTIC REGRESSION for binary AV. CI(95) for odds ratio.\n
LOGISTIC REGRESSION VARIABLES bestanden
  /METHOD=ENTER lerndauer
  /PRINT=SUMMARY(1) CI(95).

# ============================================================
# Reliability analysis (RELIABILITY)\n# ============================================================

# Task\n# RELIABILITY calculates Cronbach's α. SUMMARY=TOTAL shows 'α if item deleted'.\n
RELIABILITY /VARIABLES=item1 item2 item3 item4 item5
  /SCALE('Skala') ALL
  /MODEL=ALPHA /STATISTICS=DESCRIPTIVE SCALE
  /SUMMARY=TOTAL.

# ============================================================
# Multiple linear regression with diagnostics\n# ============================================================

# Task\n# COLLIN TOL gives VIF/tolerance. SCATTERPLOT tests homoscedasticity. HISTOGRAM checks normal distribution.\n
REGRESSION /STATISTICS COEFF R ANOVA COLLIN TOL
  /DEPENDENT note
  /METHOD=ENTER lerndauer motivation
  /SCATTERPLOT=(*ZRESID,*ZPRED)
  /RESIDUALS HISTOGRAM(ZRESID) NORMPROB(ZRESID).
