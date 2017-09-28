import * as fastify from 'fastify';
import CronDomain from "../domain/cronDomain";
import DashboardAction from '../action/dashboardAction';
import Db from '../db';

export default class DashboardResponder {

    public getLastRun (req: fastify.FastifyRequest, reply: fastify.FastifyReply) {
        let db = new Db();
        const dashboardController = new DashboardAction(new CronDomain(db.getKnex()));
        reply.header('Content-Type', 'application/json').code(200);
        dashboardController.getLastRun()
            .then((data) => {
                reply.send(data[0]);
            });
    }
}