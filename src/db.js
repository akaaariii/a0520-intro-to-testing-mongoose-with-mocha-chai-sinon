const mongoose = require('mongoose');

const connect = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    return connection
}

module.exports = {connect, mongoose}