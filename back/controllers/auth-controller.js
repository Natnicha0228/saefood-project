const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'qwerty'; // Use environment variable or default value

exports.register = async (req, res, next) => {
    try {
        const { role, firstName, lastName, email, numberphone, password, confirmPassword } = req.body;

        // Check if all required fields are provided
        if (!(role && firstName && lastName && email && numberphone && password && confirmPassword)) {
            throw new Error("Please fill in all fields");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const newUser = await prisma.user.create({
            data: {
                role,
                firstName,
                lastName,
                email,
                numberphone,
                password: hashedPassword, // Store hashed password
            }
        });

        res.json({ msg: 'Registration successful' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Validation
        if (!(email && password)) {
            throw new Error('Email and password must be provided');
        }

        // Find user in the database
        let user = await prisma.user.findUnique({
            where: { email },
        });

        // If user not found, create a new one
        if (!user) {
            throw new Error('Invalid login credentials');
        }

        // Check password
        const pwOk = await bcrypt.compare(password, user.password);
        if (!pwOk) {
            throw new Error('Invalid login credentials');
        }

        // Issue JWT token
        const payload = { id: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.getme = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};
