const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Иван',
    lastName: 'Иванов',
    username: 'ivan1',
    email: 'ivan@example.com',
    password: "1234ivan"
  })
}

main()
