const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

const Withdraw = sequelize.define('Withdraw', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    amount: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
 
}, {
    tableName: 'withdraws',
    timestamps: true // This will add createdAt and updatedAt columns
});

module.exports = Withdraw;
