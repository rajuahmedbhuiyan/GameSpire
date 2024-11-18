

const User = require('../models/user');

const registerController = async (req, res, next) => {

    const { name, email, password, owner } = req.body;
    console.log({ body: req.body })
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid Data' });
    }



    try {
        const isAlreadyExist = await User.findOne({ email });
        console.log({ isAlreadyExist })
        if (isAlreadyExist) {
            return res.status(400).json({ message: 'User Already Exist' });
        }
        const newUser = new User({ name, email, password, owner });
        const user = await newUser.save();


        return res.status(201).json({ message: 'User Created Successfully', user });
    } catch (error) {
        next(error);
    }
};


const allUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate({
            path: 'owner',
            select: 'name email',
        
        });

        return res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}




module.exports = { registerController,allUsers };