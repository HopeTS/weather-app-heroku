const fs = require('fs')
const request = require('request')

const weather = (latitude, longitude, callback) => {

  // Generate url
  const key = fs.readFileSync('./darkskykey.txt').toString().replace(' ', '')
  let url = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude
  url = url.replace('\n', '')

  // Request data from darksky
  request({url, json: true}, (error, {body}) => {
    if (error) {
      console.log('Could not reach DarkSky')
    } else if (body.error) {
      console.log('Something went wrong with DarkSky')
    } else {
      const temp = body.currently.temperature.toString()
      const rainChance = body.currently.precipProbability.toString()
      const string = body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a ' + rainChance + '% chance of rain.'
      callback(undefined, string)
    }
  })
}

module.exports = weather
