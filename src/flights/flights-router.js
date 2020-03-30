const path = require('path')
const express = require('express')
const xss = require('xss')
const FlightsService = require('./flights-service')
const { requireAuth } = require('../middleware/jwt-auth')

const flightsRouter = express.Router()
const jsonParser = express.json()

const serializeFlight = flight => ({
  id: flight.id,
  name: xss(flight.name),
  departure_airport: xss(flight.departure_airport),
  arrival_airport: xss(flight.arrival_airport),
  company: xss(flight.company),
  arrival_time: xss(flight.arrival_time),
  departure_time: xss(flight.departure_time),
})
flightsRouter.use(requireAuth)
flightsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    FlightsService.getAllFlights(knexInstance, req.user.id)
      .then(flights => {
        res.json(flights.map(serializeFlight))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, departure_airport, arrival_airport, company, arrival_time, departure_time } = req.body
    const newFlight = { name, departure_airport, arrival_airport, company, arrival_time, departure_time }

    for (const [key, value] of Object.entries(newFlight)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    console.log(newFlight);
    newFlight.user_id = req.user.id
    FlightsService.insertFlight(
      req.app.get('db'),
      newFlight
    )
      .then(flight => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${flight.id}`))
          .json(serializeFlight(flight))
      })
      .catch(next)
  })

flightsRouter
  .route('/:flight_id')
  .all((req, res, next) => {
    FlightsService.getById(
      req.app.get('db'),
      req.params.flight_id
    )
      .then(flight => {
        if (!flight) {
          return res.status(404).json({
            error: { message: `Flight doesn't exist` }
          })
        }
        res.flight = flight
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeFlight(res.flight))
  })
  .delete((req, res, next) => {
    FlightsService.deleteFlight(
      req.app.get('db'),
      req.params.flight_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, departure_airport, arrival_airport, company, arrival_time, departure_time } = req.body
    const flightToUpdate = { name, departure_airport, arrival_airport, company, arrival_time, departure_time }

    const numberOfValues = Object.values(flightToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'name, departure_airport, arrival_airport, company, arrival_time, departure_time'`
        }
      })

    FlightsService.updateFlight(
      req.app.get('db'),
      req.params.flight_id,
      flightToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = flightsRouter