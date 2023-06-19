const express = require('express');
const cors  = require('cors');
const { attendance } = require('./api');


module.exports = async (app, channel) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api

    attendance(app, channel);

    
}