const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const authAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ msg: 'Invalid Authentication.' });

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESSTOKENSECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin || admin.role !== 'admin') return res.status(401).json({ msg: 'Admin resources access denied.' });

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authAdmin;