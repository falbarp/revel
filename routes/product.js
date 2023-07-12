const { Router } = require('express');
const { productGet, productDelete, productPut, productPost } = require('../controllers/product');

const router = Router();

router.get('/', productGet);

router.put('/', productPut);

router.post('/', productPost);

router.delete('/', productDelete);

module.exports = router;