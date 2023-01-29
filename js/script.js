//Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const contenedorCitas = document.querySelector('#citas');
const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

//Registro de eventos o Listeners
eventListeners();
function eventListeners() { //llamo la funcion
    mascotaInput.addEventListener('input', datosCita);
    /*Hay dos tipos para escuchas change e input la dif es que input lo hace en tiempo real
    (la docu es mas precisa cuando) y change se activa cuando elemento finaliza un cambio*/
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Funcion que guarda los datos ingresados en el Objecto citaObj
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
    //console.log(e.target.name)
    /*e es el objeto que representa el evento, y uno de sus atributos es el target, 
    que viene a ser el elemento que recibió el evento. (por ej un botón). Podemos especificar 
    que se acceda por atributo "e.target.name" en este caso el atributo name ej mascota 
    pero si pongo e.tarjet.value accedera por el valor que se esta escribiendo en la caja de 
    texto. Tambien puedo poner e.target.id y accedere por el atributo id del elemento html*/  
}

//Clases citas e InterfazU y sus instancias
class Citas {
    //constructor() {
    //    this.citas() = [];
    //}
}

class InterfazUsuario {
    imprimirAlerta(mensaje, tipo) {
        /*Creo variable que guardara el elemento contenido del DOM y dentro se insertara
        el nuevo elemento*/
        const contenido = document.querySelector('#contenido');
        //Creo el div del mensaje de alerta
        const divMensaje = document.createElement('div');

        //Agregar clase al tipo de error}
        if(tipo == "error") {
            divMensaje.classList.add('mensaje-alerta');
    
        } else {
            divMensaje.classList.add('mensaje-maravilloso');
        }
        divMensaje.textContent = mensaje;
        contenido.insertBefore(divMensaje, document.querySelector('#agregar-cita'));

        //Quitar la alerta despues de 4 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 4000);
        }
    }

const administradorCitas = new Citas();
const interfazUsuario = new InterfazUsuario();

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    //Extraigo la informacion del objeto de cita, realmente creo las variables y las guardo
    //con la informacion de los obejtos
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    if( mascota=="" || propietario=="" || telefono=="" || fecha=="" || hora=="" || sintomas=="") {
        //console.log("Todos los campos deben de llenarse");
        interfazUsuario.imprimirAlerta("Todos los campos deben de llenarse", "error");

        return; 
    }
}