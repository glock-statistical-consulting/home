# GSC Services — R Code (standard)
# Extracted from the introductory document

# ============================================================
# Vectors and simple calculations\n# ============================================================

# Task\n# c() creates vectors. sum(), mean(), sd() are basic functions for calculations.

zahlen <- c(5, 10, 15, 20, 25)
zahlen * 2
sum(zahlen)
mean(zahlen)
sd(zahlen)

# ============================================================
# Create data frame and summary()\n# ============================================================

# Task\n# data.frame() builds tables. str() shows structure and data types.\n
set.seed(1)
df <- data.frame(
  alter = sample(20:40, 10, replace = TRUE),
  note  = round(runif(10, 1.0, 5.0), 1)
)
head(df)
summary(df)
str(df)

# ============================================================
# Read and filter CSV\n# ============================================================

# Task\n# read.csv() importiert CSV. [bedingung, ] filtert Zeilen.

d <- read.csv("personen.csv", sep = ";")
maenner <- d[d$geschlecht == "m", ]
frauen  <- d[d$geschlecht == "w", ]
mean(maenner$groesse)
mean(frauen$groesse)

# ============================================================
# t-test and box plot\n# ============================================================

# Task\n# rnorm() generates NV random numbers. t.test() for independent samples.\n
set.seed(42)
a <- rnorm(15, 50, 10)
b <- rnorm(15, 65, 10)
t.test(a, b)
boxplot(a, b, names = c("A", "B"), col = c("skyblue", "salmon"))

# ============================================================
# Simple linear regression\n# ============================================================

# Task\n# lm() fits linear model. summary() shows coefficients, p-values, R².\n
set.seed(7)
x <- 1:20
y <- 3 + 2*x + rnorm(20, sd = 3)
mod <- lm(y ~ x)
summary(mod)
plot(x, y, pch = 16, col = "blue")
abline(mod, col = "red", lwd = 2)
