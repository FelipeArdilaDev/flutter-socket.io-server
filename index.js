const express = require('express');
const {resolve} = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const {PORT} = process.env

// Path público
const publicPath = resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

server.listen( PORT, ( err ) => {
    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', PORT );

});


