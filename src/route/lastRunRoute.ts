import * as fastify from 'fastify';

import DashboardResponder from '../responder/dashboardResponder';
import {RouteInterface} from './routeInterface';
import {RequestHandler} from 'fastify';

export default class LastRunRoute implements RouteInterface {
    getHandler(): RequestHandler {
        const dashResponder = new DashboardResponder();
        return dashResponder.getLastRun;
    }

    public getOptions(): object{
        const opts: fastify.RouteShorthandOptions = {
            schema: {
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            lastRun: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        };
        return opts;
    }
}