const db = require('../models')

async function getAll() {
    const users = await db.User.findAll()

    let list_of_users = []
    for (const user of users) {
        list_of_users.push(user.toJSON())
    }

    return list_of_users
}

async function getUser(id) {
    const user = await db.User.findByPk(id)

    return user.toJSON()
}

async function createUser(user_query) {
    const user = await db.User.create({ user_query})

    return user.toJSON()
}

async function updateUser(id, user_query) {
    const user = await db.User.update({
        where: {id: id},
        username: user_query.username,
        first_name: user_query.first_name,
        last_name: user_query.last_name,
        email: user_query.email,
        password: user_query.password,
        country: user_query.country
    })

    return user.toJSON()
}

async function deleteUser(id) {
    const user = await db.User.destroy({where: {id: id}})

    return 0
}

module.exports = {getAll, getUser, createUser, updateUser, deleteUser}