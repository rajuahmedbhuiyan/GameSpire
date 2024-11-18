const router = require('express').Router();
const { registerController, allUsers  } = require('../controller/auth');

router.post('/register', registerController);
router.get('/all', allUsers);
 

module.exports = router;