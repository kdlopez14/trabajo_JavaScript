import { actualizarTotalPresupuesto } from '../validacion.js';
//ir añadiendo electrodimesticos 
//ir añadiendo muebles, se tienen que ir sumando conforme lo vamos añadiendo 
//funcion desplegar: 
//2. si quiere añadir articulos especiales se desplegará un textarea, esta zona no se sumara al presupuesto. 
//Se advertirá al cliente que si hace check en articulos especiales el presupuesto puede cambiar el precio una 
//vez sea recalculado. 
//1. if (apartamento.checked) desplegar ascensor si/no, si no tiene ascensor desplegamos la planta 
//función que cambia los estilos de ascensor ocultando/mostrando este div dependiente de si la vivienda elegida es un apartamento
export function ascensorrr(input) { 
    if (input.name == 'origen') {
        if (input.value == 'apartamento') {
            ascensor.style.display = 'block';
            plantaa('ascensor');
        } else {
            ascensor.style.display = 'none';
            planta.style.display = 'none';
        }
    }
    if (input.name == 'destino') {
        if (input.value == 'apartamento2') {
            ascensor2.style.display = 'block';
            plantaa('ascensor2');
        }
        else {
            ascensor2.style.display = 'none';
            planta2.style.display = 'none';
        }
    }
}

//función que añade el input ascensor cuando le decirmos que no hay ascensor 
function plantaa(nombre) {
    var siAsc = document.getElementsByName(nombre);
    siAsc.forEach((input) => {
        input.addEventListener('change', () => {
            if (input.value == 'no' && input.name == 'ascensor') {
                planta.style.display = 'block';
            } else if (input.value == 'no' && input.name == 'ascensor2') {
                planta2.style.display = 'block';
            }
            if (input.value == 'si' && input.name == 'ascensor') {
                planta.style.display = 'none';
            } else if (input.value == 'si' && input.name == 'ascensor2') {
                planta2.style.display = 'none';
            }
        })
    })
}


//listado de objetos. Si se hace click en la option se irá sumando el presupuesto
const botones = document.querySelectorAll(`button`);
/*cogemos los div donde vamos a añadir la información*/
const divElectro = document.getElementById('electrodomesticos');
const divMuebles = document.getElementById('divMuebles');


botones.forEach(input => {
    input.addEventListener('click', () => {
        //cogemos el nombre del input para saber de cúal se trata y hacer una acción u otra
        var nombre = input.name;
        switch (nombre) {
            //boton + de electrodomesticos: despliega el menú
            case "botonE": {
                input.className = 'oculto';
                var menosElectro = document.querySelector(`button[name="bElectro"]`);
                menosElectro.style.display = 'inline';
                menosElectro.className = 'botonElectro';
                divElectro.innerHTML =
                    `
    <table id="tablaElectro">
        <tr>
            <th>
                <input class="checkbox" type="checkbox" name="electrodo" value="nevera" ><span>Nevera</span>
            </th>
             <th>
                 <input class="checkbox" type="checkbox" name="electrodo" value="lavadora"><span>Lavadora</span>
            </th>
             <th>
                <input class="checkbox" type="checkbox" name="electrodo" value="lavavajillas"><span>Lavavajillas</span>
            </th>
             <th>
                <input class="checkbox" type="checkbox" name="electrodo" value="horno"><span>Horno</span>
            </th>
        </tr>
         <tr>
            <th> 
               <input class="checkbox" type="checkbox" name="electrodo" value="secadora"><span>Secadora</span>
            </th>
             <th>
                <input class="checkbox" type="checkbox" name="electrodo" value="microondas"><span>Microondas</span>
            </th>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="Televisor"><span>Televisor</span>
            </th>
             <th>
                <input class="checkbox" type="checkbox" name="muebles" value="otros"><span>Otros</span>
            </th>
        </tr>              
    </table>
    `;
                añadriCantidades();
                break;
            }
            //Botón - de electrodomesticos: oculta el menú
            case "bElectro": {
                input.style.display = 'none';
                var mas = document.querySelector(`button[name="botonE"]`);
                mas.classList.remove = 'oculto';
                mas.className = 'botonElectro';
                divElectro.innerHTML = "";
                break;
            }
            //boton + de muebles: muestra el menú
            case "buttonMasMuebles": {
                input.className = 'oculto';
                var menosMueble = document.querySelector(`button[name="buttonMenosMuebles"]`);
                menosMueble.style.display = 'inline';
                menosMueble.className = 'botonElectro';
                divMuebles.innerHTML =
                    `
        <table id="tablaMuebles">
        <tr>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="sofa" ><span>Sofá</span>
            </th>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="sillon"><span>Sillón</span>
            </th>
             <th>
                 <input class="checkbox" type="checkbox" name="muebles" value="muebletv"><span>Mueble TV</span>
            </th>
             
        </tr>
        <tr>
          <th>
                <input class="checkbox" type="checkbox" name="muebles" value="sillaCom"><span>silla Comedor</span>
          </th>
          <th>
                <input class="checkbox" type="checkbox" name="muebles" value="mesitaCentro"><span>Mesita Centro</span>
          </th>
          <th>
                <input class="checkbox" type="checkbox" name="muebles" value="camaG"><span>Cama Matromonio</span>
          </th>
            
        </tr>  
        <tr>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="camaInd"><span>Cama Individual</span>
            </th>
            <th>
                    <input class="checkbox" type="checkbox" name="muebles" value="armario"><span>Armario</span>
            </th>
            <th>
                    <input class="checkbox" type="checkbox" name="muebles" value="comoda"><span>Comoda</span>
            </th>
        
        </tr>  
        <tr>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="mesita"><span>Mesita de Noche</span>
            </th>
            <th>
               <input class="checkbox" type="checkbox" name="muebles" value="escritorio"><span>Escritorio</span>
            </th>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="sillaEst"><span>Silla Escritorio</span>
            </th>
        </tr 
        <tr>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="estanterias"><span>Estanterías</span>
            </th>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="espejo"><span>Espejos</span>
            </th>
            <th>
                <input class="checkbox" type="checkbox" name="muebles" value="otros"><span>Otros</span>
            </th>
        </tr>           
    </table>   
            `;
                añadriCantidades();
                break;
            }
            //botón - muebles: oculta el menú
            case "buttonMenosMuebles": {
                input.style.display = 'none';
                var mas = document.querySelector(`button[name="buttonMasMuebles"]`);
                mas.classList.remove = 'oculto';
                mas.className = 'botonElectro';
                divMuebles.innerHTML = "";
                break;
            }
        }
    })
})
//Una vez sabemos que clase de elementos tenemos que transportar tendrmeo que preguntarle al usuario las cantidades. Una vez 
//se seleccione la clase de elementos se desplegará otro div preguntando las cantidades 

