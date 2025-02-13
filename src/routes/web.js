const express = require('express');
let router = express.Router();
const AuthController = require("../controllers/AuthController");
const IncomeController = require("../controllers/incomeController");
const withdrawalController = require("../controllers/withdrawalController");

const authMiddleware = require("../middleware/authMiddleware"); // JWT Auth Middleware

const passport = require('passport');


const googleController = require('../controllers/googleController');
const teamController = require('../controllers/teamController');



router.post('/google', googleController.verifyGoogleToken);
router.post('/register', AuthController.register);
router.post('/withdrawal', authMiddleware, withdrawalController.createWithdrawal);
router.get('/withdrawals', authMiddleware, withdrawalController.getWithdrawalHistory);

router.post("/team",teamController.getTeam);




// Mount the router on /api/auth so that /register becomes /api/auth/register
const initWebRouter = (app) => {
    app.use('/api/auth', router);
  };

  module.exports = initWebRouter;

