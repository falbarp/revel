const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/login');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/',[
    check('email', 'A valid Email is required').isEmail(),
    check('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }),
    validateFields

], loginPost);


module.exports = router;