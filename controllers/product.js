const { response } = require('express');

const productGet = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const productPut = (req, res = response) => {
    res.json({
        msg: 'put API - controller'
    });
}

const productPost = (req, res = response) => {
    res.json({
        msg: 'post API - controller'
    });
}

const productDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    productGet,
    productPut,
    productPost,
    productDelete
}