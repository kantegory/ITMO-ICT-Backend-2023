const db = require('./models')

async function main() {
    await db.User.create({
        name: "Maria",
        surname: "Pavlova",
        middlename: "Timurovna",
        email: "maripavi@gmail.com",
        address: "Svechnoi Pereulok, 93",
    })
}

main()