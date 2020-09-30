//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productos
var todos=[]
var precios=[]
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
         productos = resultObj.data;
        }
        showCategoriesList();
    });  
});

function subtotal(){
    precio = [];
    precios = [];
    for(let i = 0; i < document.getElementsByClassName("dinero").length; i++){
        precio.push(parseInt(document.getElementsByClassName("dinero")[i].textContent.replace(/\D+/g, ' ').trim()));
        }
        document.getElementById("subtotal").innerHTML = "Subtotal:"+" "+"$"+precio.reduce((a, b) => a + b, 0)
        
}

function sumarcantidad(x){
    document.getElementById(x).value = 
    parseInt(document.getElementById(x).value)+1;
    calcularTotal(x)    
}
function restarcantidad(x){
    if (document.getElementById(x).value >1) {
        document.getElementById(x).value = 
        parseInt(document.getElementById(x).value)-1;
    calcularTotal(x)
    }
        else {stop}
}
function calcularTotal(x){
    if (document.getElementById(x+"unitario").textContent.includes("UYU")) {
    document.getElementById(x+"total").innerHTML = "UYU"+" "+x*document.getElementById(x).value;
} else { document.getElementById(x+"total").innerHTML = "UYU"+" "+(x*document.getElementById(x).value)*40;}
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < productos.articles.length; i++){
        let producto = productos.articles[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.src+ `" class="img-thumbnail" style="height: 110px;">
                </div>
                <div class="col" style="display: flex;
                justify-content:center;
                align-items:center;">
                    <div class="d-flex w-100 justify-content-between">
                    <div style="width: 326.4px">
                    <h5>`+ producto.name +`</h5>
                    </div>
                    <div style="width: 161px; text-align: center;">
                    <h5 id="`+producto.unitCost+"unitario"+`">`+producto.currency+" "+producto.unitCost+`</h5>
                    </div>
                    <div style="width: 161px; text-align: center; height: 32px;">
                    <button onclick="restarcantidad(`+producto.unitCost+`); subtotal();">-</button>
                    <input name="" value=`+producto.count+` size="4" title="Cantidad" class="" min="1" maxlength="12" id="`+producto.unitCost+`" readonly="readonly">
                    <button onclick="sumarcantidad(`+producto.unitCost+`); subtotal();">+</button>
                    </div>
                    <div style="width: 161px; text-align: center;">
                    <div>
                    <h5 class="dinero" style="text-align: center;" id="`+producto.unitCost+"total"+`" value="1"></h5>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
          
        document.getElementById("cat-list-container").innerHTML += htmlContentToAppend; 
        calcularTotal(12500)
        calcularTotal(100)
        document.getElementById("cat-list-container").innerHTML += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" id="subtotal"></h5>
                </div>
            </div>
        </div>
    </div>
    `;
    }