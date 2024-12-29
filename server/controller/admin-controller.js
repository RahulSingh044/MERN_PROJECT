const User = require('../models/user-model')
const Contact = require('../models/contact-model');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select({password:0});
        if(!users || users.length ===0){
            return res.status(404).json({message:'No users found'})
        }
        return res.status(200).json(users);
    } 
    catch (error) {
        next(error);
    }
}

const getAllContact = async (req, res, next) => { 
    try {
        const contacts = await Contact.find()
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message:'No contacts found'})
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

const getUserbyID = async(req, res, next) => { 
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password:0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const updateUserbyID = async (req, res, next) => { 
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updateduser = await User.findByIdAndUpdate(id, updateData, {new:true});

        res.status(200).json({updateduser,ok:true});

    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => { 
    try {
        const userId = req.params.id;
        await User.deleteOne({ _id: userId})
        return res.status(200).json({message:'User deleted successfully', ok:true});
    } catch (error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => { 
    try {
        const contactId = req.params.id;
        await Contact.deleteOne({_id: contactId})
        return res.status(200).json({message:'Contact deleted successfully', success:true});
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, getAllContact, deleteUser, getUserbyID, updateUserbyID, deleteContact};