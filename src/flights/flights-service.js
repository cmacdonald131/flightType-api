const FlightsService = {
    getAllFlights(knex, id) {
      return knex.select('*').from('flights').where('user_id', id)
    },
  
    insertFlight(knex, newFlight) {
      return knex
        .insert(newFlight)
        .into('flights')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('flights')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteFlight(knex, id) {
      return knex('flights')
        .where({ id })
        .delete()
    },
  
    updateFlight(knex, id, newFlightFields) {
      return knex('flights')
        .where({ id })
        .update(newFlightFields)
    },
  }
  
  module.exports = FlightsService