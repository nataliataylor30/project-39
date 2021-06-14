
var monkey , monkeyRunning;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var survivalTime = 0;
var score = 0; 

var jungle, jungleImage

function preload(){
  
  
  monkeyRunning =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  obstacleGroup = createGroup();
  
  
 
}



function setup() {
  createCanvas(displayWidth,displayHeight);
  background(200);
 //jungle = createSprite(width,height,width+200,height+200);
 //jungle.shapeColor='green';
  
  ground = createSprite(displayWidth/2,displayHeight-10,width,10);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  
  monkey = createSprite(30,displayHeight-30,20,20);
  monkey.addAnimation("monkey", monkeyRunning);
  monkey.scale = 0.1;
  monkey.debug = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background(0);
  
  survivalTime = Math.ceil(frameCount/frameRate()); 
  
 
  if (gameState === PLAY) {
    
   ground.velocityX = -3;
    
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& monkey.y > 300){
      monkey.velocityY = - 10;
    }
    
    spawnBananas();
    spawnObstacles();
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score += 2;
  }
    
    if (score === 10){
      monkey.scale = 0.125;
    }
      
    if (score === 20){
      monkey.scale = 0.15;
    }
    
    if (score === 30){
      monkey.scale = 0.2;
    }
    
    if (score === 40){
      monkey.scale = 0.225;
    }
    
    if (monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.07;
      gameState=END;
    }
  
  }
  
  if (gameState === END) {
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    textSize(50)
    text("game Over",displayWidth/2,displayHeight/2);
  }
  drawSprites();
  textSize(25);
  fill("blue")
  text("score: "+ score, displayWidth-100,50);
  textSize(20);
  fill("red")
  text("survivalTime: "+ survivalTime, displayWidth-100,100);
  
  
  
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(width,270,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.y = Math.round(random(height-150,height-100));
    banana.lifetime = 800;
    bananaGroup.add(banana);
    
  }
    

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(width,height-30,20,20);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 800;
    obstacleGroup.add(obstacle);
  }
  
    
}




