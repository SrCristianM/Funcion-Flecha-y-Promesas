/*
===========================================================
    LOADER DE PUNTOS SALTANDO
===========================================================
*/

const mostrarLoader = (contenedor) => {
    const loader = document.createElement("div");
    loader.classList.add("loader-dots");
    loader.id = "loaderTemp";

    loader.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;

    contenedor.appendChild(loader);
}

const ocultarLoader = () => {
    const loader = document.getElementById("loaderTemp");
    if (loader) loader.remove();
}

/*
==================================================
    EJERCICIO 1 - Mostrar texto usando una PROMESA
==================================================
*/

const mostrarTextoConPromesa = () => {
    const input = document.getElementById("inputTexto");
    const texto = input.value.trim();

    mostrarLoader(document.body); // muestra el loader mientras se procesa

    new Promise((resolve, reject) => {
        if (texto === "") {
            reject("Debe ingresar un texto");
        } else {
            setTimeout(() => resolve(texto), 1500); // simula espera de 1.5 segundos
        }
    })
    .then(msg => alert(`Mensaje recibido: ${msg}`)) // si todo va bien, muestra el mensaje
    .catch(err => alert(err)) // si hay error, lo muestra
    .finally(() => {
        ocultarLoader(); // quita el loader
        input.value = ""; // limpia el input
    });
};

/* ============================================================
   EJERCICIO 2 - Agregar texto a lista con PROMESA
   ============================================================ */

// Capturamos el formulario y la lista
const form = document.getElementById("form");
const lista = document.getElementById("lista");

// Función que retorna una promesa para agregar texto
const agregarTextoConPromesa = (texto) => {
    return new Promise((resolve, reject) => {
        if (!texto) {
            reject("El texto no puede estar vacío");
        } else {
            setTimeout(() => resolve(texto), 1000); // simula espera de 1 segundo
        }
    });
};

// Manejo del evento submit
form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    const texto = document.getElementById("texto").value.trim();

    // Mostrar loader mientras se procesa
    mostrarLoader(document.body);

    agregarTextoConPromesa(texto)
        .then((txt) => {
            const li = document.createElement("li");
            li.textContent = txt;
            lista.appendChild(li);
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            ocultarLoader(); // ocultar loader al terminar
            form.reset();    // limpiar el formulario
        });
});


// EJERCICIO 3 - Suma con PROMESA

// Capturamos el formulario y el elemento donde se mostrará el resultado
const form2 = document.getElementById("form2");
const resultado = document.getElementById("resultado");

// Función que retorna una promesa que suma dos números después de 1 segundo
const sumarConPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (isNaN(a) || isNaN(b)) {
            reject("Debe ingresar dos números válidos");
        } else {
            setTimeout(() => resolve(a + b), 1000); // espera de 1 segundo
        }
    });
};

// Manejamos el evento submit del formulario
form2.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que se recargue la página

    // Obtenemos los valores de los inputs
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    // Limpiamos el resultado anterior
    resultado.textContent = "";

    // Mostrar loader mientras se procesa
    mostrarLoader(document.body);

    // Ejecutamos la promesa
    sumarConPromesa(num1, num2)
        .then(suma => {
            resultado.textContent = `Resultado: ${suma}`;
        })
        .catch(error => {
            alert(error);
        })
        .finally(() => {
            ocultarLoader(); // ocultar loader al terminar
            form2.reset();   // limpiar el formulario
        });
});



// ========== EJERCICIO 4 - Formulario de registro con PROMESAS ==========
// Captura de elementos
const formRegistro = document.getElementById("formRegistro");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// Funciones de validación con promesas
const validarNombreP = () => {
  return new Promise((resolve, reject) => {
    if (nombre.value.trim().length < 3) {
      reject("El nombre debe tener al menos 3 caracteres");
    } else {
      resolve();
    }
  });
};

const validarEmail = () => {
  return new Promise((resolve, reject) => {
    const valor = email.value.trim();
    if (!valor.includes("@") || !valor.includes(".")) {
      reject("Debe ingresar un email válido");
    } else {
      resolve();
    }
  });
};

const validarPasswordP = () => {
  return new Promise((resolve, reject) => {
    if (password.value.length < 6) {
      reject("La contraseña debe tener mínimo 6 caracteres");
    } else {
      resolve();
    }
  });
};


// Proceso del formulario
formRegistro.addEventListener("submit", e => {
  e.preventDefault();

  // Limpiar errores
  errorNombre.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";

  mostrarLoader(formRegistro);

  Promise.allSettled([validarNombreP(), validarEmail(), validarPasswordP()])
    .then(results => {
      if (results[0].status === "rejected") {
        errorNombre.textContent = results[0].reason;
      }
      if (results[1].status === "rejected") {
        errorEmail.textContent = results[1].reason;
      }
      if (results[2].status === "rejected") {
        errorPassword.textContent = results[2].reason;
      }

      const validado = results.every(r => r.status === "fulfilled");

      if (validado) {
        const usuario = {
          nombre: nombre.value.trim(),
          email: email.value.trim()
        };

        agregarUsuario(usuario);
        formRegistro.reset();
      }
    })
    .finally(() => ocultarLoader());
});


// ===================================================
// AGREGAR USUARIO A LA LISTA (TARJETA)
// ===================================================

const agregarUsuario = usuario => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
    <strong>${usuario.nombre}</strong><br>
    ${usuario.email}
  `;
  contenedorUsuarios.appendChild(card);
}


// ======= Ejercicio Aparte =========

// Capturamos el formulario y el display del contador
const formContador = document.getElementById("formContador");
const displayContador = document.getElementById("displayContador");

// Función que retorna una promesa para ejecutar un contador regresivo
const contadorConPromesa = (segundos) => {
    return new Promise((resolve, reject) => {
        if (isNaN(segundos) || segundos <= 0) {
            reject("Debe ingresar un número de segundos válido");
        } else {
            let tiempo = segundos;
            displayContador.textContent = `Iniciando contador: ${tiempo}`;

            const intervalo = setInterval(() => {
                tiempo--;
                displayContador.textContent = `Tiempo restante: ${tiempo}`;

                if (tiempo <= 0) {
                    clearInterval(intervalo);
                    resolve("¡Tiempo terminado!");
                }
            }, 1000);
        }
    });
};

// Manejo del evento submit
formContador.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    const segundos = parseInt(document.getElementById("segundos").value);

    // Mostrar loader mientras se procesa
    mostrarLoader(document.body);

    contadorConPromesa(segundos)
        .then(msg => {
            displayContador.textContent = msg;
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            ocultarLoader(); // ocultar loader al terminar
            formContador.reset(); // limpiar formulario
        });
});



