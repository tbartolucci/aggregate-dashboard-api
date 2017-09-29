
import {RouteInterface} from './routeInterface';
import {RequestHandler} from 'fastify';
import {IContainer} from 'bottlejs';


export default class LastRunRoute implements RouteInterface {
    private container: IContainer;

    public constructor(b: IContainer){
        this.container = b;
    }

    getHandler(): RequestHandler {
        const dashResponder = this.container.DashboardResponder;
        return dashResponder.getLastRun;
    }

    public getOptions(): object{
        let opts = {
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