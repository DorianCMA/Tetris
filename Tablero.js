class Tablero{
    constructor(){
        this.columnas = 8
        this.filas = 20
        this.lado_celda = 25
        this.ancho = this.columnas*this.lado_celda
        this.alto = this.filas*this.lado_celda
        this.position = createVector(MARGEN_TABLERO,MARGEN_TABLERO + this.lado_celda );

        this.minosAlmacenados = [];
        for (let fila = 0; fila < this.filas; fila++) {
          this.minosAlmacenados[fila] = [];
          for (let columna = 0; columna < this.columnas; columna++) {
            this.minosAlmacenados[fila].push("");
        }
     }

    }

    set almacenarMino(tetrimino){
        for(const pmino of tetrimino.mapaTablero ){
            if(pmino.y < 0){
                tetrimino = new Tetrimino;
                tablero = new Tablero;
            }
            this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre;
        }
        this.buscarLineasHorizontalesBorrar();
    }


    buscarLineasHorizontalesBorrar() {
        let lineas = [];
        for (let fila = this.filas-1; fila >= 0; fila--) {
          let agregar = true;
          for (let columna = 0; columna < this.columnas; columna++) {
            if (!this.minosAlmacenados[columna][fila]) {
              agregar = false;
              break;
            }
          }
          if (agregar) {
            lineas.push(fila);
          }
        }
        this.borrarLíneasHorizontales(lineas);
      }

    borrarLíneasHorizontales(lineas) {
        // lineas_hechas += lineas.length;
        for (const linea of lineas) {
          for (let fila = linea; fila >= 0; fila--) {
            for (let columna = 0; columna < this.columnas; columna++) {
              if (fila == 0) {
                this.minosAlmacenados[columna][fila] = "";
                continue;
              }
              this.minosAlmacenados[columna][fila] =
                this.minosAlmacenados[columna][fila - 1];
            }
          }
        }
      }
    coordenada(x,y){
        return createVector(x,y).mult(this.lado_celda).add(this.position)
    }

    dibujar(){
      push()
      noStroke()
      for(let columna = 0; columna < this.columnas; columna++){
        for (let fila = 0; fila < this.filas; fila++) {
            if((columna + fila)%2 == 0){
                fill("black");
            }else{
                fill("#003")
            }
            let c = this.coordenada(columna,fila)
            rect(c.x,c.y,this.lado_celda)
          
        }
    }
      pop()
      this.dibujarMinosAlmacenados()
    }

    dibujarMinosAlmacenados() {
        push();
        for (let columna = 0; columna < this.columnas; columna++) {
          for (let fila = 0; fila < this.filas; fila++) {
            let nombreMino = this.minosAlmacenados[columna][fila];
            if (nombreMino) {
              fill(tetriminosBase[nombreMino].color);
              Tetrimino.dibujarMino(this.coordenada(columna, fila));
            }
          }
        }
        pop();
      }

}