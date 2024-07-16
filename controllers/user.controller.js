const User = require('../models/user.model');
const { userListTransformer } = require('../transformers/user.transformer');

const list = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(userListTransformer.transform(users));
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

module.exports = { list };