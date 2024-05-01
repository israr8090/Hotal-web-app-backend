const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Booking = require('../models/booking')

////--book room-------------
router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;
    // console.log(req.body)

    try {
        const newbooking = new Booking({
            room,
            room:room.roomname,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '123'
        });


        const booking = await newbooking.save();
        res.send("Room booked Successfully")

        ////---------roomtemp------
        const roomtemp = await Room.findOne({ _id: room._id });

        //--push in currentbooking Array of Room
        roomtemp.currentbookings.push({
            room: room.roomname,
            bookingid: booking._id,
            fromdate: fromdate,
            todate: todate,
            userid: userid,
            status: booking.status
        });

        await roomtemp.save();
        console.log(roomtemp)

    }
    catch (error) {
        return res.status(404).json({ error })
    }
});



////------GET Bookings By UserID----------------------------------------------------------------------------
router.post('/getbookingsbyuserid', async (req, res) => {
    const { userid } = req.body
    try {
        const bookings = await Booking.findOne({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
});


// ////--------Get All Booking-------------------
router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings)
    } catch (error) {
        res.status(400).json({ error })
    }
})



module.exports = router;