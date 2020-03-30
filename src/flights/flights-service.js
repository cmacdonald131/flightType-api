const FlightsService = {
    getAllFlights(knex, id) {
      return knex.select('*').from('flight').where('user_id', id)
    },
  
    insertFlight(knex, newFlight) {
      return knex
        .insert(newFlight)
        .into('flight')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('flight')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteFlight(knex, id) {
      return knex('flight')
        .where({ id })
        .delete()
    },
  
    updateFlight(knex, id, newFlightFields) {
      return knex('flight')
        .where({ id })
        .update(newFlightFields)
    },
  }
  
  module.exports = FlightsService