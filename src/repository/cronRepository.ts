
import Knex = require('knex');

export default class CronRepository {
    private knex: Knex;

    constructor(k: Knex) {
        this.knex = k;
    }

    /**
     * Update the last execution time
     *
     * @param $time
     * @return int|void
     *
    public function updatePrimaryLastRun($time)
    {
        if( empty($time) ){
            return;
        }
        if( is_string($time) ) {
            $time = strtotime($time);
        }

        if ( is_int($time) ){
            $time = date('Y-m-d H:i:s', $time);
        }

        return $this->db->updateColumnByKey('cron_jobs', 'lastRun', $time, 'jobName', 'PrimaryUpdate');
    }
*/

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