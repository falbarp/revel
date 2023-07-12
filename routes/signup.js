const { Router } = require('express');
const { signupPost } = require('../controllers/signup');

const router = Router();


router.post('/', signupPost);


module.exports = router;