/*
var map = new maplibregl.Map({
  container: 'map',
  // style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',  // stylesheet location

  style: {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19
        },
        // Use a different source for terrain and hillshade layers, to improve render quality
        terrainSource: {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256
        },
        hillshadeSource: {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256
        }
    },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm'
        },
        {
            id: 'hills',
            type: 'hillshade',
            source: 'hillshadeSource',
            layout: {visibility: 'visible'},
            paint: {'hillshade-shadow-color': '#473B24'}
        }
    ],
    terrain: {
        source: 'terrainSource',
        exaggeration: 1
    }
},
  center: [-99.0589191733445, 19.52178338965596], // starting position [lng, lat]

  zoom: 17 // starting zoom
});
*/

const long = 19.46753001241949;
const lat = -99.05025597337844;

const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [
        lat, long
    ],
    zoom: 20,
    pitch: 0
});

map.on('load', () => {
    // Add an image to use as a custom marker
    map.loadImage(
         './Sin título.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            // Add a GeoJSON source with 3 points.
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    lat,
                                    long
                                ]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    -99.05016192819093, 19.467590874809478 
                                ]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    -99.05034891056079, 19.467477426009776
                                ]
                            }
                        }
                    ]
                }
            });

            // Add a symbol layer
            map.addLayer({
                'id': 'symbols',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker'
                }
            });
        }
    );

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'symbols', (e) => {

        console.log(e);

        map.flyTo({
            center: e.features[0].geometry.coordinates,
            pitch: 60
        });

        setTimeout(()=> {
            alert("Ha clickeado un lote")
        }, 1000)


    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', () => {
        map.getCanvas().style.cursor = '';
    });
});