const Contact = require('../models/contact-model')

const contactForm = async (req, res, next) => {
    try{
        const response = req.body;
        await Contact.create(response);
        res.status(201).json({success: true, message: "Form submitted successfully"})
    } catch(err){
     next(err);
    }
}

module.exports = contactForm