function añadriCantidades() {
    const checkboxesMuebles = document.querySelectorAll('input[type="checkbox"][name="muebles"], input[type="checkbox"][name="electrodo"]');
    checkboxesMuebles.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const padre = this.parentElement;
            let inputCantidad = padre.querySelector(`input[name="cantidad-${this.value}"]`);
            if (this.checked) {
                if (!inputCantidad) {
                    inputCantidad = document.createElement('input');
                    inputCantidad.type = 'number';
                    inputCantidad.min = 1;
                    inputCantidad.max = 50;
                    inputCantidad.name = `cantidad-${this.value}`;
                    inputCantidad.style.display = 'inline'
                    inputCantidad.style.width = '40px';
                    padre.appendChild(inputCantidad);
                    inputCantidad.value = 1;
                    inputCantidad.addEventListener('input', actualizarTotalPresupuesto);
                }
            } else {
                if (inputCantidad) {
                    inputCantidad.remove(); // asegúrate de tener los paréntesis
                }
            }
            actualizarTotalPresupuesto();
        });
    });
}

//Artuculos especiales: cuando esta checked se le añade un textarea 
var artEsp = document.querySelector(`input[name="artEspeciales"]`);
if(artEsp){
    artEsp.addEventListener('change', () => {
        areaNumber(artEsp);
    });
}
function areaNumber(input) {
    if (input.checked) {
        var padre = input.parentElement;
        var number = document.createElement('input');
        number.type = "number";
        number.min = 1;
        number.max = 50;
        number.name = "cantidadArt";
        number.placeholder = "cantidad";
        padre.appendChild(number);
        number.value = 1;
        number.addEventListener('input', actualizarTotalPresupuesto);
    } else if (!input.checked) {
        var eliminado = document.querySelector(`input[name="cantidadArt"]`);
        if (eliminado) {
            eliminado.remove();
        }
    }
}

