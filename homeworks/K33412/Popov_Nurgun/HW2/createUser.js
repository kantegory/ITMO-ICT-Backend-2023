const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Nurgun',
    lastName: 'Popov',
    email: 'nurgun@example.com',
    password: '1234',
    address: 'nevsky',
    age: '20'
  })
}

main()
