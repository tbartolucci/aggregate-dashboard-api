const Bottle = require('bottlejs');
const Hapi = require('hapi');
const config = require('./config');
const  MetricDb = require('./src/MetricDb');

var bottle = new Bottle();

bottle.service('config', config);

bottle.service('MetricDb', MetricDb, 'config');
// bottle.factory('MetricDb', function(container) {
//     var config = container.config;
//     return new MetricDb(config);
// });



module.exports = bottle;