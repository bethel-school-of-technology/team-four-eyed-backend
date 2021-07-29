const jwt = require('jsonwebtoken');
const { Trainers } = require('../models');

const secretKey = 'traineveryday';

module.exports = {
    createJWT: (trainers) => {
        const token = jwt.sign({
            username: trainers.username,
            id: trainers.id
        },
        secretKey,
        {
            expiresIn: '1h'
        });

        return token;

    },
    verifyUser: (token) => {
        const decodedPayload = jwt.verify(token, secretKey);
        return Trainers.findByPk(decodedPayload.id);
    }, catch (err) {
        console.log(err);
        return null;
    }
    
}; 