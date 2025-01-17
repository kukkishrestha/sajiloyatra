const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    phone: {
        type: String,
        required: true,
        unique: true
    },
    license:{
        type: String,
        required: true
    }
    
});

const DriverModel = mongoose.model('driver', DriverSchema);
module.exports = DriverModel;