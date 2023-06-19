const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Test5',
    lastName: 'Test5',
    email: 'test5@test.ru',
    password: '12345678',
    qualification: 'Back-end'
  })
}

main()