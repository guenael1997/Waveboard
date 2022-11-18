$(()=>{
    const socket = io.connect();

    $("#form").submit((e)=>{
        e.preventDefault();
        socket.emit("new user",$("#newTxtUser").val());
        $("#newTxtUser").val("");
    })

    $("#form2").submit((e)=>{
        e.preventDefault();
        socket.emit("new message",$("#txtChatMsg").val());
        $("#txtChatMsg").val("");
    })

    socket.on("new user",(name)=> {
        $("#chatB").append($("<p>").text(name + " is connected !"));
    })

    socket.on("new message",(data)=> {
        $("#chatB").append($("<p>").html("<h1>"+data.author+"</h1>"+" "+data.message));
    })
})