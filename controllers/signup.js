const { response } = require('express');

const signupPost = (req, res = response) => {
    res.json({
        msg: 'post API - controller'
    });
}

module.exports = {
    signupPost
}