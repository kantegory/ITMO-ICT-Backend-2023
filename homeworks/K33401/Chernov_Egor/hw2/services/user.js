const db = require('../models')

async function getAll() {
    const users = await db.User.findAll()
    let userList = []

    for (const user of users) {
        userList.push(user.toJSON())
    }

    if (userList) {
        return userList
    }

    return "users are not found"
}

async function getUser(id) {
    const user = await db.User.findByPk(id)

    if (user) {
        return user.toJSON()
    }

    return "user is not found"
}

async function createUser(usr) {
    const user = await db.User.create({
        first_name: usr.first_name,
        last_name: usr.last_name,
        patronymic_name: usr.patronymic_name,
        phone: usr.phone,
        email: usr.email,
        password: usr.password
    })

    if (user) {
        return user.toJSON()
    }

    return "user is not create"
}

module.exports = { getAll, getUser, createUser }