const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { authenticateUser, authorizeUser } = require('../middlewares/auth');
const { userGet, userPut, userRolePut, userDelete } = require('../controllers/user');

const router = Router();

router.get('/',[ 
    authenticateUser,
    authorizeUser('admin')
], userGet); 

router.put('/roles/:userId', [
    check('role', 'Is not a valid role').isIn(['admin', 'user']),
    validateFields,
    authenticateUser,
    authorizeUser('admin')
], userRolePut);

router.put('/:userId', [
    check('name', 'Name is required').not().isEmpty().optional(),
    check('email', 'A valid Email is required').isEmail().optional(),
    check('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }).optional(),
    validateFields,
    authenticateUser
],userPut);

router.delete('/:userId', [
    authenticateUser,
    authorizeUser('admin')
], userDelete);

module.exports = router;