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
    mascotaInput.addEventListener('change', datosCita)
}

function datosCita(e) {
    console.log(e.target.value) //con esto veo lo que se escribe
}

//la funcion llamada datosCita se va a ir llamando cada vez
//que yo vaya escribiendo algo