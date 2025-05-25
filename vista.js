/******************************* VISTA ******************************************/
class Vista {
    constructor(){

    }

    cargarPlantilla(plantilla){
		let template = document.getElementById(plantilla);

		if (template){
			var clon = template.content.cloneNode(true);
			document.getElementById("cuerpo").innerHTML ="";
			document.getElementById("cuerpo").appendChild(clon);
		}
	}

    mostrarNombreJugador(nombre) {
        document.getElementById("jugador-info").innerHTML = `Jugador: <strong>${nombre}</strong> | Nivel: <span id="nivel">1</span>`;
    }

    //carga los elementos en la pantalla
    CargarElementos(){
        canvas = document.getElementById("canvas");
        ctx  = canvas.getContext("2d");
        document.getElementById("puntaje").innerHTML = puntaje;
        
    
        // crea el objeto de la clase burbuja
        burbuja = new Burbuja();
    
        // crea los objetos de la clase cuadrado
        for(let i = 0 ; i < cantidadCuadrados; i++){
            //lo agrega al array
            cuadrados.push( new Cuadrado() );	
        }

        // crea los objetos de la clase cuadradoMalo
        for(let i = 0 ; i < cantidadCuadradosMalos; i++){
            //lo agrega al array
            cuadradosMalos.push( new CuadradoMalo() );	
        }
    
    }

    //muestra los cuadrados trayendo la informacion desde el modelo
    MostrarCuadrados(){
        for (let i = 0 ; i < cantidadCuadrados ; i++){
            cuadrados[i].dibujar(ctx);
        }
    
    }

    //muestra los cuadrados malos trayendo la informacion desde el modelo
    MostrarCuadradosMalos(){
        for (let i = 0 ; i < cantidadCuadradosMalos ; i++){
            cuadradosMalos[i].dibujar(ctx);
        }
    
    }   

    //muestra los cuadrados trayendo la informacion desde el modelo
    MostrarBurbuja(){
        burbuja.dibujar(ctx);
    }

    //se desaparecen los cuadrados cuando se chocan con la burbuja
    DeleteCuadrados() {
    for(let i = 0; i < cantidadCuadrados; i++) {
        let x = colicion(burbuja, cuadrados[i]);
        if (x) {
            var indice = i;
            cuadrados.splice(indice, 1);
            cantidadCuadrados = cuadrados.length;
            puntaje = puntaje + 1;
            document.getElementById("puntaje").innerHTML = puntaje;
        }
    }

    // Nueva detección de colisión con cuadrados malos
    for(let i = 0; i < cantidadCuadradosMalos; i++) {
        if(colicion(burbuja, cuadradosMalos[i])) {
            // Reiniciar juego
            this.reiniciarJuego();
            break;
        }
    }
}

    //aumenta el tamaño de la burbuja cuando se chocan con la burbuja
    AumentarTamaño(){
        for(let i = 0; i < cantidadCuadrados ; i ++){
            let x = colicion(burbuja,cuadrados[i])
            if (x) {
                let nuevoRadio = radioBurbuja + 1;
                radioBurbuja = nuevoRadio;
                burbuja.r = nuevoRadio;
            }
        }
    }

    reiniciarJuego() {
        alert(`¡Game Over! Puntaje final: ${puntaje}`);
        puntaje = 0;
        radioBurbuja = 30;
        posBurbuja = {x:400, y:200};
        cuadrados = [];
        cuadradosMalos = [];
    
    // Volver a crear los elementos
    for(let i = 0; i < cantidadCuadrados; i++) {
        cuadrados.push(new Cuadrado());
        }
    for(let i = 0; i < cantidadCuadradosMalos; i++) {
        cuadradosMalos.push(new CuadradoMalo());
        }
    
    document.getElementById("puntaje").innerHTML = puntaje;
}
    //muestra el puntaje
    MostrarPuntaje(){
        document.getElementById("puntaje").innerHTML = puntaje;
    }
}