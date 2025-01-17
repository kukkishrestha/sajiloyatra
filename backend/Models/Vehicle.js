const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({

    	name: String,
        car: String,
        Rent:Number,
        capacity: Number,	
        status: String, 	
        option: String,
        image: String
      
})

const VehicleModel = mongoose.model("vehicles", VehicleSchema)
module.exports= VehicleModel