const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Report = require('../models/ReportModel');
const jwt = require('jsonwebtoken');

const adminCtrl = {
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email });
            if (!admin) return res.status(400).json({ msg: "Admin does not exist." });

            if (password !== admin.password) return res.status(400).json({ msg: "Incorrect password." });

            const access_token = createAccessToken({ id: admin._id });
            res.json({
                msg: "Login success!",
                access_token,
                admin: {
                    ...admin._doc,
                    password: ''
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
        
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAllReports: async (req, res) => {
        try {
            const reports = await Report.find().populate('user').populate({
                path: 'post',
                populate: {
                    path: 'user',
                    select: 'fullname email', // Select the fields you want to populate
                },
            });
            res.json(reports);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findByIdAndDelete(id);
            if (!post) return res.status(404).json({ msg: 'Post not found' });
            res.json({ msg: 'Post deleted' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    Post: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            if (!user) return res.status(404).json({ msg: 'User not found' });
            res.json({ msg: 'User deleted' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: '1d' });
};

module.exports = adminCtrl;
