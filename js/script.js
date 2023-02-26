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
        this.citas = this.citas.filter( cita => cita.id !== id)
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

    citaObj.id = Date.now();
    
    //Creo una nueva cita, le paso el objeto a la instancia de Citas
    administradorCitas.agregarCita({...citaObj}); //los tres puntos pasan una copia

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
}

console.log(citaObj);

