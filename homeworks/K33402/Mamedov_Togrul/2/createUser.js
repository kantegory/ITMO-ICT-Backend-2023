const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Togrul',
    lastName: 'Mamedov',
    email: 'example@example.example',
    password: '1234',
    username: 'broni27'
  })
}

main()