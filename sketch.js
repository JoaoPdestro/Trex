//Cria as variáveis (espaço na memória do computador para guardar as informações)
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trexRunning, edges, ground, imageGround, soloInvisivel, rand, nuvem, imagemNuvem, obstaculo, imagemObstaculo1, imagemObstaculo2, imagemObstaculo3, imagemObstaculo4, imagemObstaculo5, imagemObstaculo6, pontuacao,grupoNuvem, trexColidiu, grupoObstaculo, gameOver, imagemGameOver, restart, imagemRestart,somPulo,somDead,somCP;

//Faz o carregamento das imagens
function preload(){
  
  somPulo = loadSound("jump.mp3");
  somDead = loadSound("die.mp3");
  somCP = loadSound("checkPoint.mp3");

  
  //Coloca imagem de GameOver
  imagemGameOver = loadImage("gameOver.png");  
  
  //Coloca imagem de Restart
  imagemRestart = loadImage("restart.png");  
  
  
  //Coloca animação de correr do trex
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  //Animação do trex colidindo
  trexColidiu = loadAnimation("trex_collided.png");
  
  //Coloca imagem no ground
  imageGround = loadImage("ground2.png");
  
  imagemNuvem = loadImage("cloud.png");
  
  imagemObstaculo1 = loadImage("obstacle1.png");
  imagemObstaculo2 = loadImage("obstacle2.png");
  imagemObstaculo3 = loadImage("obstacle3.png");
  imagemObstaculo4 = loadImage("obstacle4.png");
  imagemObstaculo5 = loadImage("obstacle5.png");
  imagemObstaculo6 = loadImage("obstacle6.png");
  
 
}

//Faz as configurações
function setup(){
  //Cria a Tela
  createCanvas(600,200); 
  
  
  
  //Da tamanho e colocar imagem Game Over na tela
  gameOver = createSprite(300,50);
  gameOver.addImage("Game Over", imagemGameOver);

  
  //Da tamanho e colocar imagem Restart na tela
  restart = createSprite(300,100);
  restart.addImage("Restart", imagemRestart);
  restart.scale = 0.5;
  
  pontuacao = 0;
  
  //Da posição e tamnho pro trex
  trex = createSprite(50,60,20,50);
  //Da o tamanho do trex
  trex.scale = 0.5;
  //Coloca animação no trex
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided" , trexColidiu);
  
  //trex.setCollider("rectangle", 0,0,200,95);
  //trex.debug = true;
  
  //Diz que as edges vão ser as bordas da tela
  edges = createEdgeSprites();

  //Da posição e tamnho pro ground(chão)
  ground = createSprite(200,180,400,20);
  //Coloca imagem no ground
  ground.addImage("ground", imageGround);
  //Define que o ground deve começar do meio da imagem.
  ground.x = ground.width/2;
  
  //Da posição e tamanho pro chão invisível
  soloInvisivel = createSprite(300,190,600,10);
  soloInvisivel.visible = false;
  
  //Escolher um número aleatório entre 1 e 100
  //rand = Math.round(random(1,100));
  //console.log("Número Aleatório: " + rand); 
  
  //Cria grupo de nuvens e obstaculos
  grupoNuvem = new Group();
  grupoObstaculo = new Group();
}

