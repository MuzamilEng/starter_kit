const joi = require('joi');

const uploadVideo = {
    body: joi.object({
        mediaType: joi.string().optional(),
        postedDateTime: joi.string().optional(),
        commentsEnabled: joi.string().optional(),
        cover: joi.string().optional(),
        tags: joi.string().optional(),
        status: joi.string().required(),
        postedDateTime: joi.date().optional(),

    }),
};

const updateVideo = {
    body: joi.object({
        status: joi.string().optional(),
        mediaType: joi.string().optional(),
        postedDateTime: joi.string().optional(),
        commentsEnabled: joi.string().optional(),
        cover: joi.string().optional(),
        tags: joi.string().optional(),
        postedDateTime: joi.date().optional(),
    }),
    params: joi.object({
        id: joi.number().required(),
    }),
};

const getVideo = {
    query: joi.object({
        limit: joi.number().optional(),
        page: joi.number().optional(),
        video_id: joi.number().optional(),
        user_id: joi.number().optional(),
        status: joi.string().optional(),
    }),
};

const getUserPostedImages = {
    query: joi.object({
        limit: joi.number().optional(),
        page: joi.number().optional(),
        status: joi.string().optional(),
    }),
};

const deleteVideo = {
    params: joi.object({
        id: joi.number().required(),
    }),
};

const likeVideo = {
    params: joi.object({
        video_id: joi.number().optional(),
    }),
    body: joi.object({
        status: joi.boolean().optional(),
    }),
};

const commentVideo = {
    body: joi.object({
        comment: joi.string().optional(),
    }),
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};

const replyComment = {
    body: joi.object({
        comment_id: joi.number().optional(),
        reply: joi.string().optional(),
    }),
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};

const allComments = {
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};

const giftVideo = {
    body: joi.object({
        to_user_id: joi.number().optional(),
        to_video_id: joi.number().required(),
        num_of_diamonds: joi.number().required(),
    }),
};

const searchAllVideos = {
    query: joi.object({
        keyword: joi.string().optional(),
    }),
};

const searchVideosFromProfile = {
    query: joi.object({
        status: joi.string().optional(),
        keyword: joi.string().optional(),
    }),
};

const videoStats = {
    params: joi.object({
        video_id: joi.number().required(),
    }),
};

module.exports = {
    uploadVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    likeVideo,
    commentVideo,
    replyComment,
    allComments,
    giftVideo,
    getUserPostedImages,
    searchAllVideos,
    searchVideosFromProfile,
    videoStats
}