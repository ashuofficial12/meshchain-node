<<<<<<< HEAD
const db = require("../config/db");

const Investment = {
  // ✅ Create a new investment
  create: async (investmentData) => {
    const [result] = await db.query("INSERT INTO investments SET ?", [investmentData]);
    return result.insertId;
  },

  // ✅ Get investment by ID
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM investments WHERE id = ?", [id]);
    return rows[0];
  },

  // ✅ Get all investments of a user
  getUserInvestments: async (userId) => {
    const [rows] = await db.query("SELECT * FROM investments WHERE user_id = ?", [userId]);
    return rows;
  },

  // ✅ Update investment status
  updateStatus: async (id, status) => {
    await db.query("UPDATE investments SET status = ? WHERE id = ?", [status, id]);
    return true;
  },

  // ✅ Delete an investment record
  delete: async (id) => {
    await db.query("DELETE FROM investments WHERE id = ?", [id]);
    return true;
  }
};

module.exports = Investment;
=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

const Investment = sequelize.define('Investment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id_fk: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Inactive' },
}, {
    tableName: 'investments',
    timestamps: false
});

module.exports = Investment;
>>>>>>> 29359f909882d1e6a7cd63d443fd90298019a855
