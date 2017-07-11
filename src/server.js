'use strict';

const Hapi = require('hapi');
const bottle = require('./Container');

const server = new Hapi.Server();
server.connection({ port: config.port, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Goodbye');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});