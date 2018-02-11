const Router = require('./Router');
const router = new Router();

// middlewares
const authMiddleware = require('../middleware/authMiddleware');

// controllers
const userController = require('../controller/userController');

router.post('/user', userController.create);
router.post('/auth', userController.auth);
router.get('/test-auth', () => Promise.resolve('hey jude'), authMiddleware);

module.exports = router.create();
