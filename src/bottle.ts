import Bottle = require('bottlejs');
const config = require('config');

import LastRunRoute from './route/lastRunRoute';
import DashboardResponder from './responder/dashboardResponder';
import CronDomain from './domain/cronDomain';
import DashboardAction from './action/dashboardAction';
import {IContainer} from 'bottlejs';

export default class Container {
    private bottle: Bottle;

    public constructor(){
        this.bottle = new Bottle();
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

        this.bottle.service( 'Db', knex);

        this.bottle.factory('CronDomain', function(container){
            return new CronDomain(container.Db);
        });

        this.bottle.factory('DashboardAction', function(container){
            return new DashboardAction(container.CronDomain);
        });

        this.bottle.factory( 'DashboardResponder', function(container){
            return new DashboardResponder();
        });

        this.bottle.factory('LastRunRoute', function(container) {
            return new LastRunRoute(container);
        });
    }

    public getContainer(): IContainer{
        return this.bottle.container;
    }
}
