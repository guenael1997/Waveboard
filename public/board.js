const Socket = io.connect();

function drawlLine(context,x1,y1,x2,y2,color){
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.strokeStyle = color;
    context.stroke();
}

document.addEventListener("DOMContentLoaded",()=>{
    //Couleur du crayon
    var color;
    document.getElementById("1").addEventListener("click",()=> {
        color = "skyblue";
    })

    document.getElementById("2").addEventListener("click",()=> {
        color = "mediumpurple";
    })

    document.getElementById("3").addEventListener("click",()=> {
        color = "greenyellow";
    })

    document.getElementById("4").addEventListener("click",()=> {
        color = "rosybrown";
    })

    //initialisation du canvas
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    var boolDraw = false ;
    var x,y,oldx,oldy;

    //evenement de dessin
    canvas.onmousedown = (e)=> {
        boolDraw = true ;
        oldx = x ;
        oldy = y ;
    }

    canvas.onmouseup = (e)=> {
        boolDraw = false ;
    }

    canvas.onmousemove = (e)=> {
        x = e.clientX;
        y=e.clientY;
        if(boolDraw){
            Socket.emit("Dessin",{
                'x1': oldx,
                'y1':oldy,
                'x2':x,
                'y2':y,
                'color':color
            })
            drawlLine(context,oldx,oldy,x,y,color);
            oldx = x ;
            oldy = y ;
        }
    }

    Socket.on("dessin",(data)=>{
        drawlLine(context,data.x1,data.y1,data.x2,data.y2,data.color);
    })
});