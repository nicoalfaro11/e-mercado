//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let prod = localStorage.getItem("producto");

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
        }
    });
        getJSONData(PRODUCT_INFO_COMMENTS_URL + prod + ".json").then(function(resultObj){
          if (resultObj.status === "ok")
          {for(let i = 0; i < resultObj.data.length; i++){
            coment= resultObj.data[i];
            
            document.getElementById("comentarios").innerHTML+= `
            <div class="list-group-item list-group-item-action">
                <div class="row ">
                <div class="col-3 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="bi bi-file-person-fill" viewBox="0 0 16 16">
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
              </svg>
              </div>
                     <div class="col ">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ coment.user +`</h4>
                            <small class="text-muted">Puntaje: ` + coment.score + ` </small>
                        </div>
                        <p class="mb-1">` + coment.description + `</p>
                        <p class="mb-1">` + coment.dateTime + `</p>
                    </div>
                </div>
            </div>
            `
          }}
      });
    })