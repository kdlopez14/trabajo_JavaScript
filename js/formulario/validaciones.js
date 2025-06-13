import {ascensorrr} from "../formulario/acciones.js";

let val = {
    nombre:false,
    apellidos:false,
    tel:false,
    correo:false,
    dirOrg:false,
    dirDes:false,
    origen:false,
    destino:false,
    empaque:false,
    desmontaje:false,
    politica:false,
    fecha:false,
    distancia:false
};

const restricciones ={ 
    nombre:{
        codigo:/^[A-Za-zÁáÉéÍíÓóÚú ]{2,15}$/,
        mensaje:"* Este campo solo puede contener letras y tiene que tener entre 2 y 15 carácteres"
    },
    correo:{
        codigo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        mensaje:"* Formato de correo incorrecto"
    },
    apellidos:{
        codigo: /^[A-Za-zÁáÉéÍíÓóÚú ]{2,40}$/,
        mensaje:"* Este campo solo puede contener letras y tiene que tener entre 2 y 40 carácteres"
    },
    tel:{
        codigo:/^(\+\d{2})?\d{9}$/,
        mensaje:"* Formato incorrecto, sólo puede contener números"
    },
    dirOrg:{
        codigo:/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#\.,\-\/ºª]{5,100}$/,
        mensaje:"* Formato de dirección incorrecto"
    },
    dirDes:{
        codigo: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s#\.,\-\/ºª]{5,100}$/,
        mensaje:"* Formato de dirección incorrecto"
    }
};

// Variables DOM, que se inicializan dentro de la función
let politica, fecha, distancia;
let radio = ['origen', 'destino', 'empaque' , 'desmontaje', 'politica'];

// Función que configura todos los eventos de validación. Llamar cuando el DOM esté listo.
export function inicializarValidaciones(){
    politica = document.getElementById('politica');
    fecha = document.querySelector(`input[name="fecha"]`);
    distancia = document.querySelector(`input[name="distancia"]`);
    validarRestriccion();
    validarCheckboxes();
    validarDistancia();
    validarFecha();
}

// Función que añade listeners a inputs con restricciones regulares
function validarRestriccion (){
    Object.keys(restricciones).forEach((clave)=>{
        const input = document.querySelector(`input[name=${clave}]`);
        if(!input) return; // Por si no existe en el DOM

        input.addEventListener('blur', ()=>{
            if(input.value == null || input.value === ""){
                val[clave] = false;
                setError(input, "* Este campo no puede estar vacío"); 
            } else if(!restricciones[clave].codigo.test(input.value)){
                val[clave] = false;
                setError(input, restricciones[clave].mensaje);
            }else{
                val[clave] = true;
                setSuccess(input);
            }
        })
    })
}

// Función para validar checkboxes/radios y añadir listeners
function validarCheckboxes(){
    radio.forEach(palabraClave => {
        const checkboxes = document.querySelectorAll(`input[name=${palabraClave}]`); 
        checkboxes.forEach((input)=>{
            input.addEventListener('change', ()=>{
                if(input.checked){
                    val[palabraClave] = true;
                    setSuccess(input); 
                }
                ascensorrr(input);
            })
        })
    });
}

// Validación para distancia (mínimo 10km)
function validarDistancia(){
    if(!distancia) return;
    distancia.addEventListener('blur', ()=>{
        if(distancia.value == null || distancia.value === ""){
            val.distancia = false;
            setError(distancia, "* Este campo no puede estar vacío")
        }else if (Number(distancia.value) <= 10){
            val.distancia = false;
            setError(distancia, "* El recorrido mínimo son 10km");
        }else {
            val.distancia = true;
            setSuccess(distancia);
        }
    });
}

// Validación para fecha (fecha posterior a la actual)
function validarFecha(){
    if(!fecha) return;
    fecha.addEventListener('blur', ()=>{
        const fechaActuall = new Date();
        const date = new Date(fecha.value);
        if(fecha.value === "" || fecha.value == null){
            val.fecha = false;
            setError(fecha, "* Este campo no puede estar vacío");
        }else if(fechaActuall >= date){
            val.fecha = false;
            setError(fecha, "* La fecha elegida no puede ser anterior a la actual");
        }else{
            val.fecha = true;
            setSuccess(fecha);
        }
    });
}

function setError(input, mensaje){
    const padre = input.parentElement; 
    const small = padre.querySelector("small"); 
    if(small) small.innerText = mensaje;
    padre.className = "form error";
}

function setSuccess(input){
    const padre = input.parentElement; 
    padre.className = "form succes";
}

function controladorErrores (clave){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input)=>{
        if(clave === input.name){
            if(input.value == null || input.value === ""){
                val[clave] = false;
                setError(input, "* Este campo no puede estar vacío"); 
            }
        }
    })   
    radio.forEach(function(palabra){
        if(clave === palabra){
            const radios = document.querySelectorAll(`input[name=${palabra}]`); 
            radios.forEach((input)=>{
                setError(input, "* Tiene que haber al menos una opción marcada"); 
            })
        }
    })
}

// Función que valida si todo está correcto para enviar formulario
export function validar() {
    let enviar = true;
    Object.keys(val).forEach(clave => {
        if(!val[clave]) {
            enviar = false;
            controladorErrores(clave);
        }
    });
    if(!politica.checked){
        setError(politica, "* Es obligatorio aceptar la política de privacidad");
        enviar = false;
    } else {
        val.politica = true; 
    }
    return enviar;  
}


