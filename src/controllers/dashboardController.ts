import * as Hapi from "hapi";
import BaseController from './baseController';
import CronRepository from '../repository/cronRepository';


export default class DashboardController extends BaseController{
    private cronRepository: CronRepository;

    constructor(server: Hapi.Server, cronRepo: CronRepository) {
        super(server);
        this.cronRepository = cronRepo;
    }

    public getLastRun()  {
        return {
            handler: (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
                reply(this.cronRepository.getPrimaryLastRun());
            }
        };
    }
}