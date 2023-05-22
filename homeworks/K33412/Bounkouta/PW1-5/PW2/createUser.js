const db = require('./models')

async function create() {
  await db.User.create({
    email: 'test1@example.com',
    firstName: 'Test1',
    lastName: 'Test1',
    age: '1'
  })
}

create()