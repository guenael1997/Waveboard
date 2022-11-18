const express = require("express");
const app = express();
const http = require("http").createServer(app);

const io = require("socket.io")(http);

app.use(express.static(__dirname+"/public"));

app.route("/")
.get((req,res)=>{
    res.sendFile("index.html");
});

const users = [];
io.on("connection",(socket)=>{
    console.log("utilisateur connecté");
    socket.on("Dessin",(data)=>{
        socket.broadcast.emit("dessin",data)
    });

    socket.on("new user",(name)=>{
        users[socket.id]=name;
        socket.broadcast.emit("new user",name)
    });

    socket.on("new message",(message)=>{
        io.emit("new message",{author:users[socket.id],message:message})
    });

    
})

http.listen(3000,()=>{
    console.log("Serveur OK");
});