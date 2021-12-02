let productCost = 0;
let productCount = 0;
let comissionPercentage = 0;


function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("unitario");
    let comissionCostHTML = document.getElementById("porcent");
    let totalCostHTML = document.getElementById("cosTot");

    let unitCostToShow =  productCost;
    let comissionToShow = comissionPercentage;
    let totalCostToShow = (Math.round(productCost + comissionPercentage));

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow
}
function subtotal(i, valor){
    let subTotal = document.getElementById('cant'+i).value * valor;
    document.getElementById('sub'+i).innerHTML = subTotal;
    document.getElementById('cosTot').innerHTML = '$' + comissionPercentage;
    document.getElementById('unitario').innerHTML = '$' + parseInt(document.getElementById('sub'+i).innerHTML);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status === 'ok'){
            let articulo = resultObj.data;
            for (let i = 0; i < articulo.articles.length; i++) {
                if(articulo.articles[i].currency == 'USD'){
                    var valor = articulo.articles[i].unitCost * 40
                }else{
                    var valor = articulo.articles[i].unitCost
                }
                let content = "";
                    content = `
                    <tbody>
                        <tr>
                            <td scope="row"><img src="${articulo.articles[i].src}" width=200px"></td>
                            <td>${articulo.articles[i].name}</td>
                            <td><input min="1" id="cant${i}" class="form-control" onchange="subtotal(${i}, ${valor})" type="number" value="${articulo.articles[i].count}"></td>
                            <td>UYU</td>
                            <td>${valor}</td>
                            <td id="sub${i}">${valor * articulo.articles[i].count}</td>
                        </tr>
                    </tbody>`;
                    document.getElementById('articulo').innerHTML += content;
                    document.getElementById("prem").addEventListener("change", function(){
                        
                        comissionPercentage = document.getElementById('sub'+i).innerHTML * 15 / 100;
                        productCost = parseInt(document.getElementById('sub'+i).innerHTML)
                        updateTotalCosts();
                    });
                    
                    document.getElementById("exp").addEventListener("change", function(){
                        
                        comissionPercentage = document.getElementById('sub'+i).innerHTML * 7 / 100;
                        productCost = parseInt(document.getElementById('sub'+i).innerHTML)
                        updateTotalCosts();
                    });
                    
                    document.getElementById("estand").addEventListener("change", function(){
                        
                        comissionPercentage = document.getElementById('sub'+i).innerHTML * 5 / 100;
                        productCost = parseInt(document.getElementById('sub'+i).innerHTML)
                        updateTotalCosts();
                    });
            };
        }
    })
});
