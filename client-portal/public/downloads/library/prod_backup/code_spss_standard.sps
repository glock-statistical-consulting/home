# GSC Services — SPSS Code (standard)
# Aus dem Einführungsdokument extrahiert

# ============================================================
# Daten eingeben und FREQUENCIES
# ============================================================

# Aufgabe
# DATA LIST + BEGIN DATA für manuelle Eingabe.

DATA LIST LIST /alter.
BEGIN DATA.
23 31 28 35 22 27 33 29 26 30
END DATA.
FREQUENCIES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.
DESCRIPTIVES VARIABLES=alter /STATISTICS=MEAN STDDEV MIN MAX.

# ============================================================
# Recodieren (RECODE)
# ============================================================

# Aufgabe
# RECODE wandelt Werte. INTO erzeugt neue Variable.

RECODE note (1 thru 4 = 1)(5 = 0) INTO bestanden.
EXECUTE.
FREQUENCIES VARIABLES=bestanden.

# ============================================================
# CSV importieren (GET DATA)
# ============================================================

# Aufgabe
# GET DATA importiert externe Dateien.

GET DATA /TYPE=TXT /FILE="C:\pfad\personen.csv"
  /DELIMITERS=";" /FIRSTROW=NAMES.
FREQUENCIES VARIABLES=geschlecht.

# ============================================================
# t-Test und Boxplot
# ============================================================

# Aufgabe
# T-TEST GROUPS vergleicht zwei Gruppen.

EXAMINE VARIABLES=note BY geschlecht /PLOT BOXPLOT.
T-TEST GROUPS=geschlecht('m','w') /VARIABLES=note.

# ============================================================
# Einfache lineare Regression
# ============================================================

# Aufgabe
# /DEPENDENT = AV, /METHOD=ENTER = UV.

REGRESSION /STATISTICS COEFF R ANOVA
  /DEPENDENT note /METHOD=ENTER lerndauer.
