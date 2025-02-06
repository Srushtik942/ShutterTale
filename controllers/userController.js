const { users: userModel } = require('../models');

// Service function to check if user exists
const doesUserExist = async (email) => {
    const user = await userModel.findOne({ where: { email } });
    return !!user;
};

// Controller function to create a new user
const createNewUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate request body
        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required!" });
        }

        // Check if user already exists
        if (await doesUserExist(email)) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create new user
        const newUser = await userModel.create({ username, email });

        return res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!", error: error.message }); // Fix: Removed redundant "error" key
    }
};

module.exports = { createNewUser };
