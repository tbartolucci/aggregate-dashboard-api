import * as fastify from 'fastify';
import * as cors from 'cors';
const config = require('config');

import DashboardResponder from './responder/dashboardResponder';

const server: fastify.FastifyInstance = fastify();

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

const dashResponder = new DashboardResponder();

server.use(cors());
server.get('/api/last-run', dashResponder.getLastRun);

server.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${server.server.address().port}`)
})

