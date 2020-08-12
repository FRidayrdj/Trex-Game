var trex,trex_running,trex_colliding,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,ground,invground,CloudsGroup,obstaclesGroup,groundimage,cloud_image,gameover_img,gameover,reset,reset_img,restart;
var score = 0;

//This is for creating the game state
var play = 1;
var end = 0;
var gamestate = play;

function preload()
{
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colliding=loadImage ("trex_collided.png");
  groundimage=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
  reset_img=loadImage("restart.png");
  gameover_img=loadImage("gameOver.png");
  
}
function setup() 
{
  createCanvas(600, 200);
  trex = createSprite  (50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
  trex.addImage  (trex_colliding);
  
  ground=createSprite(300,180,600,20);
  ground.addImage("ground",groundimage);
  ground.velocityX=-10;
  
  invground = createSprite(300,190,600,10);
  invground.visible = false;
  
  CloudsGroup  =  new Group();
  obstaclesGroup  = new Group();
  
  //This is for reset and game over
var reset = createSprite(300,140,5,5);
reset.addImage(reset_img);
reset.scale=0.5;
reset.visible=false;
  
var gameover = createSprite(300,100,5,5);
gameover.addImage(gameover_img);
gameover.scale=0.5;
gameover.visible=false;
}

function draw() 
{
  background(180);
  textFont("AR DECODE");
  textSize(50);
  text("Score:-"+score,200,50);
  
  trex.collide(invground);
  
  if(gamestate===play)
  {
  score = score+Math.round(getFrameRate()/60);
  
  
   if (keyDown("up")&&trex.y>=162) 
    {
      trex.velocityY=-10;
    }
  
    if (ground.x<0)
    {
      ground.x = ground.width/2;
    }
  
   
    trex.velocityY=trex.velocityY +0.5;
  
  spawncactus();
  spawncloud();
  if(obstaclesGroup.isTouching(trex))
  {
    gamestate = end;
  }
    
    }
    else if(gamestate === end)
  {
    //Stopping the ground cloud and cactus
    ground.velocityX = 0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //stopping the trex from moving when it is touching the cactus
    trex.changeAnimation(trex_colliding); 
    
    //Setting lifetime for cactus and cloud
    CloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
  
  }
  
    //Making resetting key
    if(mousePressedOver(reset))
    {
      restart();
    }
  drawSprites();
}

function spawncactus() 
{
if(frameCount%70==0)
  {
  var cactus = createSprite (600,165,5,5);
  cactus.velocityX = -(10 + 3*score/100 );
  var randomcact = Math.round(random(1,6));
  switch(randomcact)
  {
    case 1: cactus.addImage (cactus1);
    break;
    
    case 2: cactus.addImage (cactus2);
    break;
    
    case 3: cactus.addImage (cactus3);
    break;
    
    case 4: cactus.addImage (cactus4);
    break;
    
    case 5: cactus.addImage (cactus5);
    break;
    
    case 6: cactus.addImage (cactus6);
    break;
    default:break;
  
  }
      
  cactus.scale = 0.5;
  cactus.lifetime = 600/10;
  obstaclesGroup.add(cactus);
  }
}

function spawncloud() 
{
  if (frameCount%50==0)
  {
  var cloud = createSprite(600,120,10,10);
  cloud.velocityX = -5;
  cloud.addImage(cloud_image);
  cloud.scale = 0.5;
  cloud.y = random(80, 120);
  cloud.lifetime = 600/5;
  
  
  //Adjusting The Depth
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  CloudsGroup.add(cloud);
  }
}

function restart()
{
  gamestate = play;
  reset.visible = false;
  gameover.visible = false;
  obstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation(trex_running);
  score = 0;
}