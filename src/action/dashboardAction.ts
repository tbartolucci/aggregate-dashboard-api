import CronDomain from '../domain/cronDomain';

export default class DashboardAction{
    private cronDomain: CronDomain;

    constructor(cron: CronDomain) {
        this.cronDomain = cron;
    }

    public getLastRun()  {
        return this.cronDomain.getPrimaryLastRun();
    }
}