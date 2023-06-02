const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary=require("cloudinary").v2

const { userAuth } = require('../middlewares/auth');
// const upload = require('../middlewares/uploadData');
const videoApis2 = require('../controllers/version 2.0/videos');
const validate = require('../middlewares/validate');
const videoValidation = require('../validations/video');

/************************************* CONTROLLER VERSION 2.0 */
// router.post(
//   "/video",
//   upload.fields([
//     { name: "source", maxCount: 1, optional: true },
//     { name: "cover", maxCount: 1, optional: true },
//   ]),
//   validate(videoValidation.uploadVideo),
//   videoApis2.uploadVideo
// );

// Here is the code for uploading the video
cloudinary.config({
  cloud_name: "dhkl3gjbs",
  api_key: "186277285738544",
  api_secret: "IKoKc-pKt9XF8dNdJbE3TeA9WyM",
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name for the uploaded file
  },
});

const upload = multer({ storage: storage });

router.post("/uploadvideo", upload.single("video"), async (req, res) => {
  try {
    // upload the video to Cloudinary
    console.log("in try"+req.file.path)
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    // delete the local file after successful upload to Cloudinary
    fs.unlinkSync(req.file.path);

    // return the Cloudinary URL for the uploaded video
    res.json({ url: result.secure_url });
  } catch (err) {
    console.log("in catch")
    console.error(err);
    res.status(500).send("Error uploading video to Cloudinary");
  }
});

// Here is the code for getting all the uploaded videos

router.get("/getvideos", async (req, res) => {
  try {
    // get all the video resources from Cloudinary
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "video",
    });

    // return the URLs of all the videos
    const videoUrls = result.resources.map((resource) => resource.secure_url);
    res.json(videoUrls);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting videos from Cloudinary");
  }
});

router.get("/userAllVideos", userAuth, videoApis2.getAllUserVideos);
router.get("/userPostedImages", validate(videoValidation.getUserPostedImages), videoApis2.getUserPostedImages);
router.get("/allVideos", videoApis2.allVideos);
router.get("/video", userAuth, validate(videoValidation.getVideo), videoApis2.getVideo);
router.patch("/video/:videoId", userAuth, validate(videoValidation.updateVideo), videoApis2.updateVideo);
router.delete("/video", userAuth, validate(videoValidation.deleteVideo), videoApis2.deleteVideo);

router.post("/like/:video_id", userAuth, validate(videoValidation.likeVideo), videoApis2.likeVideo);
router.post("/comment/:video_id", userAuth, validate(videoValidation.commentVideo), videoApis2.commentVideo);
router.post("/replyComment/:comment_id", userAuth, validate(videoValidation.replyComment), videoApis2.replyComment);
router.get("/involvedVideos", userAuth, videoApis2.userInvolvedVideos);
router.get("/allComments/:video_id", userAuth, validate(videoValidation.allComments), videoApis2.allComments);
router.post('/giftVideo', userAuth, validate(videoValidation.giftVideo), videoApis2.giftVideo);
router.get("/searchAllVideos", userAuth, validate(videoValidation.searchAllVideos), videoApis2.searchAllVideos);
router.get("/searchVideosFromProfile", userAuth, validate(videoValidation.searchVideosFromProfile), videoApis2.searchVideosFromProfile);
router.get("/userInvolvedVideosById/:user_id", userAuth, videoApis2.userInvolvedVideosById);
router.get("/stats/:video_id", userAuth, validate(videoValidation.videoStats), videoApis2.videoStats);

module.exports = router;
