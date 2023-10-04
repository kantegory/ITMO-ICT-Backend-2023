const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Danya',
    lastName: 'Shutov',
    email: 'danya@example.com',
    age: 21,
    country: 'Russia',
    city: 'Spb'
  })
}

main()