import * as Hapi from 'hapi';
import Routes from './routes';
const config = require('config');

var port = config.get('server.port');
var server = new Hapi.Server();
server.connection({ port: port });


server.register({
    register: require('hapi-cors'),
    options: {
        origins: config.get('server.corsOrigins'), //['http://localhost:3000']
        allowCredentials: 'true',
        exposeHeaders: ['content-type', 'content-length'],
        maxAge: 600,
        methods: ['POST, PUT, GET, DELETE, OPTIONS'],
        headers: ['Accept', 'Content-Type', 'Authorization']
    }
}, function(err){
    server.start(function(){
        console.log(server.info.uri);
    });
});

server.register({
    register: require('hapi-rate-limit'),
    options: {
        // 200 requests per 1 minute per user global max
        userLimit: 200,
        userCache: {
            segment: 'hapi-rate-limit-user',
            expiresIn: 60 * 1000
        },
        headers: false
    }
});

// Register Routes
Routes(server);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
