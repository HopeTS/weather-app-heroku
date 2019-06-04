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
      console.log(body.daily.summary)
      const temp = body.currently.temperature.toString()
      const rainChance = body.currently.precipProbability.toString()
      const humidity = body.currently.humidity * 100
      const string = body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out.\n There is a ' + rainChance + '% chance of rain.\n There is ' + humidity + '% humidity.'
      callback(undefined, string)
    }
  })
}

module.exports = weather
