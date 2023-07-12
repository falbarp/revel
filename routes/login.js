const { Router } = require('express');

const router = Router();


router.post('/', (req, res) => {
    res.json({
        msg: 'post API'
    });
});


module.exports = router;