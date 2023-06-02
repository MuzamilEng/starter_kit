const joi = require('joi');

const signup = {
    body: joi.object({
        user_name: joi.string().required(),
        email: joi.string().optional(),
        phone: joi.string().optional(),
        bio: joi.string().optional(),
        firebase_uid: joi.string().required(),
        token: joi.string().required(),
        profile_image: joi.string().optional(),
        intro_video: joi.string().optional(),
        id_type: joi.string().optional(),
        id_number: joi.string().optional(),
        language: joi.string().optional(),
        avatar: joi.string().optional(),
        country: joi.string().optional(),
        countryCode: joi.string().optional(),
        lat: joi.string().optional(),
        lng: joi.string().optional(),
        DOB: joi.string().optional(),
        gender: joi.string().optional(),
        id_attachement: joi.string().optional(),
        secret_sign: joi.string().optional(),
        id_verified: joi.boolean().optional(),
    }),
};

const login = {
    body: joi.object({
        email: joi.string().optional(),
        firebase_uid: joi.string().required(),
        token: joi.string().required(),
    }),
};

const updateUser = {
    body: joi.object({
        user_name: joi.string().optional(),
        email: joi.string().optional(),
        phone: joi.string().optional(),
        bio: joi.string().optional(),
        firebase_uid: joi.string().optional(),
        token: joi.string().required(),
        profile_image: joi.string().optional(),
        intro_video: joi.string().optional(),
        id_type: joi.string().optional(),
        id_number: joi.string().optional(),
        language: joi.string().optional(),
        avatar: joi.string().optional(),
        country: joi.string().optional(),
        countryCode: joi.string().optional(),
        lat: joi.string().optional(),
        lng: joi.string().optional(),
        DOB: joi.string().optional(),
        gender: joi.string().optional(),
        id_attachement: joi.string().optional(),
        secret_sign: joi.string().optional(),
        id_verified: joi.boolean().optional(),
    }),
};

const userInfoById = {
    params: joi.object({
        user_id: joi.number().optional(),
    }),
};

module.exports = {
    signup,
    login,
    updateUser,
    userInfoById
}