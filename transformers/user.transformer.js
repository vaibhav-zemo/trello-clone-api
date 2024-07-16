const userTransformer = {
    transform: (user) => {
        return {
            id: user._id,
            name: user.name,
        }
    }
}

const userListTransformer = {
    transform: (users) => {
        let response = {};
        response.list = users.map(user => {
            return userTransformer.transform(user);
        });
        return response;
    }
}

module.exports = { userListTransformer };