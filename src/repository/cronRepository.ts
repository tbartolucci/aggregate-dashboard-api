
import Knex = require('knex');

export default class CronRepository {
    private knex: Knex;

    constructor(k: Knex) {
        this.knex = k;
    }

    /**
     * Update the last execution time
     *
     * @param time
     * @return int|void
     */
    public updatePrimaryLastRun(time: string): PromiseLike<any> {

        let timeObj = new Date(time);

        if ( isNaN(timeObj.getTime()) ){
            timeObj = new Date();
        }

        return this.knex('cron_jobs')
            .where('jobName','=','PrimaryUpdate')
            .update({ 'lastRun': timeObj })
            .then();
    }

    /**
     * @return mixed
     */
    public getPrimaryLastRun(): PromiseLike<any> {
        return this.knex.select('lastRun')
            .from('cron_jobs')
            .where('jobName','PrimaryUpdate')
            .then(function(result){
                return result;
            }).catch(function(error) {
                console.error(error)
            });
    }
}