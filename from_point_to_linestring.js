"use_strict"

import fs from 'fs'

const file_name = "GPSLogger_Sample_Automotive"

// ファイル読み込み

const point_geojson_data = JSON.parse(
    fs.readFileSync('./geojson_point/' + file_name + '.geojson', 'utf8')
);

// Featuresを取得

const features = point_geojson_data["features"];

// LineStringに変換

const line_strings = features.map((feature) => {
    return feature.geometry.coordinates
});

console.table(line_strings)

// Properties用にTimeStanpを抽出

const timestamps = features.map((feature) => {
    return feature.properties.timestamp
});


console.table(timestamps)

// 変換したLineStringをGeoJsonに出力

const output_features = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": line_strings
    },
    "properties": {
        "timestamps": timestamps
    }
}

const geojson_data = JSON.stringify(output_features, null, '  ')
fs.writeFileSync('geojson_linestring/' + file_name + '.geojson', geojson_data)