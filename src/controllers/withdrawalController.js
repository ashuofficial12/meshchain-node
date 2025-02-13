const Withdraw = require("../models/Withdraw");

// ✅ Create Withdrawal Request
const createWithdrawal = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { address, amount } = req.body;

        if (!userId || address || !amount) {
            return res.status(400).json({ error: "User ID and amount are required" });
        }

        const withdrawal = await Withdraw.create({ userId, address, amount });

        res.status(201).json({ message: "Withdrawal request created successfully", withdrawal });
    } catch (error) {
        console.error("Error creating withdrawal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get Withdrawal History (All Withdrawals of a User)
const getWithdrawalHistory = async (req, res) => {
    try {
        const { address } = req.params; // User ID from URL

        const withdrawals = await Withdraw.findAll({
            where: { address },
            order: [["id", "DESC"]], // Latest first
        });

        res.status(200).json(withdrawals);
    } catch (error) {
        console.error("Error fetching withdrawal history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createWithdrawal,
    getWithdrawalHistory
};
