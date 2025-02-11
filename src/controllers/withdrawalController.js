const pool = require("../config/connectDB"); // Import the MySQL connection pool

// Controller function to handle the withdrawal creation
const createWithdrawal = async (req, res) => {
    const { network, address, amount } = req.body; // Extract data from the request body

    try {
        // Prepare the MySQL query to insert the withdrawal record
        const [result] = await pool.query(
            "INSERT INTO withdrawals (network, address, amount) VALUES (?, ?, ?)", 
            [network, address, amount] // The values to insert into the database
        );

        // Send a success response with the ID of the inserted record
        res.status(201).json({
            message: 'Withdrawal created successfully!',
            withdrawalId: result.insertId, // Return the insert ID
        });
    } catch (error) {
        console.error("Error inserting withdrawal:", error); // Log the error
        res.status(500).json({
            message: 'Failed to create withdrawal',
            error: error.message // Send the error message in the response
        });
    }
};

module.exports = { createWithdrawal }; // Export the controller function
