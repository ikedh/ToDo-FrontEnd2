// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if(!localStorage.jwt){
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

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click",function (){
    const cerrarSesion = confirm("¿Seguro de que quiere cerrar?")
    if(cerrarSesion){
      localStorage.clear()
      location.replace('./index.html')
    }
  })
  


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario (){
    const settings={
      method : 'GET',
      headers : {
        authorization: token
      }
    }

    console.log("Consultando info");

    fetch(urlUser,settings)
      .then(response=> response.json())
      .then(data =>{
        console.log(data);
        console.log(data.firstName)
        const userName = document.querySelector(".user-info p")
        userName.innerText = data.firstName;
      }).catch(err =>{
        console.log(err);
      })
  }


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

    function consultarTarea(){
      const settings= {
        method: 'GET',
        headers : {
          authorization: token
        }
      };
      console.log("Consultando Tareas");

      fetch(urlTaks,settings)
      .then(response => response.json)
      .then(tareas =>{
        console.table(tareas);
      }).catch(err=>{
        console.log(err);
      })
    }




  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

 


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
 

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
 

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */

});