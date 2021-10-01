//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let prod = localStorage.getItem("producto");
let relacionados = []
function mostrarRelacionados(objeto){  
    let contenido = "";
        contenido = `
      
    <div class="card m-5" style="width: 18rem;">
       <img src="` + objeto.imgSrc + `" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">`+ objeto.name +`</h5>
        <small class="text-muted">` + objeto.cost + objeto.currency + `</small>
        <p class="card-text">` + objeto.description + `</p>
        <a onClick="mostrarProducto(`+objeto.id+`)" href="product-info.html" class="btn btn-dark">Ver producto</a>
      </div>
    </div>`
                 
    document.getElementById('rela').innerHTML += contenido;
}

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img id="imgProduct" class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prod + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;

            let productNameHTML  = document.getElementById("categoryName");
            let productDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCategory = document.getElementById("productCriteria");
        
            productNameHTML.innerHTML = producto.name;
            productDescriptionHTML.innerHTML = producto.description;
            productCountHTML.innerHTML = producto.soldCount;
            productCategory.innerHTML = producto.category;
            showImagesGallery(producto.images);
            for (let i = 0; i < producto.relatedProducts.length; i++) {
            getJSONData(PRODUCTS_URL).then(function(resultado){
                if (resultObj.status === "ok"){
                    relacionados = resultado.data;
                    mostrarRelacionados(relacionados[producto.relatedProducts[i]])
                }
        })
    };
  }
});

getJSONData(PRODUCT_INFO_COMMENTS_URL + prod + ".json").then(function(resultObj){
          if (resultObj.status === "ok"){
              for(let i = 0; i < resultObj.data.length; i++){
            coment = resultObj.data[i];
            
            document.getElementById("comentarios").innerHTML+= `
          <div class="card m-5" style="width: 500px;">
            <div class="col-3 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="m-3 bi bi-file-person-fill" viewBox="0 0 16 16">
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
              </svg>
            </div>
            <div class="card-body">
              <h5 class="card-title">`+ coment.user +`</h5>
              <h6 class="card-subtitle mb-2 text-muted">Puntaje: ` + coment.score + ` </h6>
              <p class="card-text">` + coment.description + `</p>
            </div>
          </div>
            `;
         };
      };
    });

    document.getElementById('enviarComent').addEventListener('click', function(e){
       let comentario = document.getElementById('newComents').value
        if(comentario !== "" && comentario !== undefined){
            document.getElementById("comentarios").innerHTML+= `
        <div class="card m-5" style="width: 500px;">
          <div class="col-3 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="m-3 bi bi-file-person-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
            </svg>
          </div>
          <div class="card-body">
            <h5 class="card-title">`+ localStorage.getItem('usuario') +`</h5>
            <h6 class="card-subtitle mb-2 text-muted">Puntaje: ` + coment.score + ` </h6>
            <p class="card-text">`+comentario+`</p>
          </div>
        </div>`;
        
      }else{
            alert('Escriba un comentario');
        }
      });
    })