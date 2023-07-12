const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
     


        this.middlewares();


        this.routes();
    }

    middlewares() {
        
        this.app.use( cors());
     
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( '/api/users', require('../routes/user'));
        this.app.use( '/api/products', require('../routes/product'));
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}

module.exports = Server;