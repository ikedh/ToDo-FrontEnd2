// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
  location.replace('/index.html')
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  const urlTaks = "https://todo-api.ctd.academy/v1/tasks"
  const urlUser = "https://todo-api.ctd.academy/v1/users/getMe"
  const token = JSON.parse(localStorage.jwt)
  const btnCerrarSesion = document.querySelector("#closeApp")

  obtenerNombreUsuario()
  consultarTarea()
  renderizarTareas(listado)

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    const cerrarSesion = confirm("¿Seguro de que quiere cerrar?")
    if (cerrarSesion) {
      localStorage.clear()
      location.replace('./index.html')
    }
  })



  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
    }

    console.log("Consultando info");

    fetch(urlUser, settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.firstName)
        const userName = document.querySelector(".user-info p")
        userName.innerText = data.firstName;
      }).catch(err => {
        console.log(err);
      })
  }


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTarea() {
    const settings = {
      method: 'GET',
      headers: {
        authorization: token
      }
    };
    console.log("Consultando Tareas");

    fetch(urlTaks, settings)
      .then(response => response.json)
      .then(tareas => {
        console.table(tareas);
      }).catch(err => {
        console.log(err);
      })
  }




  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("crear terea");
    console.log(nuevaTarea.value);

    const payload = {
      description: nuevaTarea.value.trim()
    };
    const settings = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }
    console.log("Creando un tarea en la base de datos");
    fetch(urlTaks, settings)
      .then(response => response.json())
      .then(tarea => {
        console.log(tarea)
        consultarTarea();
      })
      .catch(error => console.log(error));


    //limpiamos el form
    formCrearTarea.reset();
  })


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {

    // obtengo listados y limpio cualquier contenido interno
    const tareasPendientes = document.querySelector('.tareas-pendientes');
    const tareasTerminadas = document.querySelector('.tareas-terminadas');
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";

    // buscamos el numero de finalizadas
    const numeroFinalizadas = document.querySelector('#cantidad-finalizadas');
    let contador = 0;
    numeroFinalizadas.innerText = contador;

    listado.forEach(tarea => {
      //variable intermedia para manipular la fecha
      let fecha = new Date(tarea.createdAt);

      if (tarea.completed) {
        contador++;
        //lo mandamos al listado de tareas completas
        tareasTerminadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
                        `
      } else {
        //lo mandamos al listado de tareas sin terminar
        tareasPendientes.innerHTML += `
                          <li class="tarea">
                            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                            <div class="descripcion">
                              <p class="nombre">${tarea.description}</p>
                              <p class="timestamp">${fecha.toLocaleDateString()}</p>
                            </div>
                          </li>
                                        `
      }
      // actualizamos el contador en la pantalla
      numeroFinalizadas.innerText = contador;
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */

 


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */

});