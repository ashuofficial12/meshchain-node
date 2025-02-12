const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

<<<<<<< HEAD
const User = {
  // ✅ Create a new user
  create: async (userData) => {
    userData.password = await bcrypt.hash(userData.password, 10); // Hash password
    const [result] = await db.query("INSERT INTO users SET ?", [userData]);
    return result.insertId;
  },

  // ✅ Get user by ID
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  // ✅ Get user by username
  findByUsername: async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  },

  // ✅ Verify user credentials (Login)
  login: async (username, password) => {
    const user = await User.findByUsername(username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  },

  // ✅ Update user details
  update: async (id, userData) => {
    await db.query("UPDATE users SET ? WHERE id = ?", [userData, id]);
    return true;
  },

  // ✅ Delete user
  delete: async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }
};
=======
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    sponsor: { type: DataTypes.INTEGER, allowNull: true }, // Parent user (sponsor)
    active_status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Inactive' },
    jdate: { type: DataTypes.DATEONLY, allowNull: false },
    // balance: { type: DataTypes.FLOAT, defaultValue: 0 },
}, {
    tableName: 'users',
    timestamps: false
});


>>>>>>> 29359f909882d1e6a7cd63d443fd90298019a855

module.exports = User;
