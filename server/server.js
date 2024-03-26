const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./db/connectDB');
const Routes = require('./routes/routes');
const ChatRoutes = require('./routes/ChatRoutes')


const PORT = process.env.PORT || 5000;
const corsoptions = {
    credentials: true,
    origin: 'http://localhost:3000'
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', Routes);
app.use('/chatroom', ChatRoutes);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)

    }
    catch (err) {
        console.log(err);
    }
}
start();

const server = app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      //credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id); //Creating a new room(socket) in user id
        //console.log(userData._id);
        socket.emit('connected')
    })

    socket.on('join chat',(room)=>{ //create room when user clicks on chat
        socket.join(room)
        console.log('User Joined romm : ' + room);
    })

    socket.on('new message',(newMsgRecieve)=>{
        var chat = newMsgRecieve.chat;

        if(!chat.users) return console.log('Users not identified');

        chat.users.forEach(user => {
            if(user._id === newMsgRecieve.sender._id){
                return;
            }

            socket.in(user._id).emit('Msg recieved',newMsgRecieve); // in(user._id)  room --> emit the message //room created in line 52
        });
    })

})



