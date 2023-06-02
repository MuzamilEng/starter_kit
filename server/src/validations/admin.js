const joi = require('joi');

// Authentication validation
const signup = {
    body: joi.object({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        profile_image: joi.string().optional(),
    }),
};

const login = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
};

const updateAdmin = {
    body: joi.object({
        first_name: joi.string().optional(),
        last_name: joi.string().optional(),
        role: joi.string().optional(),
        active: joi.boolean().optional(),
        profile_image: joi.string().optional(),
    })
};

// User operations validation
const getUsers = {
    query: joi.object({
        limit: joi.number().optional(),
        offset: joi.number().optional(),
        id: joi.number().optional(),
    }),
};

const awardDiamonds = {
    body: joi.object({
        diamondsToGive: joi.number().required(),
    }),
    params: joi.object({
        id: joi.number().required(),
    })
};

module.exports = {
    signup,
    login,
    updateAdmin,
    getUsers,
    awardDiamonds
}