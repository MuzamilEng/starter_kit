const { Video, User, VideoLike } = require("../../models");

const like = async (req, res, next) => {
  logger.info("LIKE: LIKE API CALLED");
  try {
    const { videoId } = req.body;
    const userId = req.userData.id;
    if (videoId) {
      const checkVideo = await Video.findOne({ where: { id: videoId } });
      if (checkVideo) {
        const checkLike = await VideoLike.findOne({
          where: { user_id: userId, video_id: videoId },
        });
        if (checkLike) {
          await VideoLike.destroy({ where: { user_id: userId, video_id: videoId } });
          res.status(200).json({
            response: "success",
            likeState: false,
          });
        } else {
          await VideoLike.create({ user_id: userId, video_id: videoId });
          res.status(200).json({
            response: "success",
            likeState: true,
          });
        }
      } else {
        res.status(404).json({
          response: "video not found",
        });
      }
    } else {
      res.status(422).json({
        response: "videoId not present",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "error occured",
    });
  }
};

module.exports = {
  like,
};
