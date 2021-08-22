let listado = []
function mostrarListado(unListado){
 unListado.forEach(elemento => {
     contenido = `
        <div class="row" style=""> 
            <div class="col-3">
                <img src="` + elemento.imgSrc + `" alt="` + elemento.description + `" class="img-thumbnail">
            </div>
             <div class="col">
            <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ elemento.name +`</h4>
                    <small class="text-muted">` + elemento.cost + elemento.currency + `</small>
             </div>
             <p class="mb-1">` + elemento.description + `</p>
         </div>
     </div>
 `
                  document.getElementById('cat-list-container').innerHTML += contenido
}); 

}
document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultado){
    if(resultado.status === 'ok'){
        listado = resultado.data;
        mostrarListado(listado);
    }
})
})