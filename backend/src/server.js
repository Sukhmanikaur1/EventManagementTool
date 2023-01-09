const express = require('express');
const app = express();
const {apiServerPort}= require('./config/config')
const DataTypes = require('./model/DataTypes')
const {UserRouter} = require('./routes/UserRoute')
const LangarEventRoute = require('./routes/LangarEventRoute')
const PersonalEventRouter = require('./routes/PersonalEventRoute')
// const EventRouter= require('./routes/EventRoute')
// const BookSlotRouter = require('./routes/BookSlotRoute')
var cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.options('/event', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });
  
app.use(cors())//, function(req, res, next) {
app.use('/user',UserRouter)
app.use('/langar', LangarEventRoute)
app.use('/personalevent',PersonalEventRouter)
// app.use('/event',EventRouter)
// app.use('/book',BookSlotRouter)
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
  //});
console.log(cors())
app.listen(apiServerPort, function(req, res) {
    cors()
    console.log("listening at port:"+apiServerPort);
});