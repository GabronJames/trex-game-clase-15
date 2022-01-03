var trex,treximg
var piso,pisoimg,piso2
var cloudimg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var state = "playing"
var grupodeobstacles 
var grupodenubes
var treximgchoca
var gameOver1 

function preload(){
  treximg = loadAnimation("Sprites/trex1.png","Sprites/trex3.png","Sprites/trex4.png")

  pisoimg = loadImage ("Sprites/ground2.png")

  cloudimg = loadImage ("Sprites/cloud.png")

  obstacle1 = loadImage ("Sprites/obstacle1.png")

  obstacle2 = loadImage ("Sprites/obstacle2.png")

  obstacle3 = loadImage ("Sprites/obstacle3.png")

  obstacle4 = loadImage ("Sprites/obstacle4.png")

  obstacle5 = loadImage ("Sprites/obstacle5.png")

  obstacle6 = loadImage ("Sprites/obstacle6.png")

  treximgchoca = loadImage ("Sprites/trex_collided.png")

  gameOver1 = loadImage ("Sprites/gameOver.png")
}


function setup() {
  createCanvas(600,200);
  trex = createSprite (50,160,50,50)
  trex.addAnimation("trexcorre",treximg)
  trex.addImage("trex_collide",treximgchoca)
  trex.scale = 0.7

  piso = createSprite (50,160,50,50)
  piso.scale = 0.5
  piso.addImage("pisodesierto",pisoimg)

  piso2 = createSprite (50,180,50,50)
  piso2.scale = 0.5
  piso2.visible = false

 

  gropodenubes = new Group();
  grupodeobstacles = new Group();
  
}


function draw() 
{
  background(rgb(135, 206, 250));
  drawSprites ()
  console.log("trex",trex.y)
  trex.collide (piso2)

  if (state === "playing"){

    if (keyDown ("space") && trex.y >= 125){
      trex.velocityY = -10
    }
    trex.velocityY += 0.5
    piso.velocityX = -7
  
    if (piso.x <0){
     piso.x = piso.width/2
    }
    popNube();
  
    obstacles();

    if (grupodeobstacles.isTouching(trex)){

    state = "gameOver"
    }
   

  }



  if (state === "gameOver"){
piso.velocityX = 0
trex.velocityY = 0
grupodeobstacles.setVelocityXEach (0)  
//grupodenubes.setVelocityXEach (0) 
gameOver = createSprite (300,100)
gameOver.addImage("gameOver1",gameOver1)
trex.changeImage(treximgchoca)
}
}

function popNube(){
  if (frameCount %100 === 0){
  var popNubee
  popNubee = createSprite (700,50,10,10)
  popNubee.y = Math.round(random(10,90))
  popNubee.velocityX = -7
  popNubee.addImage(cloudimg)
  trex.depth = popNubee.depth 
  trex.depth = trex.depth + 1 
  popNubee.lifetime = 150
  //grupodenubes.add(popNubee)
}
}

function obstacles(){
  if (frameCount %100 === 0){
  var obstacle
 obstacle = createSprite (600,135,50,50)
 obstacle.velocityX = -7
obstacle.scale = 0.8
obstacle.lifetime = 150
 var numeroAleatorio = Math.round(random(1,6))


 switch(numeroAleatorio){

  
 case 1:obstacle.addImage(obstacle1)
break

case 2:obstacle.addImage(obstacle2)
break

case 3:obstacle.addImage(obstacle3)
break

case 4:obstacle.addImage(obstacle4)
break

case 5:obstacle.addImage(obstacle5)
break

case 6:obstacle.addImage(obstacle6)
break

default:break
 }
 grupodeobstacles.add(obstacle)  

}
}