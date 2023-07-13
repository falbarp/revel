const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');



class Server {


    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        

        this.signupPath = '/api/signup';
        this.loginPath = '/api/login';
        this.usersPath = '/api/users';
        this.productsPath = '/api/products';
     
        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        
        this.app.use( cors() );

        this.app.use( express.json() );
     
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.signupPath , require('../routes/signup'));
        this.app.use( this.loginPath , require('../routes/login'));
        this.app.use( this.usersPath , require('../routes/user'));
        this.app.use( this.productsPath, require('../routes/product'));
       
    }

    listen() {
        const options = {
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
          };
        
        https.createServer(options, this.app).listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}

module.exports = Server;