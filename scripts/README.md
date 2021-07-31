# onquadro_statistics.R.R
 onquadro_statistics.R.R script connects with the database and generates plots for [statistics](http://onquadro.cs.put.poznan.pl/statistics) page.


# Requirements
-   devtools 2.3.2
-   remotes 2.2.0
-   RPostgres 1.3.0
-   pandoc 1.19.2.4
-   plotly 4.9.3
-   ggplot2 3.3.3
-   DBI 1.1.0

## Installation
```R
install.package(‘devtools’)
install.package(‘remotes’)
install.package(‘ggplot2’)
install.package(‘DBI’)
install.package(‘plotly’)
sudo apt-get install pandoc=1.19.2.4~dfsg-1build4
remotes::install_github(“r-dbi/RPOstgres”)
install.packages(‘RPostgres’)
```

# How to Run
```r
Rscript onquadro_statistics.R
```
# How to find output plots

Plots are in ```app/wwwroot/onquadro_plots/``` folder.
