const express = require('express')
const db = require('./models')

async function deleteUndefinedUsers() {
    const users = await db.User.findAll({ where: { name: null } });
    await db.User.destroy({ where: { name: null } });
    console.log(`Deleted ${users.length} undefined users`);
}

deleteUndefinedUsers();
