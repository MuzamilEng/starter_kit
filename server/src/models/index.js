const Admin = require("./admin");
const User = require("./user");
const UserFriend = require("./userFriend");
const VideoComment = require("./video_comment");
const Post = require("./post");
const Document = require("./document");
const Tag = require("./tags");
const Video = require("./video");
const VideoLike = require("./video_like");
const Like = require("./like");
const Comment = require("./comment");
const CommentReply = require("./commentReply");
const Gift = require("./gift");
const FollowerAndFollowing = require('./followerAndFollowing');



/************************* USER ASSOCIATION **********/
{
    // User Comments
    User.hasMany(Comment, { as: "comments", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    Comment.belongsTo(User, { as: "user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    // User Comment Replies
    User.hasMany(CommentReply, { as: "CommentReplies", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    CommentReply.belongsTo(User, { as: "user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    // User Likes
    User.hasMany(Like, { as: "likes", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    Like.belongsTo(User, { as: "user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    // User Document
    User.hasMany(Document, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    Document.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    // User and Freinds
    User.belongsToMany(User, { as: "user", through: UserFriend, foreignKey: { name: "user_id", allowNull: true } });
    User.belongsToMany(User, { as: "friend", through: UserFriend, foreignKey: { name: "friend_id", allowNull: true } });

    User.hasMany(UserFriend, { as: "userFriend", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    UserFriend.belongsTo(User, { as: "user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    User.hasMany(UserFriend, { as: "friendUser", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "friend_id", allowNull: true } });
    UserFriend.belongsTo(User, { as: "friend", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "friend_id", allowNull: true } });

    // Gift
    User.belongsToMany(Video, { as: "sender", through: Gift, foreignKey: { name: "sender_id", allowNull: true } });
    User.belongsToMany(Video, { as: "reciever", through: Gift, foreignKey: { name: "reciever_id", allowNull: true } });

    User.hasMany(Gift, { as: "sender_gifts", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "sender_id", allowNull: true } });
    Gift.belongsTo(User, { as: "sender_user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "sender_id", allowNull: true } });

    User.hasMany(Gift, { as: "reciever_gifts", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "reciever_id", allowNull: true } });
    Gift.belongsTo(User, { as: "reciever_user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "reciever_id", allowNull: true } });

    // Video
    User.hasMany(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Video.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // Follow and Following
    User.belongsToMany(User, { as: "follower", through: FollowerAndFollowing, foreignKey: { name: "following_id", allowNull: true } });
    User.belongsToMany(User, { as: "following", through: FollowerAndFollowing, foreignKey: { name: "follower_id", allowNull: true } });

    User.hasMany(FollowerAndFollowing, { as: "followers", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "follower_id", allowNull: true } });
    FollowerAndFollowing.belongsTo(User, { as: "following", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "follower_id", allowNull: true } });

    User.hasMany(FollowerAndFollowing, { as: "followings", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "following_id", allowNull: true } });
    FollowerAndFollowing.belongsTo(User, { as: "follower", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "following_id", allowNull: true } });

}

/************************* VIDEO ASSOCIATION **********/
{
    // Tags
    Video.hasMany(Tag, { as: "tags", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });
    Tag.belongsTo(Video, { as: "video", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });

    // Video Likes
    Video.hasMany(VideoLike, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });
    VideoLike.belongsTo(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });

    // Video Comments
    Video.hasMany(VideoComment, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });
    VideoComment.belongsTo(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });

    // Video Posts
    User.hasMany(Post, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "userId" });
    Post.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "userId" });

    // Video Likes
    Video.hasMany(Like, { as: "likes", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });
    Like.belongsTo(Video, { as: "video", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });

    // Video Comments
    Video.hasMany(Comment, { as: "comments", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });
    Comment.belongsTo(Video, { as: "video", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });

    // Gifts
    Video.hasMany(Gift, { as: "gifts", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });
    Gift.belongsTo(Video, { as: "video", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "video_id", allowNull: true } });
}

{
    // Comment Replies
    Comment.hasMany(CommentReply, { as: "commentReplies", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "comment_id", allowNull: true } });
    CommentReply.belongsTo(Comment, { as: "comment", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "comment_id", allowNull: true } });
}

module.exports = {
    Admin,
    User,
    Video,
    VideoLike,
    VideoComment,
    UserFriend,
    Post,
    Document,
    Tag,
    Like,
    Comment,
    CommentReply,
    Gift,
    FollowerAndFollowing
};
