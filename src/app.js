// libraries
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// utils
const geocode = require('./utils/mapbox')
const weather = require('./utils/darksky')

const app = express()

// Define paths for express config
const publicPage = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set hbs engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set directory to serve
app.use(express.static(publicPage))

// Homepage
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Robby'
  })
})

// About page
app.get('/about', (req, res) => {
  res.render('about/index', {
    title: 'The About page',
    name: 'Ribby'
  })
})

// Help page
app.get('/help', (req, res) => {
  res.render('help/index', {
    title: 'The Help page',
    name: 'Ruby',
    message: 'I can\'t help you I need help meself!'
  })
})

// Weather page
app.get('/weather', (req, res) => {

  const place = geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (!req.query.address) {
      return res.send({
        error: 'Must provide an address!'
      })
    }

    if (error) {
      return res.send({
        error: 'Something went wrong. Try another location'
      })
    }

    weather(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send(error)
      }

      return res.send({
        location: location,
        data: weatherData
      })
    })
  })
})

// Products page
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: [],
    games: ['lol']
  })
})

// 404 pages
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ribster',
    message: 'Help page not found.'
  })
})
app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ribster',
    message: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000.')
})
