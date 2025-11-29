window.addEventListener('DOMContentLoaded', () => {
    alert('Bienvenido a la pagina de Funciones flecha en JavaScript');
});

//Ejercicio 1: Mostrar Texto

const mostrarTexto = () => {
    const input = document.getElementById('inputTexto');
    const texto = input.value.trim();

    if(!texto) return alert('Por favor, ingrese un texto');

    alert(`texto ingresado: ${texto}`);
    input.value = '';
};

//ejercicio 2: Agregar texto a la lista

const formLista = document.getElementById('form');
const lista = document.getElementById('lista');

formLista.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto =document.getElementById('texto').value.trim();
    if (!texto) return alert('Por favor, ingrese un texto');

    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);

    formLista.reset();
});

//Ejercicio 3: Sumar con funcion flecha

const form2 = document.getElementById('form2');

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = document.getElementById('resultado');

    if (isNaN(num1) || isNaN(num2)) {
        return alert('por favor, ingrese numeros validos ');
    }

    const sumar = (a, b) => a + b;

    resultado.textContent = `Resultado: ${sumar(num1,num2)}`;
    form2.reset();
});

// Ejercicio 4: ================================================
const formRegistro = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword")

const contenedorUsuarios = document.getElementById("usuarios");

// Validaciones
const validarNombre = () => {
    if (nombre.value.trim().length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres";
        return false;
    }
    errorNombre.textContent = "";
    return true;
};

const validarEmail = () => {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value.trim())) {
        errorEmail.textContent = "Ingrese un email válido";
        return false;
    }
    errorEmail.textContent = "";
    return true;
};

const validarPassword = () => {
    if (password.value.trim().length < 6) {
    errorPassword.textContent = "La contraseña debe tener mínimo 6 caracteres";
    return false;
}

    errorPassword.textContent = "";
    return true;
};

// Eventos de validacion
nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
password.addEventListener("input", validarPassword);

//Procesar el formulario de registro

formRegistro.addEventListener("submit", (e) =>{
    e.preventDefault();

    const valido =
        validarNombre() &&
        validarEmail() &&
        validarPassword();

        if (!valido) {
            alert("Por favor, corrija los errores antes de continuar. ");
            return;
        }


const usuario = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    password: password.value.trim()
}

agregarUsuario(usuario);
formRegistro.reset();
});

//Mostrar usuario registrado

const agregarUsuario = (usuario) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
    <strong>${usuario.nombre}</strong><br>
    ${usuario.email}
   `;
   
   contenedorUsuarios.appendChild(card);
};

//Ejercicio Aparte

const formPalabras = document.getElementById("formPalabras");
const listaFiltrada = document.getElementById("listaFiltrada");

// Función flecha para dividir el texto en palabras
const obtenerPalabras = texto => texto.split(",").map(p => p.trim());

// Función flecha para filtrar palabras largas
const filtrarLargas = palabras => palabras.filter(p => p.length > 5);

// Manejo del evento submit
formPalabras.addEventListener("submit", e => {
    e.preventDefault();

    const texto = document.getElementById("inputPalabras").value.trim();

    // Limpiamos la lista anterior
    listaFiltrada.innerHTML = "";

    if (!texto) {
        alert("Debe ingresar al menos una palabra");
        return;
    }

    // Procesamos con funciones flecha
    const palabras = obtenerPalabras(texto);
    const largas = filtrarLargas(palabras);

    // Mostramos resultado
    if (largas.length === 0) {
        listaFiltrada.innerHTML = "<li>No hay palabras largas</li>";
    } else {
        largas.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            listaFiltrada.appendChild(li);
        });
    }

    formPalabras.reset();
});





