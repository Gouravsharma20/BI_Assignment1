const mongoose = require ("mongoose")

const meetUpModel = new mongoose.Schema({
    eventTitle:String,
    typeOfEvent:{type:String,enum:["offline","online"]},
    thumbnail:String,
    eventImage:String
},{timestamps:true})



const meetUpSchema = mongoose.model("meetUp",meetUpModel)

module.exports = meetUpSchema