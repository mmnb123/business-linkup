// const expressAsyncHandler = require('express-async-handler');
// const Post = require('../models/postModel');
// const User = require('../models/userModel');
// const Comment = require('../models/commentModel');

// const statsCtrl = {
//     getUserStats: expressAsyncHandler(async (req, res) => {
//         try {
//             const userId = req.user._id;
//             const { duration } = req.query;

//             console.log('Fetching user stats for user:', userId);
//             console.log('Requested duration:', duration);

//             const now = new Date();
//             let startDate;

//             if (duration === 'week') {
//                 startDate = new Date(now.setDate(now.getDate() - 7));
//             } else if (duration === 'month') {
//                 startDate = new Date(now.setMonth(now.getMonth() - 1));
//             } else if (duration === 'day') {
//                 startDate = new Date(now.setDate(now.getDate() - 1));
//             } else {
//                 startDate = new Date(0); // Default to get all-time stats if no duration is provided
//             }

//             console.log('Start date:', startDate);

//             const posts = await Post.find({ user: userId, createdAt: { $gte: startDate } });
//             console.log('Posts found:', posts.length);
//             const postIds = posts.map(post => post._id);

//             const likes = posts.reduce((acc, post) => acc + post.likes.length, 0);
//             console.log('Total likes:', likes);

//             const comments = await Comment.countDocuments({ postId: { $in: postIds }, createdAt: { $gte: startDate } });
//             console.log('Total comments:', comments);

//             const user = await User.findById(userId);
//             console.log('User found:', user);
//             const friends = user.friends.length;
//             const following = user.following.length;

//             res.json({
//                 friends,
//                 following,
//                 posts: posts.length,
//                 likes,
//                 comments,
//             });
//         } catch (error) {
//             console.error('Error fetching user stats:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }),
// };

// module.exports = statsCtrl;
const expressAsyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

const statsCtrl = {
    getUserStats: expressAsyncHandler(async (req, res) => {
        try {
            const userId = req.user._id;
            const { duration } = req.query;

            console.log('Fetching user stats for user:', userId);
            console.log('Requested duration:', duration);

            const now = new Date();
            let startDate;
            let prevStartDate;
            let prevEndDate;

            if (duration === 'week') {
                startDate = new Date(now.setDate(now.getDate() - 7));
                prevEndDate = new Date(startDate);
                prevStartDate = new Date(prevEndDate.setDate(prevEndDate.getDate() - 7));
            } else if (duration === 'month') {
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                prevEndDate = new Date(startDate);
                prevStartDate = new Date(prevEndDate.setMonth(prevEndDate.getMonth() - 1));
            } else if (duration === 'day') {
                startDate = new Date(now.setDate(now.getDate() - 1));
                prevEndDate = new Date(startDate);
                prevStartDate = new Date(prevEndDate.setDate(prevEndDate.getDate() - 1));
            } else {
                startDate = new Date(0); // Default to get all-time stats if no duration is provided
                prevStartDate = new Date(0);
                prevEndDate = new Date(0);
            }

            console.log('Start date:', startDate);
            console.log('Previous start date:', prevStartDate);
            console.log('Previous end date:', prevEndDate);

            // Current period stats
            const posts = await Post.find({ user: userId, createdAt: { $gte: startDate } });
            console.log('Posts found:', posts.length);
            const postIds = posts.map(post => post._id);

            const likes = posts.reduce((acc, post) => acc + post.likes.length, 0);
            console.log('Total likes:', likes);

            const comments = await Comment.countDocuments({ postId: { $in: postIds }, createdAt: { $gte: startDate } });
            console.log('Total comments:', comments);

            // Previous period stats
            const prevPosts = await Post.find({ user: userId, createdAt: { $gte: prevStartDate, $lt: startDate } });
            console.log('Previous period posts found:', prevPosts.length);
            const prevPostIds = prevPosts.map(post => post._id);

            const prevLikes = prevPosts.reduce((acc, post) => acc + post.likes.length, 0);
            console.log('Previous total likes:', prevLikes);

            const prevComments = await Comment.countDocuments({ postId: { $in: prevPostIds }, createdAt: { $gte: prevStartDate, $lt: startDate } });
            console.log('Previous total comments:', prevComments);

            const user = await User.findById(userId);
            console.log('User found:', user);
            const friends = user.friends.length;
            const following = user.following.length;

            res.json({
                current: {
                    friends,
                    following,
                    posts: posts.length,
                    likes,
                    comments,
                },
                previous: {
                    friends: friends, // Assuming friends and following don't change dramatically over short periods
                    following: following,
                    posts: prevPosts.length,
                    likes: prevLikes,
                    comments: prevComments,
                },
            });
        } catch (error) {
            console.error('Error fetching user stats:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};

module.exports = statsCtrl;