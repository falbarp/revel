const { Router } = require('express');
const { authenticateUser, authorizeUser } = require('../middlewares/auth');

const { userGet, userPut, userRolePut, userDelete } = require('../controllers/user');

const router = Router();

router.get('/',[ 
    authenticateUser,
    authorizeUser('admin')
], userGet); 

router.put('/roles/:userId', [
    authenticateUser,
    authorizeUser('admin')
], userRolePut);

router.put('/:userId', userPut);

router.delete('/:userId', [
    authenticateUser,
    authorizeUser('admin')
], userDelete);

module.exports = router;