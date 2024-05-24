require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const commentRouter = require('./routers/commentRouter');
const notifyRouter = require('./routers/notifyRouter');
const messageRouter = require('./routers/messageRouter');
const admin= require('./routers/adminRouter');
const statsRoutes = require('./routers/stateRouter');
const reportRoute=require('./routers/reportRouter');
const socketServer = require("./socketServer");

const app = express();

app.use(express.json()); // for body parsing..
app.use(cors());
app.use(cookieparser());

//routes
const http = require('http').createServer(app)
 const io = require('socket.io')(http)

app.use('/api',authRouter)
app.use('/api',userRouter)
app.use('/api',postRouter)
app.use('/api',commentRouter)
app.use('/api',notifyRouter)
app.use('/api',messageRouter)
app.use('/api', statsRoutes);
app.use('/api',reportRoute);
app.use('/api',admin)


const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

io.on('connection', socket=>{
  socketServer(socket)
})

// mongoose.connect(
//   "mongodb://localhost:27017/nc",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   },
//   (err) => {
//     if (err) {
//       console.error("Error connecting to database:", err);
//     } else {
//       console.log("Connected successfully!");
//     }
//   }
// );

//mongoose.connect("mongodb://localhost:27017/nc")

 //   .then(() => console.log('Connected Successfully!'))
 //   .catch((err) => console.log(err));

mongoose.connect(
 URL,
 {
   useCreateIndex: true,
   useFindAndModify: false,
   useNewUrlParser: true,
   useUnifiedTopology: true,
 },
 (err) => {
   if (err) throw err;
   console.log("db is connected");
 }
);



http.listen(port, () => {
  console.log(`app is running on ${port}`);
});
