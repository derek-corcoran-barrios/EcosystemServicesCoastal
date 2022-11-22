library(sf)
library(terra)

Poligonos <- readRDS("Poligonos_Ciudades.rds")

Poligonos <- Poligonos[st_geometry_type(Poligonos) == "POLYGON",]

Poligonos <- terra::vect(Poligonos)
terra::writeVector(Poligonos, "Cities.shp")

Files <- list.files(pattern = "Cities")

zip("Polygons.zip", files = Files)


terra::writeVector(Poligonos[1:16], "Cities.shp")