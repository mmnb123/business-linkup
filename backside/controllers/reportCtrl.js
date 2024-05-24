const Report = require('../models/ReportModel'); // Assuming you have a Report model
const Post = require('../models/postModel');

const reportCtrl = {
    reportPost: async (req, res) => {
        try {
            const { postId, reason } = req.body;
            const userId = req.user._id; // Assuming you have user authentication

            // Ensure the post exists
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Create a new report
            const newReport = new Report({
                post: postId,
                user: userId,
                reason,
            });

            await newReport.save();
            res.status(200).json({ message: 'Post reported successfully' });
        } catch (error) {
            console.error('Error reporting post:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = reportCtrl;