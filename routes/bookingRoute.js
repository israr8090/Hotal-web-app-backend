const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Booking = require('../models/booking')

const stripe = require('stripe')("sk_test_51P6CRMSHZjHE7fTl40ZkUGfHzQjRhp3CSXYDFae9NOdzigKDXSvcK6AvJahQk1NxR1XTCBRJcYIBTgkBDdFdFANX00AFgGOXkd");
const { v4: uuidv4 } = require('uuid');


////--book room-------------
router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
    // console.log(req.body)

    try {
        const newbooking = new Booking({
            room,
            room: room.roomname,
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
        // console.log(roomtemp)

    }
    catch (error) {
        return res.status(404).json({ error })
    }
});


////------GET Bookings By UserID----------------------------------------------------------------------------
router.post('/getbookingsbyuserid', async (req, res) => {
    const { userid } = req.body
    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
        // console.log(bookings)
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


// ////--------Cancel Booking-------------------
router.post("/cancelbooking", async (req, res) => {
    const { bookingid, roomid } = req.body;
    try {
        const booking = await Booking.findOne({ _id: bookingid });
        booking.status = "cancelled";
        await booking.save();

        const room = await Room.findOne({ _id: roomid });

        const bookings = room.currentbookings;

        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        room.currentbookings = temp;

        await room.save();

        res.send("Your Booking Cancelled Successfully")

    } catch (error) {
        res.status(400).json({ error })
    }
})



module.exports = router;