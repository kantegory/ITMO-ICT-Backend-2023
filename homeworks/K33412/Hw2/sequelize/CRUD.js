"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("./database/models/users.model");
const __project_path = '/home/timur/ITMO-ICT-Backend-2023/homeworks/K33412/Hw2/';
const create = function (models = [users_model_1.Users]) {
    const db = new sequelize_typescript_1.Sequelize({
        database: 'database',
        dialect: 'sqlite',
        storage: __project_path + 'sequelize/database/database.sqlite',
    });
    db.addModels(models);
    db.authenticate().then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connected to database!');
            yield db.sync();
        });
    }, function () {
        console.log('No connection to database');
    });
    return db;
};
const add_user = function (db, req, res) {
    let username = req.username;
    let name = req.name;
    let birthday = req.birthday;
    let password = req.password;
    const created = db.Users.create({
        username: username,
        name: name,
        birthday: birthday,
        password: password
    });
    if (created) {
        res.send("User was created!");
    }
};
const get_users = function (db, res) {
    const users = db.Users.findAll();
    if (users) {
        return res.send(users);
    }
    return res.send({ "msg": "Users not found" });
};
const update_user = function (db, req, res) {
    try {
        const has_user = db.Users.findByPk(req.params.id);
        if (has_user) {
            const updated_user = db.Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if (updated_user) {
                res.send(db.findByPk(req.params.id));
            }
        }
        else {
            res.send('User not found');
        }
    }
    catch (error) {
        res.send({ "error": error.message });
    }
};
const delete_user = function (db, req, res) {
    try {
        const has_user = db.Users.findByPk(req.params.id);
        if (has_user) {
            const deleted_user = db.Users.destroy(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if (deleted_user) {
                res.send("User deleted!");
            }
        }
        else {
            res.send('User not found');
        }
    }
    catch (error) {
        res.send({ "error": error.message });
    }
};
const controller = {
    create: create,
    add_user: add_user,
    get_users: get_users,
    update_user: update_user,
    delete_user: delete_user
};
exports.controller = controller;
//# sourceMappingURL=CRUD.js.map