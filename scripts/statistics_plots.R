# LOAD LIBRARIES
library(plotly)
library(ggplot2)
library(RPostgres)
library(DBI)

# SET PATH
setwd('app/wwroot/onquadro_plots/')

# FUNCTION FOR DATA PREPARATION
prepere_data_for_plot.function <- function(table) {

  # DELETE TOTAL COLUMN
  table <- table[1:ncol(table)-1]
  
  # LABEL
  table_columns = colnames(table[2:ncol(table)])
  labels <- rep(c(table[,1][1:nrow(table)-1]),times=ncol(table)-1) 
  labels <- c(table_columns, labels)

  # ID
  ids <- c()
  ids = c(colnames(table[2:ncol(table)]))
  
  for(i in 2:ncol(table))
  {
    ids <- append(ids, c(paste(table[,1][1:nrow(table)-1],colnames(table[i]),sep="_")))
  }
  
  # PARENTS
  parents <- rep(c(""), times=3)
  for (i in 1:ncol(table)-1) {
    parents <- append(parents, rep(c(table_columns[i]), times=nrow(table)-1))
  }
  
  #VALUES
  values <- c()
  for(i in 2:ncol(table)){
    values <-append(values, c(table[nrow(table),i]))
  }
  
  for (i in 2:ncol(table)) {
    values <- append(values, c(table[,i][1:nrow(table)-1]))
  }
  
  # REMOVE VALUES = 0
  zeros_index <-  which(0 == values)
  cleaned_values <- values[values != 0]
  cleaned_ids <- ids
  cleaned_labels <- labels
  cleaned_parents <- parents
  for(i in zeros_index){
    cleaned_ids[i] = 0
    cleaned_labels[i] = 0
    cleaned_parents[i] = 0
  }
  cleaned_ids <- cleaned_ids[cleaned_ids != 0]
  cleaned_labels <- cleaned_labels[cleaned_labels != 0]
  cleaned_parents <- cleaned_parents[cleaned_parents != 0]
  
  # DATA FOR PLOT
  plot_data <- data.frame(cleaned_ids, cleaned_labels, cleaned_parents, cleaned_values, stringsAsFactors = FALSE)
  
  return(plot_data)
}

# DATABASE CONNECTION
db <- ''  #provide the name of your db
host_db <- '' #i.e. # i.e. 'ec2-54-83-201-96.compute-1.amazonaws.com'  
db_port <- ''  # or any other port specified by the DBA
db_user <- ''
db_password <- ''
con <- dbConnect(RPostgres::Postgres(), dbname = db, host=host_db, port=db_port, user=db_user, password=db_password) 

