const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).send({message: 'Header not found'});

        const token = header.split('Bearer ')[1];
        if (!token) return res.status(401).send({message: 'Auth token not found'});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).send({message: 'Invalid token'});

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).send({message: 'User not found'});

        res.locals.user = user;
        next();
    }
    catch (err) {
        return res.status(401).send(err.message);
    }
}

module.exports = { checkAuth };