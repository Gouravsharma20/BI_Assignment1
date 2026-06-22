const initializeDatabase = require("./db/db.connection.js")

const express = require("express")

const app = express()

app.use(express.json())

const eventList = require("./model/EventListings.jsx")

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));




app.get("/",(req,res)=>{
    res.json("Welcome to the list of events")
})

// getiing all events

const allEvents = async() => {
    initializeDatabase()
    try {
        const listOfEvents = await eventList.find()
        return listOfEvents

    } catch(err) {
        console.log("an error occured while getting all events",err)
        throw err
    }
} 

app.get("/events",async(req,res)=>{
    try {
        const events = await allEvents()
        if (!events) {
            return res.status(404).json({error:"all list of events not found"})
        } else {
            return res.status(200).json({message:"list of all events found successfully",EventsList:events})
        }
    } catch(err) {
        return res.status(500).json({error:"an error occured while getting all events",errorDetails:err.message})
    }
})

// add event

const addEvents = async(newEvent) => {
    initializeDatabase()
    try {
        const eventToAdd = new eventList(newEvent)
        const saveEvent = await eventToAdd.save()
        return saveEvent
    } catch(err) {
        console.log("an error occured while adding events",err)
        throw err
    }
}

app.post("/addEvent",async(req,res)=>{
    initializeDatabase()
    try{
        const newEvent = req.body
        const newlyAddedEvent = await addEvents(newEvent)
        if (!newlyAddedEvent) {
            return res.status(404).json({error:"unable to post new event"})
        } else {
            return res.status(201).json({message:"new Event added successfully",newEvent:newlyAddedEvent})
        }
    } catch(err) {
        return res.status(500).json({
            error:"an error occured while adding events",
            errorDetails:err.message
        })
        throw err
    }
})

// get events

const findEvents = async(findEventBy) => {
    initializeDatabase()
    try {
        const foundEvent = await eventList.find(findEventBy)
        if(!foundEvent) {
            console.log("an error occured while finding event")
        } else return foundEvent
    } catch(err) {
        console.log("an error occured while finding event by :",event,err)
        throw err

    }
}

// get event by id

app.get("/events/:id",async(req,res)=>{
    try {
        const foundEvent = await eventList.findById(req.params.id)
        if (foundEvent.length === 0) {
            return res.status(404).json({error:"an error is occuring while finding event by title"})
        } else {
            return res.status(200).json({message:"event found successfully",foundEventDetails:foundEvent})
        }
    } catch(err) {
        return res.status(500).json({error:"an error occured while dinding movie by",findEventBy})
    }
})

// get event by title

app.get("/events/title/:title",async(req,res)=>{
    try {
        const foundTitle = await eventList.findOne({eventTitle:req.params.title})
        if (foundTitle.length === 0) {
            return res.status(404).json({error:"title not found"})
        } else {
            return res.status(200).json({message:"title found successfully",FoundEvent:foundTitle})
        }
    } catch(err) {
        return res.status(500).json({error:"an error occured while finding title",errorDetails:err.message})
    }
})

// get event by type

app.get("/events/eventType/:eventType",async (req,res)=>{
    try {
        const foundevent = await eventList.find({typeOfEvent:req.params.eventType})
        if (foundevent.length === 0) {
            return res.status(404).json({error:"events not found"})
        } else {
            return res.status(200).json({message:"events found successfully",foundevent:foundevent})
        }
    } catch(err) {
        return res.status(500).json({error:"an error occured while geting ",eventType})
    }
})

// get event by type


const PORT = 2216

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})