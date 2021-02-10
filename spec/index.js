require('dotenv').config();
const chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon')

const mongoose = require('mongoose')

before(function(){
    mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
})

after(function(){
    mongoose.connection.close();
})

afterEach(function(){
    sinon.restore();
})

require('./routes/sign-up.spec')