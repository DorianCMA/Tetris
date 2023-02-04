
MARGEN_TABLERO = 10

setInterval(()=>{
  tetrimino.moverAbajo()
},700)
function setup(){
    createCanvas(900,600);
    tablero = new Tablero()
    crearMapeoBaseTretriminos()
    tetrimino = new Tetrimino()
    resizeCanvas(tablero.ancho + 2* MARGEN_TABLERO,
        tablero.alto + 2 * MARGEN_TABLERO + tablero.lado_celda);
        keyEventsTetris()

     
}




function draw(){
    background("lightgray");
    tablero.dibujar()
    tetrimino.dibujar()

}

window.addEventListener('keyup', keyEventsTetris);
function keyEventsTetris(){
   if(keyIsDown(LEFT_ARROW)){//Tecla con la flecha hacia la izquierda		
    tetrimino.moverIzquierda()
   }
   if(keyIsDown(RIGHT_ARROW)){ //Tecla con la flecha hacia la Derecha					
    tetrimino.moverDerecha()
    }
   if(keyIsDown(UP_ARROW)){ 				
   tetrimino.girar()
    }
   if(keyIsDown(DOWN_ARROW)){ //Tecla con la flecha hacia la Derecha					
    tetrimino.moverAbajo()
   }
}

  



