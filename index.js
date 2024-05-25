const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const authRoutes =require('./routes/auth.js');


const PORT = process.env.PORT ||  5000;
dotenv.config()

const app = express()


app.use(bodyParser.json())

// connect to mongodb
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('connected to mongodb'))
.catch(() => console.log('mongodb is not connected',console.error()))


app.get('/',(req,res) => {
    res.send("server is running successfull")
})

//routes
app.use('/api/auth' , authRoutes);

app.listen(PORT , ()=>{
console.log(`app running on the port is ${PORT}`);
})