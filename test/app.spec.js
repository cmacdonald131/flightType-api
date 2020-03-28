const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 containing "Check it out!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Check it out!')
    })
})