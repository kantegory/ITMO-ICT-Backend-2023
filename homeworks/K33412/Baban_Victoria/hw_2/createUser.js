const db = require('./models')

async function main() {
    await db.User.create({
        lastName: 'Test1',
        firstName: 'User1',
        patronymic: '-',
        email: 'user1@example.com',
        password: "user1_1234",
        phone: '+0123456789'
    })
}

main()