// Composite an image collection and clip it to a boundary.

    
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-06-01', '2019-12-12');

// Reduce the collection by taking the median.
var median = collection.median();

// Load a table of state boundaries and filter.
var fc = ee.FeatureCollection('projects/ee-my-derekcorcoran/assets/CitiesChile').filter(ee.Filter.or(
        ee.Filter.eq('Ciudad', 'antofagasta'),
        ee.Filter.eq('Ciudad', 'chicureo')));

Map.centerObject(fc);
var band_viz = {
  min: 0,
  max: 0.03,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

//Map.addLayer(median, band_viz, 'S5P N02');

var bscale = median.projection().nominalScale();
print('median scale:', bscale); 

print(median)

var cityCO = median.reduceRegions({
  collection: fc,
  reducer: ee.Reducer.mean(),
  scale: 30 // the resolution of the GRIDMET dataset
});
print(cityCO);

Export.table.toDrive({
  collection: cityCO,
  description: 'meanCO2',
  folder: 'EarthEngine',
  fileFormat: 'SHP'
});   

