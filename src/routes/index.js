const Router = require('./Router');
const router = new Router();

// middlewares
const authMiddleware = require('../middleware/authMiddleware');

// controllers
const userController = require('../controller/userController');
const quoteController = require('../controller/quoteController');
const unsplashController = require('../controller/unsplashController');
const telegramBotController = require('../controller/telegramBotController');

// unsplash
router.get('/unsplash/random', unsplashController.random);
router.get('/unsplash', unsplashController.get);

// user
router.get('/user/settings/validate', userController.validate);
router.get('/user/info', userController.info, authMiddleware);
router.get('/user/:username/quotes', userController.quotes);
router.get('/user/:username', userController.info);
router.patch('/user', userController.update, authMiddleware);
router.post('/user', userController.create);
router.post('/auth', userController.auth);

// quotes
router.get('/quote/search/:keyword?', quoteController.search);
router.get('/quote/random', quoteController.random);
router.get('/quote/:id', quoteController.get);
router.post('/quote', quoteController.create, authMiddleware);

router.get('/telegram/latest-urls', telegramBotController.getCurrentUrls);

module.exports = router.create();
