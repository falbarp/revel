const { Router } = require('express');
const { authenticateUser } = require('../middlewares/auth');
const { seedPost } = require('../controllers/seed');


const router = Router();


router.post('/',[
    authenticateUser,
], seedPost);


module.exports = router;