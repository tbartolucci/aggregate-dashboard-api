import Knex = require('knex');

const config = require('config');

var port = config.get('server.port');

const dbHost = config.db.host;
const dbUser = config.db.username;
const dbPassword = config.db.password;
const dbSchema = config.db.schema;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : dbHost,
        user : dbUser,
        password : dbPassword,
        database : dbSchema
    }
});

export default class Db{
    public getKnex(): Knex {
        return knex;
    }
}