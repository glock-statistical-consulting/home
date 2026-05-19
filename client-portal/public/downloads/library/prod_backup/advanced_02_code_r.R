# GSC Services — R Code (advanced)
# Extracted from the introductory document

# ============================================================
# Transform data with dplyr (filter, mutate, group_by)\n# ============================================================

# Task\n# dplyr package for data manipulation. %>% routes through operations.

library(dplyr)
d <- read.csv("personen.csv", sep = ";")
d %>% 
  filter(alter > 30) %>%
  group_by(geschlecht) %>%
  summarise(mw_groesse = mean(groesse, na.rm = TRUE))

# ============================================================
# Write your own function\n# ============================================================

# Task\n# Functions with function() {...}. Cohen's d = standardized mean difference.\n
berechne_cohens_d <- function(x, y) {
  n1 <- length(x); n2 <- length(y)
  s_pooled <- sqrt(((n1-1)*var(x) + (n2-1)*var(y)) / (n1+n2-2))
  (mean(x) - mean(y)) / s_pooled
}
set.seed(1)
a <- rnorm(20, 50, 10); b <- rnorm(20, 55, 10)
berechne_cohens_d(a, b)

# ============================================================
# Multiple regression and model comparison\n# ============================================================

# Task\n# anova(m1, m2) tests whether the more complex model is significantly better.

set.seed(42)
n <- 50
x1 <- rnorm(n, 50, 10); x2 <- rnorm(n, 30, 5)
y <- 5 + 0.5*x1 + 0.3*x2 + rnorm(n, sd = 8)
m1 <- lm(y ~ x1)
m2 <- lm(y ~ x1 + x2)
summary(m1)$r.squared; summary(m2)$r.squared
anova(m1, m2)

# ============================================================
# One-factor ANOVA and post hoc\n# ============================================================

# Task\n# factor() for categorical UV. aov() for ANOVA. TukeyHSD() for pairwise comparisons.\n
set.seed(7)
df <- data.frame(
  wert = c(rnorm(15, 50, 8), rnorm(15, 58, 8), rnorm(15, 45, 8)),
  gruppe = factor(rep(c("A","B","C"), each = 15))
)
res <- aov(wert ~ gruppe, data = df)
summary(res)
TukeyHSD(res)

# ============================================================
# Ggplot2: Fortgeschrittene Visualisierung
# ============================================================

# Task\n# ggplot2: aesthetic mapping in aes(), + layers for points, lines, theme.\n
library(ggplot2)
data(iris)
ggplot(iris, aes(x = Sepal.Length, y = Petal.Length, color = Species)) +
  geom_point(size = 3, alpha = 0.7) +
  geom_smooth(method = "lm", se = FALSE) +
  labs(title = "Iris-Datensatz", x = "Sepal Length", y = "Petal Length") +
  theme_minimal()
