const ORDER_ASC_BY_PRICE = "Precio ascendente";
const ORDER_DESC_BY_PRICE = "Precio descendente";
const ORDER_BY_POPULARITY = "Cantidad vendida";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var pb = [];
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_POPULARITY){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" style="cursor:pointer;" onclick="javascript:location.href='product-info.html'">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <div>
                    <p>`+category.description+`</p>
                    </div>
                    <div>
                    <h4>`+category.currency+" "+category.cost+`</h4>
                    </div>
                </div>
            </div>
        </div>
        `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
//Mostrar busqueda
function mostrarbusqueda(){

    let htmlContentToAppend = "";
    for(let i = 0; i < pb.length; i++){
        let category = pb[i];
if (pb.length>0){
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" onclick="javascript:location.href='product-info.html'">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <div>
                    <p>`+category.description+`</p>
                    </div>
                    <div>
                    <h4>`+category.currency+" "+category.cost+`</h4>
                    </div>
                </div>
            </div>
        </div>
        `
        } else { document.getElementById("nser").innerHTML= ""; 
        var sr = document.createTextNode("No se encontraron resultados");
        document.getElementById("nser").appendChild(sr);
        }}

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }


function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_POPULARITY);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos.
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

        showCategoriesList();
    });
});

// Barra de busqueda
const bb = document.getElementById("barrabusqueda");
bb.addEventListener("keyup", (j) => {
    const buscarstring = j.target.value.toLowerCase();
    var productosfiltrados = currentCategoriesArray.filter((producto) => {
        return producto.name.toLowerCase().includes(buscarstring) 
        || producto.description.toLowerCase().includes(buscarstring);
});
    filtrado()
    function filtrado(){
        {pb = productosfiltrados}}
        mostrarbusqueda();
        console.log(productosfiltrados);
});
