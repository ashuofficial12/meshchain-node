const express = require('express');
let router = express.Router();
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware"); // JWT Auth Middleware
const teamController = require("../controllers/teamController");
const withdrawalControllers = require("../controllers/withdrawalController");

const passport = require('passport');


const googleController = require('../controllers/googleController');

router.post('/send-code', AuthController.sendCode);
router.post('/reset-password', AuthController.resetPassword);
router.post('/google', googleController.verifyGoogleToken);
router.post('/register', AuthController.register);
router.post('/withdrawal', authMiddleware, withdrawalControllers.createWithdrawal);// router.get("/direct-income", authMiddleware, IncomeController.getDirectIncome);
router.get("/team", authMiddleware, teamController.team);
router.get("/header", authMiddleware, AuthController.getUserHeader); 
router.get("/profiles", authMiddleware, AuthController.getUserProfile);  // ✅ Get user profile
router.put("/profile", authMiddleware, AuthController.updateUserProfile);  // ✅ Get user profile
router.get("/withdrawals", authMiddleware, withdrawalControllers.getWithdrawalHistory);

const initWebRouter = (app) => {
    app.use('/api/auth', router);
  };

  module.exports = initWebRouter;

