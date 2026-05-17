# GSC Services — R Code (standard)
# Aus dem Einführungsdokument extrahiert

# ============================================================
# Vektoren und einfache Berechnungen
# ============================================================

# Aufgabe
# c() erzeugt Vektoren. sum(), mean(), sd() sind Basis-Funktionen für Berechnungen.

zahlen <- c(5, 10, 15, 20, 25)
zahlen * 2
sum(zahlen)
mean(zahlen)
sd(zahlen)

# ============================================================
# Data Frame anlegen und summary()
# ============================================================

# Aufgabe
# data.frame() baut Tabellen. str() zeigt Struktur und Datentypen.

set.seed(1)
df <- data.frame(
  alter = sample(20:40, 10, replace = TRUE),
  note  = round(runif(10, 1.0, 5.0), 1)
)
head(df)
summary(df)
str(df)

# ============================================================
# CSV einlesen und filtern
# ============================================================

# Aufgabe
# read.csv() importiert CSV. [bedingung, ] filtert Zeilen.

d <- read.csv("personen.csv", sep = ";")
maenner <- d[d$geschlecht == "m", ]
frauen  <- d[d$geschlecht == "w", ]
mean(maenner$groesse)
mean(frauen$groesse)

# ============================================================
# t-Test und Boxplot
# ============================================================

# Aufgabe
# rnorm() erzeugt NV-Zufallszahlen. t.test() für unabhängige Stichproben.

set.seed(42)
a <- rnorm(15, 50, 10)
b <- rnorm(15, 65, 10)
t.test(a, b)
boxplot(a, b, names = c("A", "B"), col = c("skyblue", "salmon"))

# ============================================================
# Einfache lineare Regression
# ============================================================

# Aufgabe
# lm() fittet lineares Modell. summary() zeigt Koeffizienten, p-Werte, R².

set.seed(7)
x <- 1:20
y <- 3 + 2*x + rnorm(20, sd = 3)
mod <- lm(y ~ x)
summary(mod)
plot(x, y, pch = 16, col = "blue")
abline(mod, col = "red", lwd = 2)
