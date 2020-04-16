const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 containing "Check your flight!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Check your flight!')
    })
})