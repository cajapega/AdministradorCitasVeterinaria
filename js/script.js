//Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const contenedorCitas = document.querySelector('#citas');
const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

let editando; //Esta variable al llamar funcion cargarEdicion se le cargara el valor de True 

//Registro de eventos o Listeners
eventListeners();
function eventListeners() { //llamo la funcion
    mascotaInput.addEventListener('change', datosCita);
    /*Hay dos tipos para escuchas change e input la dif es que input lo hace en tiempo real
    (la docu es mas precisa cuando) y change se activa cuando elemento finaliza un cambio*/
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
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
    //console.log(e.target.name)
    /*e es el objeto que representa el evento, y uno de sus atributos es el target, 
    que viene a ser el elemento que recibió el evento. (por ej un botón). Podemos especificar 
    que se acceda por atributo "e.target.name" en este caso el atributo name ej mascota 
    pero si pongo e.tarjet.value accedera por el valor que se esta escribiendo en la caja de 
    texto. Tambien puedo poner e.target.id y accedere por el atributo id del elemento html*/  
}

//Clases citas e InterfazU y sus instancias
class Citas {
    constructor() {
        this.citas = new Array();
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    /*Vamos a acceder a citas y traeremos todas que sean diferentes a la que le estamos pasando*/
    eliminarCita(id) {
        //Filter quita un elemento o los demas dependiendo
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        /*Map a fiferencia de for each, ambos van a recorrer los elementos del arreglo pero Maps
        nos crea un nuevo arreglo por lo tanto va a reescribir lo que tengamos en citas pero no se 
        queda solo dentro de la funcion si no tambien en toda la variable arreglo cita de la clase 
        (por el this). Entonces asi nos regresa un nuevo arreglo que se a va a asignar a citas,*/
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);

    }
}

class InterfazUsuario {
    imprimirAlerta(mensaje, tipo) {
        /*Creo variable que guardara el elemento contenido del DOM y dentro se insertara
        el nuevo elemento*/
        const divMensaje = document.createElement('div');

        //Agregar clase al tipo de error}
        if(tipo == "error") {
            divMensaje.style.backgroundColor="rgb(255, 67, 104)";
            divMensaje.style.color="rgb(255, 255, 255)";
            divMensaje.style.textAlign="center";
        } else {
            //divMensaje.classList.add('mensaje-maravilloso');
        }
        divMensaje.textContent = mensaje;
        
        //Creo el div del mensaje de alerta
        const contenido = document.querySelector('#contenido');
        contenido.insertBefore(divMensaje, document.querySelector('#agregar-cita'));

        //Quitar la alerta despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
        }

        imprimirCitas({ citas }) {//Extraigo las citas del objeto

            this.limpiarHTML(); //Mando a llamar el metodo antes de hacer la iteraccion
            citas.forEach(cita => {
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

                const divCita = document.createElement('div');

                //Style div Cita
                divCita.style.fontSize = "0.85rem";
                divCita.style.lineHeight = "0"; //elimina el interlineado
                divCita.style.padding = "0";
                divCita.style.paddingTop = "5px";


                //Le agrego el ID generado
                divCita.dataset.id = id; 

                //Scripting de los elementos de la cita
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.textContent = mascota;
                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `<span> Propietario: </span> ${propietario}`; 
                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `<span> Telefono: </span> ${telefono}`;
                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `<span> Fecha: </span> ${fecha}`;
                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `<span> Hora: </span> ${hora}`;
                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `<span> Sintomas: </span> ${sintomas}`;

                //Se añade Boton de eliminar
                const btnEliminar = document.createElement('button');

                btnEliminar.style.marginRight = "15px"; 
                btnEliminar.style.padding = "0.40em 1.5em";
                btnEliminar.style.borderRadius = "10px";

                btnEliminar.textContent = 'Eliminar';
                
                btnEliminar.onclick = () => eliminarCita(id);

                //Se añade Boton editar
                const btnEditar = document.createElement('button');

                btnEditar.style.padding = "0.30em 1.2em";
                btnEditar.style.borderRadius = "10px";

                btnEditar.textContent = 'Editar';

                btnEditar.onclick = () => cargarEdicion(cita);

                //Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);

                //Agregar las citas al HTML
                contenedorCitas.appendChild(divCita);
            });
        }

        //Evita que se dupliquen las citas
        limpiarHTML() {
            while(contenedorCitas.firstChild) {
                /*mientras sea verdadera la condicion eliminaremos cada uno de los hijos del 
                //contenedor cita*/
                contenedorCitas.removeChild(contenedorCitas.firstChild);
            }
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
    if( mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas==='') {
        //console.log("Todos los campos deben de llenarse");
        interfazUsuario.imprimirAlerta("Todos los campos deben de llenarse", "error");

        return; 
    }

    if(editando) {
        //Al entrar en modo edicion, no ejecutamos agregarCita  si no que crearemos 
        //un nuevo metodo para actualizar la funcion nueva cita en el caso de editar

        //Pasamos el objeto de la cita a edicion, pero una copia
        administradorCitas.editarCita({...citaObj});

        interfazUsuario.imprimirAlerta('Editado Correctamente');

        //Devolvemos el mensaje del formulario a su tetxo original
        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        //Quitar modo edicion
        editando = false;
    } else {
        //Modo Nueva Cita, primero creo el ID
        citaObj.id = Date.now(); 
    
        //Creo una nueva cita, le paso el objeto a la instancia de Citas
        administradorCitas.agregarCita({...citaObj}); //los tres puntos pasan una copia

        //Mensaje de Agregado correctamente
        interfazUsuario.imprimirAlerta('Se agrego Correctamente')
    }



    //Reinicia el objeto
    reiniciarObjeto();
    
    //einiciar el formulario
    formulario.reset();

    //Para imprimir citas necesto la ref completa del arreglo
    interfazUsuario.imprimirCitas(administradorCitas);
}


function reiniciarObjeto () {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita (id) {
    administradorCitas.eliminarCita(id);
    interfazUsuario.imprimirAlerta('La cita se elimino correctamente');
    //Refresca las citas
    interfazUsuario.imprimirCitas(administradorCitas);
}

function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenamos el objeto con los nuevos datos
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Vamos a llenar los input del html con .value, antes aplico destructuring para obetener los datos
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Cambiar el texto del boton del formulario 
    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
    
    //Al convertirse en true en funcion nueva cita se pasara ese a un if
    editando = true; 
}

console.log(citaObj);

