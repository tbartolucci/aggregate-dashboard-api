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

MetricDb.prototype.fetchRow = function(table, keyName, value, callback) {
    this.connection.query(
        "SELECT * FROM `" + table + "` WHERE `" + keyName + "`= ?",
        [ value ],
        callback);
}

MetricDb.prototype.loadTable = function(table, keyColumn, callback) {
    this.connection.query("select * from `" + table + "`", callback);
}

MetricDb.prototype.updateColumnByKey = function(table, column, value, key, id, callback ) {
    this.connection.query(
        "update `" + table + "` set `" + column + "`=? where `" + key +"`=?",
        [ value, id ],
        callback);
}

module.exports = MetricDb;



