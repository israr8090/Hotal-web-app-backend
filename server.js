require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectAsyncAwait = require('./db')
const roomsRoute = require('./routes/roomRoute');
const usersRoute = require('./routes/usersRoute')
const bookingRoute = require('./routes/bookingRoute')


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute) 
app.use('/api/bookings', bookingRoute)


app.listen(port, ()=>{ 
    connectAsyncAwait()
    console.log(`Server Running on port ${port}`)
});