//Faz os desenhos na tela atualizarem
function draw(){

  //Limpa a tela
  background("gray");
  
  
  
  
  
  //console.log("Isto é o estado do jogo: "+ estadoJogo);
  
  //Mostra a pontuação na tela
  text("Pontuação " + pontuacao,500,20);
  
  if (estadoJogo === JOGAR){
    
    //Esconde as imagens de Game Over e Restart
    gameOver.visible = false;
    restart.visible = false;
    
    //Muda pontuação de acordo com o frameCount
    pontuacao = Math.round(frameCount /60);
    if(pontuacao>0&& pontuacao % 100===0 ){
    somCP.play();
    
    }
    
    //Da velocidade ao ground
    ground.velocityX = -2;
    
    //Condição SE a imagem do ground sair a esquerda da tela
    if(ground.x < 0){

      //Faz o ground voltar a posição inicial
      ground.x = ground.width/2;
    }
    
    //Condição SE apertar na tecla espaço
    if(keyDown("space") && trex.y>160){
    somPulo.play();
      //Da velocidade ao trex
      trex.velocityY = -10;   
    } 
    
    //Da velocidade ao trex (Gravidade)
    trex.velocityY = trex.velocityY + 0.5;
    
    //Chama a function gerarNuvens para mostrar no jogo
    gerarNuvens();
  
    //Chama a function gerarObstaculos para mostrar no jogo
    gerarObstaculos();
    
    if(grupoObstaculo.isTouching(trex)){
      estadoJogo = ENCERRAR; 
          //trex.velocityY = -10;
          somDead.play();
    }
    
  } else if(estadoJogo === ENCERRAR){
    //Mostar as imagens de Game Over e Restart
    gameOver.visible = true;
    restart.visible = true;
    
    //Altera a animação do trex
    trex.changeAnimation("collided",trexColidiu);
    
    //Altera a velocidade Y do trex para ele não conseguir mais pular
    trex.velocityY = 0;
    
    //Atribui uma vida útil aos grupos para que não desapareçam
    grupoObstaculo.setVelocityXEach(0);
    grupoNuvem.setVelocityXEach(0);
    
    //Faz parar o movimento do trex do solo, dos obstaculos e das nuvens
    ground.velocityX = 0;
    grupoObstaculo.setLifetimeEach(-1);
    grupoNuvem.setLifetimeEach(-1);
    
    if(mousePressedOver (restart )){
   reiniciar();
  }
    
  
  }
  

 
  
  //Mostra a informação no console da contagem de Quadros
  //console.count("Contagem de Quadros");
  
  //Começa a contagem do tempo que demora a execução do programa
  //console.time();
  
  //console.log("String " + "Oi Mundo " + rand);
  
  //Mostra um alerta de aviso no console
  //console.warn("Um aviso!");
  
  //Mostra um alerta de erro no console
  //console.error("Assim é como um erro aparece");
  
  //Mostra informações no console
  //console.log("Número Aleatório: " + rand);  
  
  //Mostra a posição do mouse
  //text(mouseX+"x "+mouseY+"y",mouseX,mouseY);
  
  //Loop contador de 0 a 100
  //for(var i = 0; i <100 ; i++){
    //console.log("Loop em Execução");
    
    //Mostra a contagem na tela
    //text(i,0 + (15*i) ,100);
  //}
  

  //Impede o trex de cair do ground
  trex.collide (soloInvisivel);

  //Desenha todos os sprites na tela
  drawSprites();
  
 
  
  //Mostra a informação no console do tempo que o programa demorou pra executar até aqui
  //console.timeEnd();
}

//Faz a criação das núvens de forma aleatória
function gerarNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random (20,60));
    nuvem.addImage(imagemNuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -2;
    
    //Atribui tempo de duração a variável
    nuvem.lifetime = 300;
    
    //Ajustando a profundidade dos sprites
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //Mostra a profundida do sprite do trex
    //console.log("Profundidade do sprite do trex: " + trex.depth);
    
    //Mostra a profundida do sprite das nuvens
    //console.log("Profundidade do sprite das nuvens: " + nuvem.depth);
    
    //Adiciona cada nuvem ao grupoNuvem
    grupoNuvem.add(nuvem);
  }
}

//Faz a criação dos obstáculos na tela
function gerarObstaculos(){
  if(frameCount % 120 === 0){
    obstaculo = createSprite (600,165,10,40);
    obstaculo.velocityX = -(4+3*pontuacao/100);
    //console.log(obstaculo.velocityX);
    
    
    //Gera obstaculos aleatórios
    var rand = Math.round(random(1,6));
    
    //Pega o número sorteado e define qual imagem deve ser mostrada
    switch(rand){
        
      case 1: obstaculo.addImage(imagemObstaculo1);
      break;
        
      case 2: obstaculo.addImage(imagemObstaculo2);
      break;
        
      case 3: obstaculo.addImage(imagemObstaculo3);
      break;
        
      case 4: obstaculo.addImage(imagemObstaculo4);
      break;
        
      case 5: obstaculo.addImage(imagemObstaculo5);
      break;
        
      case 6: obstaculo.addImage(imagemObstaculo6);
      break;
    }
    //Atribuir escala e tempo aos obstáculos
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
    obstaculo.depth = trex.depth;
    
    //Adiciona cada obstáculos ao grupoObstaculo
    grupoObstaculo.add(obstaculo);    
    
    //obstaculo.debug = true;    
  }
  
}
function reiniciar (){
  estadoJogo = JOGAR;
  restart.visible = false; 
  gameOver.visible = false;
  grupoObstaculo.destroyEach();
  grupoNuvem.destroyEach();
  trex.changeAnimation("running", trexRunning);
  frameCount = 0;
  
}