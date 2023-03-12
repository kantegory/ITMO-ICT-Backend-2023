const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Anastasia',
    lastName: 'Konik',
    email: 'konik.ftl@mail.ru',
    password: '123konik123',
    username: 'anastasiakonik'
  })
}

main()