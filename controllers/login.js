const { response } = require('express');

const loginPost = (req, res = response) => {
    res.json({
        msg: 'post API - controller'
    });
}

module.exports = {
    loginPost
}