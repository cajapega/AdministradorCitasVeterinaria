const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//const formulario = document.querySelector('#ueva-cita');

//const contenedorCitas = document.querySelector('#citas');

//Para cada Input voy a tener un liseners, la mano a llamar
eventListeners();
function eventListeners() { //llamo la funcion
    mascotaInput.addEventListener("input", datosCita);
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