//creamos una función a la cual vamos a ir pasandole parametros, los cuales va a ir sumandolos. 
//Esta función será llamada solo cuando la validación sea true.
//Comprobaremos esta afirmación e iremos recogiendo lo datos obtenidos para ir sumandolos dependiendo de su estado 
export function presupuesto() {
    var suma = 0;
    //biblioteca de precios
    var precios = {
        muebles: 30.0, //30 euros por mueble 
        electrodo: 40.0, //40 euros por electrodo
        distancia: 0.90, //0.9 euros por km recorrido desde el origen al destino 
        planta: 15.0, //15 euros por planta subida sin ascensor 
        planta2: 15.0,
        cajasGrand: 10.0,
        cajasMed: 7.5,
        cajasPeq: 5.0,
        cantidadArt: 80.0,  //80 euros por cada articulo especial
        empaqueDesempaque: 30.0, //30 euros por el servicio de desempacar y empacar los objetos de la mudanza
        desmontajeMontaje: 60.0 //60 eurso por el servicio de desmontar y montar muebles 
    }
    var casillas = ["planta", "planta2", "distancia", "cajasGrand", "cajasMed", "cajasPeq"];
    casillas.forEach((nombreCasilla) => {
        //si nos encotramos con que alguna casilla no hay numero es = 0
        const casillaVacia = document.querySelector(`input[name=${nombreCasilla}]`);
        if (casillaVacia && casillaVacia.value === "") {
             //si está vacía o nulla se da por hecho que es un cero 
             suma += 0;
        }
        const inputCantidad = parseFloat(casillaVacia.value);
        if (!isNaN(inputCantidad) && inputCantidad > 0) {
            suma += inputCantidad * precios[nombreCasilla];
        }
    })
    //articulos especiales 
    const artEsp = document.querySelector(`input[name="artEspeciales"]`);
    if (artEsp.checked) {
        const cantArt = document.querySelector(`input[name="cantidadArt"]`).value;
        suma += cantArt * precios.cantidadArt;

    }

    const emp = document.querySelector(`input[name="empaque"][value="si"]`);
    const desmontj = document.querySelector(`input[name="desmontaje"][ value="si"]`);
    const muebles = document.querySelectorAll(`input[name="muebles"]`);
    const electrodo = document.querySelectorAll(`input[name="electrodo"]`);
    const fecha = document.querySelector(`input[name="fecha"]`).value;

    muebles.forEach(input => {
        if (input.checked) {
            var input2 = parseFloat(document.querySelector(`input[name="cantidad-${input.value}"]`).value);
            if (input2 > 0) { //si es mayor que cero estará seleccionado, por lo tanto lo sumamos
                suma += input2 * precios.muebles;
            }
        }
    })

    electrodo.forEach((input) => {  
        if (input&&input.checked) {
            suma += precios.electrodo;
        }
    })
    if (desmontj && desmontj.checked) {
        suma += precios.desmontajeMontaje;
    }
    if (emp && emp.checked) {
        suma += precios.empaqueDesempaque;
    }
    const porcentaje = calcularFecha(fecha); //esta función devolerá el porcentaje a incrementar el presupuesto dependiendo de la fecha elegida 
    //si es una mudanza urgente (en menos de 72h) +20% a la suma actual 
    //si es una mudanza en fin de semana +10% a la suma actual 
    //si se dan los dos casos +30% 

    suma += suma * (porcentaje / 100);

    return suma;

}
function calcularFecha(fecha) {

    const fechaSelec = new Date(fecha);
    const fechaActual = new Date();

    const diaNumero = fechaSelec.getDay(); //0(Domingo) a 6(Sábado)

    //lo calculamos en milisegundos 
    const seg = fechaSelec - fechaActual;

    //lo convertimos a días 
    const diferenciaDias = Math.round(seg / (1000 * 60 * 60 * 24));

    //si es una mudanza urgente (en menos de 72h) +20% a la suma actual 
    //si es una mudanza en fin de semana +10% a la suma actual 

    if (diferenciaDias < 3 && (diaNumero === 6 || diaNumero === 0)) {
        return 30; // urgente y fin de semana
    } else if (diferenciaDias < 3) {
        return 20; // solo urgente
    } else if (diaNumero === 6 || diaNumero === 0) {
        return 10; // solo fin de semana
    }

    return 0;
}
//politica de privacidad: si hace click en el enlace aparecerá el contenido de Política y Privacidad 
var politicaPriv = document.querySelector(`a[id="politicaPrivacidad"]`);
var divPolitica = document.getElementById("politica_priv");
let politicaCargada = false;
if(politicaPriv){
politicaPriv.addEventListener('click', () => {
    divPolitica.style.display = 'block';
    if (!politicaCargada) {
        //importamos el archivo desde Ajax para hacer más ligera la carga del archivo DOM 
        fetch('../privacidad.txt')
            .then(respuesta => {
                if (!respuesta.ok) throw new Error("Error en la red");
                return respuesta.text(); //Aquí devolvemos la respuesta con el texto
            })
            .then(datos => {
                divPolitica.innerHTML =
                    `
                    <h3>Política de Privacidad</h3>
                    <p>Última actualización: 24/03/2025<br>
                    ${datos}
                    </p>
                    
                    `;
                politicaCargada = true;
            })
            .catch(error => {
                console.error("Error", error);
            })
    }
})
}




