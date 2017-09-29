import * as fastify from 'fastify';
import Container from '../bottle';


export default class DashboardResponder {

    public getLastRun (req: fastify.FastifyRequest, reply: fastify.FastifyReply) {
        let c = new Container();
        const dashboardController = c.getDashboardAction();

        reply.header('Content-Type', 'application/json').code(200);
        dashboardController.getLastRun()
            .then((data) => {
                reply.send(data[0]);
            });
    }
}