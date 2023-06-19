import express from 'express';
const cors  = require('cors');
const { event, appEvent } = require('./api');


module.exports = async (app:any) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    event(app);
    appEvent(app);

    
}