# GSC Services — SPSS Code (standard)
# Extracted from the introductory document

# ============================================================
# Enter data and FREQUENCIES\n# ============================================================

# Task\n# DATA LIST + BEGIN DATA for manual entry.\n
DATA LIST LIST /alter.
BEGIN DATA.
23 31 28 35 22 27 33 29 26 30
END DATA.
FREQUENCIES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.
DESCRIPTIVES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.

# ============================================================
# Recodieren (RECODE)
# ============================================================

# Task\n# RECODE transforms values. INTO creates new variable.\n
RECODE note (1 thru 4 = 1)(5 = 0) INTO bestanden.
EXECUTE.
FREQUENCIES VARIABLES=bestanden.

# ============================================================
# CSV importieren (GET DATA)
# ============================================================

# Task\n# GET DATA importiert externe Dateien.

GET DATA /TYPE=TXT /FILE="C:\pfad\personen.csv"
  /DELIMITERS=";" /FIRSTROW=NAMES.
FREQUENCIES VARIABLES=geschlecht.

# ============================================================
# t-test and box plot\n# ============================================================

# Task\n# T-TEST GROUPS vergleicht zwei Gruppen.

EXAMINE VARIABLES=note BY geschlecht /PLOT BOXPLOT.
T-TEST GROUPS=geschlecht('m','w') /VARIABLES=note.

# ============================================================
# Simple linear regression\n# ============================================================

# Task\n# /DEPENDENT = AV, /METHOD=ENTER = UV.

REGRESSION /STATISTICS COEFF R ANOVA
  /DEPENDENT note /METHOD=ENTER lerndauer.
