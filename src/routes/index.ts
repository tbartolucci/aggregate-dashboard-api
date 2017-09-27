import * as Hapi from 'hapi';
import DashboardController from '../controllers/dashboardController';
import CronRepository from '../repository/cronRepository';
const config = require('config');

const dbHost = config.db.host;
const dbUser = config.db.username;
const dbPassword = config.db.password;
const dbSchema = config.db.schema;

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : dbHost,
        user : dbUser,
        password : dbPassword,
        database : dbSchema
    }
});

export default function(server: Hapi.Server) {

    const dashboardController = new DashboardController(server, new CronRepository(knex));

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    });

    server.route({
        method: 'GET',
        path: '/api/last-run',
        handler: undefined,
        config: dashboardController.getLastRun()
    });

}