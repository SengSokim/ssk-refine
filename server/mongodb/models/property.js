import mongoose from "mongoose";


autoIncrement = require('mongoose-auto-increment');
const PropertySchema = new mongoose.Schema({
    title: {type: String,require: true},
    description: {type: String,require: true},
    propertyType: {type: String,require: true},
    quantity: {type: Number,require: true},
    price: {type: Number,require: true},
    photo: {type: String,require: true},
    creator: {type: mongoose.Schema.Types.ObjectId ,ref: 'User'},
})
PropertySchema.plugin(autoIncrement.plugin, { model: 'Property', field: 'itemId' });
const propertyModel = mongoose.model('Property', PropertySchema);

export default propertyModel