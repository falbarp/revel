const mongoose = require('mongoose');

const dbConnection = async () => {

    

    try{
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }
}

module.exports = {
    dbConnection
}
