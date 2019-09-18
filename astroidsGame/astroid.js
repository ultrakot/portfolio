let canvas;
let ctx;
let canvasWidth = 1000;
let canvasHeight = 800;
let keys = [];
let ship;



document.addEventListener('DOMContentLoaded', SetupCanvas);



function SetupCanvas(){

    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ship = new Ship();


    document.body.addEventListener("keydown", HandleKeyDown);
    document.body.addEventListener("keyup", HandleKeyUp);

    Render();
}

function HandleKeyDown(e){
    keys[e.keyCode] = true;
}
function HandleKeyUp(e){
    keys[e.keyCode] = false;
}


class Ship{
    constructor(){
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0; 
        this.velY = 0; 
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
    }
    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
    }

    Update(){
        // Get current direction ship is facing
        let radians = this.angle / Math.PI * 180;


        if(this.movingForward){
            this.velX += Math.cos(radians) * this.speed ;
            this.velY += Math.sin(radians) * this.speed ;
        }

        // If ship goes off board place it on the opposite
        // side 
        if(this.x < this.radius){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.radius;
        }
        if(this.y < this.radius){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.radius;
        }

         // Slow ship speed when not holding key
        this.velX *= 0.99;
        this.velY *= 0.99;

        // Change value of x & y while accounting for
        // air friction    
        this.x -= this.velX;
        this.y -= this.velY;
    }

    Draw(){
         
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        // Angle between vertices of the ship
        let vertAngle = ((Math.pi * 2) / 3);

        let radians =  this.angle / Math.PI * 180;

        for(let i = 0; i < 3; i ++){         
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));     
        }
        ctx.closePath();
        ctx.stroke();
    }
}


function Render(){
   // Check if the ship is moving forward
   ship.movingForward = (keys[87]);

  if(keys[68]){
    // d key rotate right
    ship.Rotate(1);     
  }
  if(keys[65]){
    // a key rotate left
    ship.Rotate(-1);     
  }

  ctx.clearRect(0,0,canvasWidth,canvasHeight);

    ship.Update();
    ship.Draw();

  requestAnimationFrame(Render);
}
