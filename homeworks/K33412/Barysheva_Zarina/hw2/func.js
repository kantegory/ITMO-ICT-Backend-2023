const db = require('./models')

module.exports = {
    get_all_users: async function () {
        const users = await db.User.findAll()
        return users
    },
    get_user_by_id: async function (userId) {
        try {
            const user = await db.User.findByPk(userId)
            return user
        }
        catch(e) {
            return null
        }
    },
    create_user: async function (user) {
        try {
            console.log(user);
            await db.User.create(user)
            return "user has been created"
        }
        catch(e){
            return "fail"
        }
    },
    delete_user_by_id: async function (userId) {
        console.log(userId);
        try {
            await db.User.destroy({where: {id: userId}})
            return "user has been deleted"
        }
        catch(e) {
            return "fail"
        }
    },
    update_user: async function (userId, user) {
        console.log(userId);
        try {
            await db.User.update(user, {where: {id: userId}})
            return "user has been updated"
        }
        catch(e) {
            return "fail"
        }
    },
  };
