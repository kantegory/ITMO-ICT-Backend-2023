const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivanov@mail.com',
    password: '123',
    phone: '123-123'
  })
}

main()
