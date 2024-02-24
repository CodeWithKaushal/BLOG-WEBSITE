import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
// next to use middleware to handle errors
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {

        await newUser.save();
        res.json('signup successfully');

    } catch (error) {
        next(error);
    }


};