# ALL QUERIES 
Query_number_of_tetrads_by_sequence_and_molecule_type <- 
        "SELECT sequence,
        SUM(CASE tv.molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
        SUM(CASE tv.molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
        SUM(CASE tv.molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
        COUNT(*) AS Total
        FROM tetrad_view tv
        JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
        WHERE qv.count > 1
        GROUP BY sequence
        UNION ALL
        SELECT 'Total',
        SUM(CASE tv.molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
        SUM(CASE tv.molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
        SUM(CASE tv.molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
        COUNT(*) AS Total
        FROM tetrad_view tv
        JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
        WHERE qv.count > 1;"

Query_number_of_quadruplexes_composed_of_2_12_tetrads <- 
        "SELECT CAST(count AS text) AS NumberOfTetrads,
        SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
        SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
        SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
        COUNT(*) AS Total
        FROM quadruplex_view
        GROUP BY count
        UNION ALL
        SELECT 'Total',
        SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
        SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
        SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
        COUNT(*) AS Total
        FROM quadruplex_view;"

Query_number_of_uni_bi_and_tetramolecular_quadruplexes <- 
        "SELECT CAST(chains AS text),
	SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
	SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
	SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
	COUNT(*) AS Total
	FROM quadruplex_view
	GROUP BY chains
	UNION ALL
	SELECT 'Total',
	SUM(CASE molecule WHEN 'DNA' THEN 1 ELSE 0 END) AS DNA,
	SUM(CASE molecule WHEN 'RNA' THEN 1 ELSE 0 END) AS RNA,
	SUM(CASE molecule WHEN 'Other' THEN 1 ELSE 0 END) AS Other,
	COUNT(*) AS Total
	FROM quadruplex_view;"

Query_ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad <-
        "SELECT CAST(onz AS text),
        SUM(CASE tv.chains WHEN 1 THEN 1 ELSE 0 END) AS Unimolecular,
        SUM(CASE tv.chains WHEN 2 THEN 1 ELSE 0 END) AS Bimolecular,
        SUM(CASE tv.chains WHEN 4 THEN 1 ELSE 0 END) AS Tetramolecular,
        COUNT(*) AS Total
        FROM tetrad_view tv
        JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
        WHERE qv.count > 1
        GROUP BY onz
        UNION ALL
        SELECT 'Total',
        SUM(CASE tv.chains WHEN 1 THEN 1 ELSE 0 END) AS Unimolecular,
        SUM(CASE tv.chains WHEN 2 THEN 1 ELSE 0 END) AS Bimolecular,
        SUM(CASE tv.chains WHEN 4 THEN 1 ELSE 0 END) AS Tetramolecular,
        COUNT(*) AS Total
        FROM tetrad_view tv
        JOIN quadruplex_view qv on tv.quadruplex_id = qv.id
        WHERE qv.count > 1;"

Query_ONZM_class_coverage_by_unimolecular_quadruplexes <- 
        "SELECT CAST(onzm AS text),
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 1
        GROUP BY onzm
        UNION ALL
        SELECT 'Total',
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 1;"

Query_ONZM_class_coverage_by_bimolecular_quadruplexes <- 
        "SELECT CAST(onzm AS text),
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 2
        GROUP BY onzm
        UNION ALL
        SELECT 'Total',
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 2;"

Query_ONZM_class_coverage_by_tetramolecular_quadruplexes <- 
        "SELECT CAST(onzm AS text),
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 4
        GROUP BY onzm
        UNION ALL
        SELECT 'Total',
        SUM(CASE subtype WHEN '+' THEN 1 ELSE 0 END) AS Plus,
        SUM(CASE subtype WHEN '-' THEN 1 ELSE 0 END) AS Minus,
        SUM(CASE subtype WHEN '*' THEN 1 ELSE 0 END) AS Star,
        COUNT(*) AS Total
        FROM quadruplex_view
        WHERE chains = 4;"
        

# PREPERE DATA AND GENERATE PLOTS

#  number_of_tetrads_by_sequence_and_molecule_type
table <- dbGetQuery(con, Query_number_of_tetrads_by_sequence_and_molecule_type)
number_of_tetrads_by_sequence_and_molecule_type <- prepere_data_for_plot.function(table)

number_of_tetrads_by_sequence_and_molecule_type$cleaned_labels <- toupper(number_of_tetrads_by_sequence_and_molecule_type$cleaned_labels)
p <- plot_ly(number_of_tetrads_by_sequence_and_molecule_type, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = number_of_tetrads_by_sequence_and_molecule_type$colors)
htmlwidgets::saveWidget(p, file = "number_of_tetrads_by_sequence_and_molecule_type.html")


# number_of_quadruplexes_composed_of_2_12_tetrads
table <- dbGetQuery(con, Query_number_of_quadruplexes_composed_of_2_12_tetrads)
number_of_quadruplexes_composed_of_2_12_tetrads <- prepere_data_for_plot.function(table)

labels <- number_of_quadruplexes_composed_of_2_12_tetrads$cleaned_labels
labels_tmp <- toupper(labels)
for(i in 4:length(labels))
{
  labels_tmp[i] <- paste(labels_tmp[i],"tetrads",sep=" ")
}
number_of_quadruplexes_composed_of_2_12_tetrads$cleaned_labels = labels_tmp
p <- plot_ly(number_of_quadruplexes_composed_of_2_12_tetrads, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = number_of_quadruplexes_composed_of_2_12_tetrads$colors)
htmlwidgets::saveWidget(p, file = "number_of_quadruplexes_composed_of_2_12_tetrads.html")


# number_of_uni_bi_and_tetramolecular_quadruplexes
table <- dbGetQuery(con, Query_number_of_uni_bi_and_tetramolecular_quadruplexes)
number_of_uni_bi_and_tetramolecular_quadruplexes <- prepere_data_for_plot.function(table)

labels <- number_of_uni_bi_and_tetramolecular_quadruplexes$cleaned_labels
labels_tmp <- toupper(labels)
for(i in 4:length(labels))
{
  if(labels_tmp[i] == 1) 
    labels_tmp[i] <- "unimolecular"
  else if(labels_tmp[i] == 2) 
    labels_tmp[i] <- "bimolecular"
  else if(labels_tmp[i] == 4)
    labels_tmp[i] <- "tetramolecular"
  
}
number_of_uni_bi_and_tetramolecular_quadruplexes$cleaned_labels = labels_tmp
p <- plot_ly(number_of_uni_bi_and_tetramolecular_quadruplexes, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = number_of_uni_bi_and_tetramolecular_quadruplexes$colors)
htmlwidgets::saveWidget(p, file = "number_of_uni_bi_and_tetramolecular_quadruplexes.html")


# ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad
table <- dbGetQuery(con, Query_ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad)
ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad <- prepere_data_for_plot.function(table)
p <- plot_ly(ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad$colors)
htmlwidgets::saveWidget(p, file = "ONZ_class_coverage_by_uni_bi_and_tetramolecular_tetrad.html")


# ONZM_class_coverage_by_unimolecular_quadruplexes
table <- dbGetQuery(con, Query_ONZM_class_coverage_by_unimolecular_quadruplexes)
ONZM_class_coverage_by_unimolecular_quadruplexes <- prepere_data_for_plot.function(table)

labels <- ONZM_class_coverage_by_unimolecular_quadruplexes$cleaned_labels
labels_tmp <- labels
for(i in 1:length(labels))
{
  if(labels_tmp[i] =="star") 
    labels_tmp[i] <- 'star (*)'
  else if(labels_tmp[i] == "minus") 
    labels_tmp[i] <- "minus (-)"
  else if(labels_tmp[i] == "plus")
    labels_tmp[i] <- "plus (+)"
  
}
ONZM_class_coverage_by_unimolecular_quadruplexes$cleaned_labels = labels_tmp
p <- plot_ly(ONZM_class_coverage_by_unimolecular_quadruplexes, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = ONZM_class_coverage_by_unimolecular_quadruplexes$colors)
htmlwidgets::saveWidget(p, file = "ONZM_class_coverage_by_unimolecular_quadruplexes.html")


# ONZM_class_coverage_by_bimolecular_quadruplexes
table <- dbGetQuery(con, Query_ONZM_class_coverage_by_bimolecular_quadruplexes)
ONZM_class_coverage_by_bimolecular_quadruplexes <- prepere_data_for_plot.function(table)

labels <- ONZM_class_coverage_by_bimolecular_quadruplexes$cleaned_labels
labels_tmp <- labels
for(i in 1:length(labels))
{
  if(labels_tmp[i] =="star") 
    labels_tmp[i] <- 'star (*)'
  else if(labels_tmp[i] == "minus") 
    labels_tmp[i] <- "minus (-)"
  else if(labels_tmp[i] == "plus")
    labels_tmp[i] <- "plus (+)"
  
}
ONZM_class_coverage_by_bimolecular_quadruplexes$cleaned_labels = labels_tmp
p <- plot_ly(ONZM_class_coverage_by_bimolecular_quadruplexes, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = ONZM_class_coverage_by_bimolecular_quadruplexes$colors)
htmlwidgets::saveWidget(p, file = "ONZM_class_coverage_by_bimolecular_quadruplexes.html")


# ONZM_class_coverage_by_tetramolecular_quadruplexes
table <- dbGetQuery(con, Query_ONZM_class_coverage_by_tetramolecular_quadruplexes)
ONZM_class_coverage_by_tetramolecular_quadruplexes <- prepere_data_for_plot.function(table)

labels <- ONZM_class_coverage_by_tetramolecular_quadruplexes$cleaned_labels
labels_tmp <- labels
for(i in 1:length(labels))
{
  if(labels_tmp[i] =="star") 
    labels_tmp[i] <- 'star (*)'
  else if(labels_tmp[i] == "minus") 
    labels_tmp[i] <- "minus (-)"
  else if(labels_tmp[i] == "plus")
    labels_tmp[i] <- "plus (+)"
  
}
ONZM_class_coverage_by_tetramolecular_quadruplexes$cleaned_labels = labels_tmp
p <- plot_ly(ONZM_class_coverage_by_tetramolecular_quadruplexes, ids = ~cleaned_ids, labels = ~cleaned_labels, parents = ~cleaned_parents,values = ~cleaned_values, type = 'sunburst', branchvalues = 'total') %>% layout(colorway = ONZM_class_coverage_by_tetramolecular_quadruplexes$colors)
htmlwidgets::saveWidget(p, file = "ONZM_class_coverage_by_tetramolecular_quadruplexes.html")
