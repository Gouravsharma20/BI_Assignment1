const mongoose = require ("mongoose")

const meetUpModel = new mongoose.Schema({
    eventTitle:String,
    typeOfEvent:{type:String,enum:["offline","online"]},
    thumbnail:String,
    eventImage:String,
    hostedBy:String,
    modelDetails:String,
    dressCode:String,
    ageRestrictions:String,
    eventTags:{type:[String],default:[]},
    marketingCity:String,
    marketingAddress:String,
    marketingPrice:Number,
    eventStartTime:Date,
    eventDateTime:Date,
    eventEndTime:Date,
    speakers:[{
        speakerName:String,
        speakerimage:String,
        speakerPosition:String
    }]
    
},{timestamps:true})



const meetUpSchema = mongoose.model("meetUp",meetUpModel)

module.exports = meetUpSchema