const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { signupPost } = require('../controllers/signup');
const { emailDuplicity } = require('../helpers/email-duplicity');

const router = Router();


router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid Email is required').isEmail(),
    check('email').custom( emailDuplicity ),
    check('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }),
    validateFields
], signupPost);


module.exports = router;