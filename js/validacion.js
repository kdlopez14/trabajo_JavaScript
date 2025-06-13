
import {validar} from './formulario/validaciones.js';
import {presupuesto} from './formulario/acciones.js';
import {inicializarValidaciones} from './formulario/validaciones.js';
//inicia las validaciones automáticas de los inputs. 
document.addEventListener("DOMContentLoaded", () => {
  inicializarValidaciones();
});
var divPresupuesto;
function validarFormulario(){
//Desactivamos la acción submit mientras que se comprueba que validar() es true 
divPresupuesto = document.getElementById('presupuestoTotal');
const formulario = document.getElementById('formulario');
// Evento para verificar el estado de validación al enviar el formulario 
formulario.addEventListener('submit', (event) => { 
    event.preventDefault(); //detenemos el envio hasta que no se comprueba que el formulario está validado 
    if (validar()) { //Si esta validado aparecera el mensaje del presupuesto Final 
        var totalPres = parseFloat( presupuesto(), 2);
        divPresupuesto.innerHTML=
        `
        ¡Gracias por solicitar tu presupuesto personalizado!<br>
        Hemos calculado el total según tus elecciones y servicios seleccionados.<br>  
         **Tu presupuesto estimado es de: ${totalPres} € + IVA **<br>
        Si deseas modificar algún detalle o añadir información adicional, no dudes en contactarnos.<br>
        ¡Estamos encantados de ayudarte con tu mudanza!
        `;
    }
});
}
validarFormulario();
function actualizarPresupuesto(){
//cada vez que notemos un cambio en cualquier input actualizaremos el presupuesto 
const inputs = document.querySelectorAll('input')
inputs.forEach(input=>{
    input.addEventListener('input', actualizarTotalPresupuesto);
    input.addEventListener('change', actualizarTotalPresupuesto);
    input.addEventListener('blur', actualizarTotalPresupuesto);
})
}

actualizarPresupuesto();
//pasamos el valor total a float y mostramos el presupuesto en tiempo real 
export function actualizarTotalPresupuesto(){
var totalPres = parseFloat( presupuesto().toFixed(2)); 
//presupuesto() es la función que se encarga de hacer todos los calculos 
        divPresupuesto.innerHTML= 
        `
         Tu presupuesto estimado es de: ${totalPres} € + IVA <br>
        `;
}


