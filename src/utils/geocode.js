const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGFuYWNoYXlrYSIsImEiOiJjbDAwcjl2OTkwNWdzM2tvM3Z4Ym1qcW1uIn0.0RvOyAdO_CDP6GCDZ5ok6Q&limit=1`;
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try again with different search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;