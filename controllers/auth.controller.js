const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

const register = async (req, res) => {
    try {
        const { error } = registerValidator.validate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        const { email, password, name } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(400).send({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        return res.status(201).send({ message: 'User created successfully!' });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

const login = async (req, res) => {
    try {
        const { error } = loginValidator.validate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid password!' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).send({ user: { userId: user._id, name: user.name, email: user.email }, token });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports = { register, login };