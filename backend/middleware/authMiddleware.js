import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
try {
const bearer = req.headers.authorization;
if (!bearer || !bearer.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });


const token = bearer.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id).select('-password');
if (!user) return res.status(401).json({ message: 'Not authorized' });


req.user = user;
next();
} catch (err) {
console.error(err);
res.status(401).json({ message: 'Token invalid or expired' });
}
};


export const adminOnly = (req, res, next) => {
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
next();
};