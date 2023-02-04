function crearMapeoBaseTretriminos(){
    tetriminosBase = {
     "Z":{
        color:"red",
        mapa:[
            createVector(),
            createVector(-1,-1),
            createVector(0,-1),
            createVector(1,0)

        ]
     },
     "S":{
        color:"green",
        mapa:[
            createVector(),
            createVector(1,-1),
            createVector(0,-1),
            createVector(-1,0)

        ]
    },
    "J":{
       color:"orange",
       mapa:[
           createVector(),
           createVector(-1,0),
           createVector(-1,-1),
           createVector(1,0)

       ]
    },
    "L":{
       color:"dodgerblue",
       mapa:[
           createVector(),
           createVector(-1,0),
           createVector(1,-1),
           createVector(1,0)

       ]
    },
    "T":{
       color:"magenta",
       mapa:[
           createVector(),
           createVector(-1,0),
           createVector(1,0),
           createVector(0,-1)

       ]
    },
    "O":{
       color:"yellow",
       mapa:[
           createVector(),
           createVector(0,-1),
           createVector(1,-1),
           createVector(1,0)

       ]
        },
    "I":{
       color:"cyan",
       mapa:[
           createVector(),
           createVector(-1,0),
           createVector(1,0),
           createVector(2,0)

       ]
    }  
    }
   }

   class Tetrimino{
    constructor(nombre = random(["Z","S","J","L","T","O","I"])){
        this.nombre = nombre
        let base = tetriminosBase[nombre]
        this.color =base.color
        this.mapa = []
        for (const pmino of base.mapa) {
            this.mapa.push(pmino.copy())
        }
        this.posicion = createVector(int(tablero.columnas / 2),0)
    }

    moverDerecha(){
        this.posicion.x++
        if(this.movimientoErroneo){
            this.moverIzquierda()
        }
    }
    moverIzquierda(){
        this.posicion.x--
        if(this.movimientoErroneo){
            this.moverDerecha()
        }
    }
    moverArriba(){
        this.posicion.y--
    }
    moverAbajo(){
        this.posicion.y++
        if(this.movimientoErroneo){
            this.moverArriba()
                tablero.almacenarMino = this;
                tetrimino = new Tetrimino();
              }
             
        }
    

    girar(){
        for(const pmino of this.mapa){
            pmino.set(pmino.y,-pmino.x)
        }
    }

    desgirar(){
        for(const pmino of this.mapa){
            pmino.set(-pmino.y,pmino.x)
        }
        if(this.movimientoErroneo){
            this.desgirar()
        }
    }

    get movimientoErroneo() {
        let salióDelTablero = !this.estáDentroDelTablero;
        return salióDelTablero || this.colisiónConMinosAlmacenados;
      }
      get colisiónConMinosAlmacenados() {
        for (const pmino of this.mapaTablero) {
          if (tablero.minosAlmacenados[pmino.x][pmino.y]) {
            return true;
          }
        }
        return false;
      }

    get estáDentroDelTablero() {
        for (const pmino of this.mapaTablero) {
          if (pmino.x < 0) {
            //Evita salida por izquierda
            return false;
          }
          if (pmino.x >= tablero.columnas) {
            //Evita salida por derecha
            return false;
          }
          if (pmino.y >= tablero.filas) {
            //Evita salida por abajo
            return false;
          }
        }
        return true;
      }

    get mapaTablero(){
        let retorno = []
        for (const pmino of this.mapa){
            let copy = pmino.copy().add(this.posicion)
            retorno.push(copy)   
        }
        return retorno
    }
    get mapaCanvas(){
        let retorno = []
        for (const pmino of this.mapa){
            let copy = pmino.copy().add(this.posicion)
            retorno.push(tablero.coordenada(copy.x,copy.y))
        }
        return retorno
    }

    dibujar(){
        push()
        fill(this.color)
        for(const pmino of this.mapaCanvas){
            Tetrimino.dibujarMino(pmino)
        }
        pop()
    }
    static dibujarMino(pmino) {
        rect(pmino.x, pmino.y, tablero.lado_celda);
        push();
        noStroke();
        fill(255, 255, 255, 80);
        beginShape();
        vertex(pmino.x, pmino.y);
        vertex(pmino.x + tablero.lado_celda, pmino.y);
        vertex(pmino.x + tablero.lado_celda, pmino.y + tablero.lado_celda);
        endShape(CLOSE);
        pop();
      
    }
}