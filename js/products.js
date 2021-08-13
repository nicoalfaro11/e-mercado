//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    fetch(PRODUCTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos => { 
        datos.forEach(datos => {
            
            let row = "";
            row = `
        <tr>
            <td>` + datos.name + ` </td>
            <td>` + datos.description + `</td>
            <td>` + datos.cost + `</td>
            <td>` + datos.currency + `</td>
            <td>` + datos.soldCount + `</td>
            <td><img heigth="100px" width="100px" src="` + datos.imgSrc + `" alt=""></td>
        </tr>`
          
          document.getElementById("tabla").innerHTML += row;
        
        })
    
    })
    
    .catch(error => alert("Hubo un error:" + error)) 
})