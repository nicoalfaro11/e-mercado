//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){   
  document.getElementById("boton").addEventListener('click', function(){
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;
    if(usuario.length > 0 && contraseña.length > 0){
      localStorage.setItem('usuario', usuario);
      let userData = {
        nombre: "",
        apellido:"",
        email: "",
        edad: "",
        tel: "",
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      location.href="inicio.html";
    }
    else{
      alert('Ingrese sus datos correctamente');
    }
  })
});
