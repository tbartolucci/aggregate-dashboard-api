import {RequestHandler} from 'fastify';

export interface RouteInterface {
    getOptions(): object;
    getHandler(): RequestHandler;
}