const jwt = require('jsonwebtoken');

const secretKey = 'traineveryday';

module.exports = {
    createJWT: (user) => {
        const token = jwt.sign({
            username: user.username,
            id: user.id
        },
        secretKey,
        {
            expiresIn: '1h'
        });

        return token;

    },
    verifyUser: () => {}
};