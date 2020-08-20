var myShip;

function startGame() {
    myGameArea.start();
    myShip = new component(30, 30, "red", 230, 600);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 650;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea,20);
        window.addEventListener('keydown',function(e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){    
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea(){
    myGameArea.clear();
    myShip.speedX = 0;
    myShip.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37){
        myShip.speedX = -2;
    }
    if (myGameArea.key && myGameArea.key == 39){
        myShip.speedX = 2;
    }
    myShip.newPos();
    myShip.update();
}