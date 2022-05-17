/**
 * Accederemos al documento.
 * En este caso vamos a usar el selector "querySelectorAll( )" el cual recibira
 * el elemento que vamosa  seleccionar, vamosa  seleccionar todos los elementos de 
 * la clase paciente, claro se que hemos agregado a cada <tr> de nuestra tabla contenedora de pacientes
 *  
 */
const pacientes = document.querySelectorAll(".paciente");

/**
 * En este bloque de codigo tendremos dos funciones validadoras, dichas funciones
 * son las encargadas de validar que nuestro peso y altura sean datos correctos,
 * hemos propuesto una limitante de peso, 1000 kg y un alimitante de altura a 3.00 metros
 * la funcion "validarPeso" tiene  como parametro el peso y retornara true o false,
 * el resultado depender de la validez del peso, no tendremos pesos negativos.
 * La funcion "validarAltura" cumple la mismas funbcionalidad que la anterior perovalida la altura
 * del paciente.
 * 
 */

const validarPeso = (peso) =>
(peso >=0 && peso <1000) ? true : false;

const validarAltura = (altura) =>
(altura >=0 && altura <3.00) ? true : false;

/**
 * Anteriormente guardamos en una variable todos nuestros pacientes, en este bloque de codigo vamos 
 * a recorrer los elementos con un ciclo for, la finalidad de este ciclo es la validacion
 * de los datos del paciente y utilizamreos las funciones que hemos creado en el bloque anterior,
 * ademas de ello, mediante este ciclo calcularemos el IMC de cada paciente.
 */

for (let index = 0; index < pacientes.length; index++) {
    var paciente = pacientes[index];
    var tdpeso = paciente.querySelector(".info-peso");
    var peso = tdpeso.textContent;
    
    var tdaltura = paciente.querySelector(".info-altura");
    var altura = tdaltura.textContent;
    
    var tdimc = paciente.querySelector(".info-imc");
    
    /**
     * Aqui invocaremos las funciones validadoras de peso y altura y crearemos dos variables
     * que tendran el resultado de la funcion, craremos a "pesoEsValido" y a "alturaEsValida"
     */
    let pesoEsValido = validarPeso(peso);
    var alturaEsValida = validarAltura(altura);

    /**
     * Creaemos tres bloques condicionales; Los primer bloque validara que el peso y la altura fuesen correctos,
     * en caso de no serlo mostraremos en el campo de IMC un mensaje que indique "Peso Incorrecto" o "Altura Incorrecta",
     * adicionalmente hemos creado en nuestro css una clase con nombre paciente-incorrecto, dicha clase
     * modificara el color de fondo (background-color) del elemento <tr>, para hacer uso de la clase, lo que 
     * haremos es agregar dicha clase a nuestro elemento, esto lo podremos hacer mediante el metodo "add" y
     * este metodo puede ser accedido mediante la propiedad "classList", con ello ya tendremos un indicativo
     * visual del error ya sea en el peso o en la altura.
     */
    if (!pesoEsValido) {
        tdimc.textContent = "Peso Incorrecto";
        paciente.classList.add("paciente-incorrecto");
        pesoEsValido = false;
    }
    if (!alturaEsValida) {
        tdimc.textContent = "Altura Incorrecta";
        paciente.classList.add("paciente-incorrecto");
        pesoEsValido = false;
    }

    /**
     * Nuestro tercer bloque de codigo simplemente validara que la altura y el peso sean correctos, en caso de que estas dos propiedades
     * de nuestro paciente sean correctas entonces invocaremos nuestra funcion "calcularIMC( )".
     * la funcion calcula y retorna el IMC calculado en funcion de dos parametros, el peso y la altura, con anterioridad hemos creado una variable
     * que contiene la celda de nuestra tabla de pacientes referente al imc, este elemento es un <td> que guardamos en una varible llamada "tdimc",
     * por ultimo accederemos y modficiaremos la propiedad "textContent" y asignaremos el retorno de la funcion "calcularIMC" a esta propiedad. 
     */
    if (pesoEsValido && alturaEsValida) {
        tdimc.textContent = calcularIMC(peso,altura);
    }

    /**
     * En este bloque tendremos la funcion "calcularIMC", dicha funcion tiene dos parametros, peso y altura, en ella se aplica la formula para calcular el IMC,
     * antes de retornar nuestro valor usaremos el metodo "toFixed( )" y daremos formato a  nuestro numero como float de dos posiciones.
     */
    function calcularIMC(peso,altura){
        const imc = peso / (altura*altura);
        return imc.toFixed(2);
    }
   
}




