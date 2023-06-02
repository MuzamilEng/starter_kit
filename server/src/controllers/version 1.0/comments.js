// const { Video, User, VideoComment } = require("../models");
const Video = require("../../models/video");
const User = require("../../models/user");
const VideoComment = require("../../models/video_comment");
const logger = require("../../utils/logger");

const createComment = async (req, res, next) => {
  logger.info("COMMENT: CREATE COMMENT API CALLED");
  const { video_id, comment } = req.body;
  try {
    const findVideo = await Video.findOne({ where: { id: video_id } });
    if (findVideo) {
      if (comment) {
        const commentCreated = await VideoComment.create({
          comment,
          video_id,
          user_id: req.userData.id,
        });
        res.status(200).json({
          response: "success",
          comment: commentCreated,
        });
      } else {
        res.status(422).json({
          response: "text not present",
        });
      }
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      response: "error occured",
    });
  }
};

const editComment = async (req, res, next) => {
  logger.info("COMMENT: EDIT COMMENT API CALLED");
  try {
    const [updateComment] = await VideoComment.update(
      { comment: req.body.comment },
      { where: { id: req.params.commentId, user_id: req.userData.id } }
    );
    if (updateComment) {
      res.status(200).json({
        response: "comment Updated successfully",
      });
    } else {
      res.status(404).json({
        response: "VideoComment not found.",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      response: "error occured",
    });
  }
};

module.exports = {
  createComment,
  editComment,
};
