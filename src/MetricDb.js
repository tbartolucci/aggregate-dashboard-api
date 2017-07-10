var mysql = require('mysql');

function MetricDb(config){
    this.connection = mysql.createConnection({
        host     : config.db.host,
        user     : config.db.username,
        password : config.db.password,
        database : config.db.schema
    });
    this.connection.connect();
}

MetricDb.prototype.close = function(){
    this.connection.end();
}

MetricDb.prototype.query = function(sql,callback){
    this.connection.query(sql, callback);
}

module.exports.MetricDb = MetricDb;



