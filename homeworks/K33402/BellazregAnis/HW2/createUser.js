const db = require('./models')

async function main() {
    await db.User.create({
        firstNAme: 'Test',
        lastNAme: 'Test',
        email: 'test@example.com'
    })
}

main()