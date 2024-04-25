const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://israr8090:n2AfpEj2o3T89ULx@israrcluster.xqlk17h.mongodb.net/baba-room';

const connectAsyncAwait = async () => {
    try {
        const resp = await mongoose.connect(mongoURL);
        console.log('connected with DB Successfully');
    } catch (error) {
        console.log(`Error Occored ${error}`)
    }
};

module.exports = connectAsyncAwait;