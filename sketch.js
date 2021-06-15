
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, scenary, scenaryImage
var FoodGroup, obstacleGroup
var score=0
var PLAY = 0
var gameState = 0
var END
var lifetime 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclemage = loadImage("obstacle.png");
  scenaryImage = loadImage("th (7).jpg")
  gameover = loadImage("mn.jpg")
  over = loadSound("mixkit-funny-fail-low-tone-2876.wav")
  touching = loadSound("mixkit-explainer-video-game-alert-sweep-236.wav")
  jump = loadSound("mixkit-player-jumping-in-a-video-game-2043.wav")
 
}



function setup() {
  createCanvas(450, 450)
 
    scenary = createSprite(225,225)
  scenary.addImage(scenaryImage)
  scenary.scale = 2.9
  scenary.velocityX = -3
  
  

  
  
  
  monkey = createSprite(50, 225)
  monkey.addAnimation("monkey_running", monkey_running)
  monkey.scale = 0.12 
  
  
  ground = createSprite(450, 265, 900, 10)
  ground.velocityX = -10
ground.visible = false;
  ground.velocityX = -(6 + score/5);
  


  
 obstacleGroup = new Group()
  foodGroup = new Group()

  


}


function draw() {
background("white")
  
    monkey.collide(ground)
  obstacleGroup.collide(ground)
  spawnObstacles()
  spawnBanana()
  
  
  
  
  
    if(ground.x<0) {
    ground.x = ground.width/2
  }


  if(scenary.x<0) {
     scenary.x = scenary.width/2
  }
  if(gameState == PLAY) {
    lifetime = Math.round(frameCount/18)
  }
  
  if(keyDown("space") && monkey.y >= 190) {
    monkey.velocityY =  -20
    jump.play()
  }
    monkey.velocityY = monkey.velocityY + 0.8 
  
  if(foodGroup.isTouching(monkey)) {
    score = score+1
    foodGroup.destroyEach()
    gameState = PLAY
    touching.play()
  }
  if(obstacleGroup.isTouching(monkey)){
   over.play()
    scenary.velocityX = 0
    ground.velocityX = 0
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    foodGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    gameOver = createSprite(225,225)
    gameOver.addImage(gameover)
    gameOver.visible = true
    gameOver.scale = 0.7
    gameState = END
  }

 
  
drawSprites()
  
  
  textSize(20)
  fill("white")
  stroke("blue")
  strokeWeight(5)
  text("SURVIVAL TIME : " + lifetime + " sec", 205, 20)
  text("BANANAS EATEN : " + score, 229, 50)
  
}
function spawnObstacles() {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(500,265)
  obstacle.addImage(obstaclemage)
  obstacle.scale = 0.1
  obstacle.velocityX = -3
    obstacle.lifetime = 175
    
    obstacleGroup.add(obstacle)
  }
}
function spawnBanana() {
  
  if(frameCount % 120 ==0) {
    banana = createSprite(500, 140)
    banana.addImage(bananaImage)
    banana.y= Math.round(random(149, 226))
    banana.scale = 0.1
    banana.velocityX = -3
    banana.lifetime = 175
    
   foodGroup.add(banana)
  }
  
}




