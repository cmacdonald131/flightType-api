const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'test-user-1',
            name: 'Test user 1',
            email: 'testuser1@test.com',
            password: 'password',
        },
        {
            id: 2,
            username: 'test-user-2',
            name: 'Test user 2',
            email: 'testuser2@test.com',
            password: 'password',
        },
        {
            id: 3,
            username: 'test-user-3',
            name: 'Test user 3',
            email: 'testuser3@test.com',
            password: 'password',
        },
        {
            id: 4,
            username: 'test-user-4',
            name: 'Test user 4',
            email: 'testuser4@test.com',
            password: 'password',
        },
    ]
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
        flight_users
      `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE flight_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('flight_users_id_seq', 0)`),
                ])
            )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('flight_users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('flight_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

module.exports = {
    makeUsersArray,
    cleanTables,
    makeAuthHeader,
    seedUsers,
}