import * as fastify from 'fastify';
import * as cors from 'cors';
import Container from './bottle';

let bottle = new Container();

const server: fastify.FastifyInstance = fastify();

const lastRunRoute = bottle.getContainer().LastRunRoute;

server.use(cors());
server.get('/api/last-run', lastRunRoute.getOptions(), lastRunRoute.getHandler());

server.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${server.server.address().port}`)
})

