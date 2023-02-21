import mongoose from "mongoose";



const PropertySchema = new mongoose.Schema({
    title: {type: String,require: true},
    description: {type: String,require: true},
    propertyType: {type: String,require: true},
    quantity: {type: Number,require: true},
    price: {type: Number,require: true},
    photo: {type: String,require: true},
    creator: {type: mongoose.Schema.Types.ObjectId ,ref: 'User'},
},{timestamps:true})

const propertyModel = mongoose.model('Property', PropertySchema);

export default propertyModel