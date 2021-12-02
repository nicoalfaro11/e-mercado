//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let nombre = document.getElementById('nombrete');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
let edad = document.getElementById('edad');
let telefono = document.getElementById('tel'); 

document.addEventListener("DOMContentLoaded", function(e){
let dataPerfil = localStorage.getItem('userData');
let dataUserObj = JSON.parse(dataPerfil);

content = "";
content = `
 <div class="card" style="width: 18rem;">
  <img src="img/user.png" class="card-img-top" alt="">
   <div class="card-body">
     <h5 class="card-title text-muted">Perfil del Usuario</h5>
     <p class="card-text text-muted">Nombre: ${dataUserObj.nombre} </p>
     <p class="card-text text-muted">Apellido: ${dataUserObj.apellido} </p>
     <p class="card-text text-muted">e-mail: ${dataUserObj.email} </p>
     <p class="card-text text-muted">Edad: ${dataUserObj.edad} </p>
     <p class="card-text text-muted">Telefono de contacto: ${dataUserObj.tel} </p>
   </div>
 </div>
`;
document.getElementById('userData').innerHTML += content;
document.getElementById('cambios').addEventListener('click',function(e){
    let dataUserObjet = {
        nombre : nombre.value,
        apellido : apellido.value,
        email : email.value,
        edad : edad.value,
        tel : telefono.value
    }
   localStorage.setItem('userData', JSON.stringify(dataUserObjet))
})
});
