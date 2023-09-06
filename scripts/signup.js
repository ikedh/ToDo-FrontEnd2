window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
        const form = document.forms[0];
        const inputNombre = document.getElementById('inputNombre');
        const inputApellido = document.getElementById('inputApellido');
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        const inputPasswordRepetida = document.getElementById('inputPasswordRepetida');
        const url = "https://todo-api.ctd.academy/v1"



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const payload = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value,
        }

        const settings = {
            method : 'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-type': 'application-json'
            }  

        }

        realizarRegister(settings)
        console.log(payload);
        
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {

        fetch(`${url}/users`,settings)
        .then(response =>{
            console.log(response);
        })
        if(!response.ok){
            alert("Todo mal")
        }




    };


});