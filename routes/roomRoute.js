const express = require('express')
const router = express.Router();

const Room = require('../models/room')

//////------------------post for add new room
router.post('/addroom', async(req, res)=>{
    try {
        // console.log(req.body)
        const newroom = new Room(req.body)
        await newroom.save()
    
        res.send('New Room Added Successfully')
        console.log('New Room Added Successfully')

    } catch (error) {
        return res.status(400).json({error})
    }

})

////--get all rooms---
router.get("/getallrooms", async (req, res)=>{
    try {
        const rooms = await Room.find({});
        res.send(rooms);

    } catch (error) {
        return res.status(400).json({message: error})
    }
});

////--get one room by id
router.post("/getroombyid", async (req, res)=>{
    try {
        const {_id} = req.body
        const room = await Room.findOne({_id});
        // console.log(room)
        res.send(room);

    } catch (error) {
        return res.status(400).json({message: error})
    }
});



module.exports = router;