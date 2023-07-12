const { Router } = require('express');

const router = Router();


router.post('/', (req, res) => {
    res.json({
        msg: 'signup'
    });
});


module.exports = router;