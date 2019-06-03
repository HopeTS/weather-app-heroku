const fs = require('fs')
const request = require('request')

const geocode = (address, callback) => {

  // Generate url
  const key = fs.readFileSync('./mapboxkey.txt').toString().replace(' ', '')
  let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + key + '&limit=1'
  url = url.replace('\n', '')

  // Request data from mapbox
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to mapbox...', undefined)
    } else if (body.features.length === 0) {
      callback('Could not find location...', undefined)
    } else {
      const coordinates = body.features[0].geometry['coordinates']
      const latitude = coordinates[1]
      const longitude = coordinates[0]
      const place_name = body.features[0].place_name
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: place_name
      })
    }
  })
}

module.exports = geocode
