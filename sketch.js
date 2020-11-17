var monkey, monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var sun, sunImage
var cloud, cloudImage
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;



function preload() {
  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  monkeyCollide = loadAnimation("monkey_1.png");
  cloudImage = loadImage("cloud.png");

  groundImg = loadAnimation("ground.jpg")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  sunImage = loadImage("sun.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  cloudGroup = createGroup();

  sun = createSprite(width - 50, 60, 10, 10);
  sun.addImage("sun", sunImage);
  sun.scale = 0.12;

  monkey = createSprite(80, height - 90, 10, 10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);


  ground = createSprite(width / 2, height, width, 2);
  ground.scale = 1;

  ground.addAnimation("ground", groundImg);

  invisiGround = createSprite(width / 2, height - 2, width, 125);
  invisiGround.visible = false;

}

function draw() {
  background("skyblue");
  fill("black");
  text("SURVIVAL: " + score, 470, 20);


  if (gameState === PLAY) {
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate() / 60);

    ground.velocityX = -(4 + score * 1.5 / 100);

    if (touches.length > 0 || (keyDown("space")) && monkey.y >= 280) {
      monkey.velocityY = -13;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();

    }

    if (monkey.isTouching(bananaGroup)) {
      switch (score) {
        case 10: monkey.scale = 0.12;
                break;
        case 20: monkey.scale = 0.14;
                break;
        case 30: monkey.scale = 0.16;
                break;
        case 40: monkey.scale = 0.18;
                break; 
        default: break;        
      }

    }


    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }


  }

  if (gameState === END) {
    ground.velocityX = 0;

    monkey.scale = 0.08;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    monkey.changeAnimation("collide", monkeyCollide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);

    if ((touches.length > 0 || keyDown("r"))) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY;
    }
  }



  drawSprites();

  monkey.collide(invisiGround);
}

function bananas() {
  if (frameCount % 80 === 0) {

    banana = createSprite(620, height - 300, 50, 50)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score * 1.5 / 100);
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);


  }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width + 20, height - 300, 40, 10);
    cloud.y = Math.round(random(100, 220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 300;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }

}


function obstacles() {
  if (frameCount % 200 === 0) {

    obstacle = createSprite(620, height - 90, 50, 50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.5 / 100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);

  }


}