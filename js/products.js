var minCount = undefined;
var maxCount = undefined;

let listado = []
function mostrarListado(unListado){
 unListado.forEach(elemento => {
   
    if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount))){
        
        contenido = `
        <div class="card col-xs-12 col-sm-6 col-md-3" style="width: 18rem;">
        <img src="${elemento.imgSrc} " class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${elemento.name}</h5>
        <p class="card-text">${elemento.description} </p>
        <p class="card-text">${elemento.currency} </p>
        <p class="card-text">${elemento.cost} </p>
        <a id="linkProduct" onClick="mostrarProducto(`+elemento.id+`)" href="product-info.html" class="btn btn-primary">Ver Producto</a>
        </div>
        </div>
 `
                  document.getElementById('cat-list-container').innerHTML += contenido
    }
});
}
function mostrarProducto(id) {
    window.localStorage.setItem('producto', id);
}

document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultado){
    if(resultado.status === 'ok'){
        listado = resultado.data;
        mostrarListado(listado);
    };
})
document.getElementById("sortAsc").addEventListener("click", function(){
        listado.sort(function(a,b){
        if(a.cost < b.cost){return 1};
        if(a.cost > b.cost){return -1};
        return 0;
    });
    document.getElementById('cat-list-container').innerHTML = "";
    mostrarListado(listado);
});

document.getElementById("sortDesc").addEventListener("click", function(){
        listado.sort(function(a,b){
        if(a.cost > b.cost){return 1}
        if(a.cost < b.cost){return -1}
        return 0;
    });
    document.getElementById('cat-list-container').innerHTML = "";
    mostrarListado(listado)
});

document.getElementById("sortByCount").addEventListener("click", function(){
    listado.sort(function(a,b){
        if(a.soldCount < b.soldCount){return 1};
        if(a.soldCount > b.soldCount){return -1};
        return 0;
    });
    document.getElementById('cat-list-container').innerHTML = "";
    mostrarListado(listado)
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
     document.getElementById("rangeFilterCountMin").value = "";
     document.getElementById("rangeFilterCountMax").value = "";
     
     minCount = undefined;
     maxCount = undefined;
     document.getElementById('cat-list-container').innerHTML = "";
     mostrarListado(listado);
   
});

 document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    document.getElementById('cat-list-container').innerHTML = "";
    mostrarListado(listado);
});
})
 