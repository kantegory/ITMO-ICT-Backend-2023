const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Dambou',
    lastName: 'Keita',
    email: 'dambou@example.com',
    age: 22,
    country: 'Guinea',
    city: 'Conakry'
  })
}

main()