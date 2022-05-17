
/**
 * Accedremos al documento mediante el metodo querySelector( ) y accederemos anuestro boton
 * que posee el id de "#adicionar-paciente", guardaremos este boton en una varible "botonAdicionar"
 */
var botonAdicionar = document.querySelector("#adicionar-paciente");

/**
 * Añadiremos un escuchador de eventos, el evento en este caso sera el evento click, y
 * manejaremos este evento mediante una fncion anonima, e el cuerpo de nuestra funcion
 * accederemos al document nuevamente esta ves para capturar y guardar en una variable el nodo
 * que se identifica bajo el id "#form-adicionar", dicho nodo contendra nuestro formulario. 
 */
botonAdicionar.addEventListener("click", function (event) {
  event.preventDefault();

  const form = document.querySelector("#form-adicionar");

  /**
   * Extraeremos los datos del formulario, esto lo aremos mediante nustra funcion 
   * "capturarDatosPacientes", esta funcion retorna un objeto paciente el cual almacenaremos
   * en la varaible paciente.
   */
  const paciente = capturarDatosPacientes(form);
  
 
  /**
   * Crearemos una variable errores que contendra el resultado de la validacion del paciente,
   * dicha validacion la haremos mediante la funcion validar paciente, esta funcion nos retorna un error,
   * los errores vendran en forma de arreglo ya que vamos a a capturar un error por cada campo. 
   */
  let errores = validarPaciente(paciente);

  /**
   * si nuestro arreglo de errores contiene almenos un error llamaremos a la funcion "exhibirMensajesErr"
   * para saber si existe algun error podemos comprobar el tamaño de nuestro arreglo, si es mayor a 0
   * entonces tendremos un error en los campos verificados, romperemos la continuidad de la funcion 
   * anonima en caso de encontrar errores con la palabra reservada return.
   */
  if (errores.length > 0) {
    exhibirMensajesErr(errores);
    return;
  }
  /**
   * En caso de no contar con ningun error llamaremos a nuestra funcion "adicionarPaciente",
   * mencionada funcion es la encargada de agregar el paciente a la tabla. 
   */
  
  adicionarPaciente(paciente);
  /**
   * Al no tener el modificaremos la propiedad "innerHTML" del nodo con id "#mensajes-errores"
   * con un texto vacio.
   */
  document.querySelector("#mensajes-errores").innerHTML = "";

  /**
   * Por ultimo limpiaremos nuestros campos del formulario
   */
  form.reset();
});

/**
 * La funcion adicionarPaciente recibe como parametro un paciente y agrega un elemento <tr> 
 * a nuestra tabla con los datos del paciente, para crear el elemento tr nos apollaremos de
 * la funcion crearTr que es la funcion encargada de crear dicho elemento 
 */
const adicionarPaciente = (paciente)=>{
  const pacienteTr = crearTr(paciente);
  /**
   * Selencionaremos la tabla usadon el metodo 'querySelector' con el id '#tabla-pacientes' y 
   * usaremos el metodo "appendChild( )" para agregar un elemento hijo a nuestra tabla.
   */
  const tabla = document.querySelector("#tabla-pacientes");
  tabla.appendChild(pacienteTr);
}

/**
 * La funcion 'capturarDatosPacientes' simplemente captura cada dato de los campos del formulario
 * y crea con estos datos nuestro objeto paciente y su respectivo IMC. 
 */
const capturarDatosPacientes = (form) => ({
  nombre: form.nombre.value,
  peso: form.peso.value,
  altura: form.altura.value,
  gordura: form.gordura.value,
  imc: calcularIMC(form.peso.value, form.altura.value),
});


const crearTr = (paciente) => {
  const pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(crearTd(paciente.nombre, "info-nombre"));
  pacienteTr.appendChild(crearTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(crearTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(crearTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(crearTd(paciente.imc, "info-imc"));

  return pacienteTr;
};

const crearTd = (dato, clase) => {
  const td = document.createElement("td");
  td.textContent = dato;
  td.classList.add(clase);

  return td;
};
const validarPaciente = (paciente) => {
  const errores = [];
  if (paciente.nombre.length == 0) {
    errores.push("El nombre no puede estar vacio");
  }
  if (paciente.peso.length == 0) {
    errores.push("El peso no puede estar vacio");
  }
  if (paciente.altura.length == 0) {
    errores.push("La altura no puede estar vacia");
  }
  if (paciente.gordura.length == 0) {
    errores.push("La gordura no puede estar vacia");
  }

  if (!validarPeso(paciente.peso)) {
    errores.push("El Peso es Incorrecto");
  }
  if (!validarAltura(paciente.altura)) {
    errores.push("La Altura es Incorrecta");
  }
  return errores;
};

const exhibirMensajesErr = (errores) => {
  const ul = document.querySelector("#mensajes-errores");
  ul.innerHTML = "";

  errores.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    ul.appendChild(li);
  });
};
