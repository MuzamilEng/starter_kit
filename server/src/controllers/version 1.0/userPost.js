const { User, Post, VideoComment, VideoLike } = require('../../models');
const logger = require('../../utils/logger');

const getAllPosts = async (req, res, next) => {
  logger.info("POSTS: GET ALL POSTS API CALLED");
  try {
    const userPost = await User.findOne({
      where: { id: req.params.userId },
      attributes: ['id'],
      include: [{ model: Post, attributes: { exclude: ['userId'] } }],
    })
    if (userPost) {
      res.status(200).json({
        userId: userPost.id,
        posts: userPost.posts,
      })
    } else {
      res.status(404).json({
        response: 'User does not exist',
      })
    }
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      response: 'an error occured',
    })
  }
}

const getFeeds = async (req, res, next) => {
  logger.info("POSTS: GET FEEDS API CALLED");
  const userId = req.params.userId
  try {
    const allFriends = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'first_name', 'last_name'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
          as: 'friend',
          include: [
            {
              model: Post,
              include: [
                { model: VideoComment, attributes: { exclude: ['postId'] } },
                {
                  model: VideoLike,
                  attributes: { exclude: ['postId'] },
                },
              ],
              attributes: { exclude: ['userId'] },
            },
          ],
          through: { attributes: [] },
        },
      ],
    })
    let postArr = []
    const allFriend = JSON.parse(JSON.stringify(allFriends))
    if (allFriend) {
      allFriend.friend.forEach(friend => {
        friend.posts.forEach(post => {
          postArr.push({
            user: {
              first_name: friend.first_name,
              last_name: friend.last_name,
              id: friend.id,
            },
            ...post,
          })
        })
      })
      const sortedArr = postArr.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      res.status(200).json({ feed: sortedArr })
    } else {
      res.status(404).json({ response: 'no friend added yet' })
    }
  } catch (error) {
    logger.error(error)
    res.status(500).json({ response: 'error occured' })
  }
}

module.exports = {
  getAllPosts,
  getFeeds,
}
