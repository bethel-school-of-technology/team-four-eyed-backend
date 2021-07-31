const jwt = require('jsonwebtoken');
const { Trainers } = require('../models');

const secretKey = 'traineveryday';

module.exports = {
    createJWT: (trainers) => {
        const token = jwt.sign({
            username: trainers.username,
            id: trainers.trainerId
        },
            secretKey,
            {
                expiresIn: '1hr'
            });

        return token;

    },
    verifyUser: (token) => {
        try {
            const decodedPayload = jwt.verify(token, secretKey);
            return Trainers.findByPk(decodedPayload.id);
        } catch (err) {
            return null;
        }
    }
};