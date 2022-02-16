#fileLocation = "x"## place the file address 
library(jsonlite)
df = read.csv(fileLocation)
daJson = toJSON(df,"columns")
write_json(daJson, paste0(strsplit(fileLocation, ".csv")[1],'.json'))
