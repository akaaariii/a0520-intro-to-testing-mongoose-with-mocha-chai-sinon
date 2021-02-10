require('dotenv').config();
const Hapi = require('hapi')

const database = require('./src/db');
const SignUpRoute = require('./src/routes/sign-up');

const server = Hapi.server({
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost'
})

//routes
server.route(SignUpRoute)

const start = async () => {
    await database.connect()
    await server.start(err => {
        if(err) throw err;

        console.log(`Server running at ${server.info.uri}`);
    })
}

start();

