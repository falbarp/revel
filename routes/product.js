const { Router } = require('express');
const { check } = require('express-validator');
const { authenticateUser } = require('../middlewares/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { 
    productGet, 
    productGetById, 
    productDelete,
    productPut, 
    productPost 
    } = require('../controllers/product');

const router = Router();

router.get('/',[
    authenticateUser
], productGet);

router.get('/:productId',[
    authenticateUser
], productGetById);


router.put('/:productId',[
    authenticateUser
], productPut);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('price', 'A valid price is required').isNumeric(),
    validateFields,
    authenticateUser
], productPost);

router.delete('/:productId', [
    authenticateUser
], productDelete);

module.exports = router;