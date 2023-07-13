const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { authenticateUser, authorizeUser } = require('../middlewares/auth');
const { 
    productGet, 
    productGetById, 
    productDelete,
    productPut, 
    productPost,
    productSearch 
    } = require('../controllers/product');

const router = Router();

router.get('/',[
    authenticateUser
], productGet);

router.get('/search',[
    authenticateUser
], productSearch);

router.get('/:productId',[
    authenticateUser
], productGetById);


router.put('/:productId',[
    authenticateUser,
    authorizeUser('admin')

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
    authenticateUser,
    authorizeUser('admin')
], productDelete);



module.exports = router;