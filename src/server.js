require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const passport = require("passport");
const winston = require("winston");
// const Withdrawal = require("./models/Withdrawal"); // Import Withdrawal model

const initWebRouter = require("./routes/web");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3002;

// Security Middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());  // Add bodyParser for POST request handling
// const withdrawRoutes = require('./routes/withdrawRoutes');
// Rate Limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: "Too many requests from this IP" });
app.use(limiter);
    
// Logger Configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// Session Setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// API endpoint jahan data ko save karna hai
const apiUrl = 'http://localhost:3002/api3/auth/withdrawal';

// POST route for saving address and amount
app.post('/withdrawal', (req, res) => {
  const { address, amount } = req.body; // Request body se address aur amount nikaal rahe hain

  // Data jo API ko bhejna hai
  const data = {
    address: address,
    amount: amount
  };

  // Axios POST request to external API
  axios.post(apiUrl, data)
    .then((response) => {
      // Agar data successfully save ho jaata hai
      res.status(200).json({
        message: 'Data saved successfully',
        data: response.data
      });
    })
    .catch((error) => {
      // Agar error hota hai
      res.status(500).json({
        message: 'Error saving data',
        error: error.message
      });
    });
});

// Default Route
app.get("/", (req, res) => {
    res.send({ message: "Secure Node.js API with MySQL" });
});



// Initialize Web Routes (if any)
initWebRouter(app);

// Sync database and start server
// Start server after DB sync (manual in this case)
app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
  
