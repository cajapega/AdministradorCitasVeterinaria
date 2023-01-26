const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#ueva-cita');

const contenedorCitas = document.querySelector('#citas');

//Para cada Input voy a tener un liseners
eventListeners();
function eventListeners() { //llamo la funcion
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)
}


const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintoma: ''
}

function datosCita(e) {
    citaObj[e.tarjet.name] = e.tarjet.value; //de esta manera accedo a las propiedades
    console.log(citaObj);
}

//la funcion llamada datosCita se va a ir llamando cada vez
//que yo vaya escribiendo algo