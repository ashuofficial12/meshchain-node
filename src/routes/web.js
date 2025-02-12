const express = require('express');
let router = express.Router();
const AuthController = require("../controllers/AuthController");
<<<<<<< HEAD
const authMiddleware = require("../middleware/authMiddleware"); // JWT Auth Middleware
const teamController = require("../controllers/teamController");
const withdrawalControllers = require("../controllers/withdrawalController");
=======
const IncomeController = require("../controllers/incomeController");

const authMiddleware = require("../middleware/authMiddleware"); // JWT Auth Middleware
>>>>>>> 29359f909882d1e6a7cd63d443fd90298019a855

const passport = require('passport');


const googleController = require('../controllers/googleController');
const teamController = require('../controllers/teamController');


<<<<<<< HEAD
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
=======

router.post('/google', googleController.verifyGoogleToken);
router.post('/register', AuthController.register);
router.get("/direct-income", authMiddleware, IncomeController.getDirectIncome);
router.get("/level-income", authMiddleware, IncomeController.getLevelIncome);
router.get("/Roi-income", authMiddleware, IncomeController.getRoiIncome);
router.post("/team",teamController.getTeam);



>>>>>>> 29359f909882d1e6a7cd63d443fd90298019a855

const initWebRouter = (app) => {
    app.use('/api/auth', router);
  };

  module.exports = initWebRouter;

