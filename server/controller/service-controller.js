const serviceModel = require('../models/serviceModel');

const services = async(req, res, next) => { 
    try {
        const service = await serviceModel.find();
        if(!service){
            return res.status(404).json({message: 'No services found'});
        }
        res.status(200).json(service);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = services;