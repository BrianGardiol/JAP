var category = {};
var ccomentariosArray = [];
var productos = [];
var ratingeneral = [];

//Crea una lista con todos los score de los comentarios y muestra estrellas del producto
function rating(){
    ratingeneral= [];
    for (i = 0; i < comentariosArray.length; i++) {
        ratingeneral.push(comentariosArray[i].score);};
        var total = 0;
      for(var i = 0; i < ratingeneral.length; i++) {
          total += ratingeneral[i];
      };
      if (parseInt(total / ratingeneral.length)===1)
      {document.getElementById("ratingproducto").innerHTML = `
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>`;}
      else if (parseInt(total / ratingeneral.length)===2)
      {document.getElementById("ratingproducto").innerHTML = `
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>`;}
      else if (parseInt(total / ratingeneral.length)===3)
      {document.getElementById("ratingproducto").innerHTML = `
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>`;}
      else if (parseInt(total / ratingeneral.length)===4)
      {document.getElementById("ratingproducto").innerHTML = `
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star" style="margin-top: 3px;"></span>`;}
      else {document.getElementById("ratingproducto").innerHTML = `
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>
      <span class="fa fa-star checked" style="margin-top: 3px;"></span>`;}
    }

      
      
//Funcion para enviar comentario
function enviarcomentario(){
 if (formcom.areacomen.value.length < 1)
 {stop;}
 else{
var comentario = {};
comentario.score = parseInt(formcom.punt.value);
comentario.description = formcom.areacomen.value;
comentario.user = localStorage.getItem("user");
var today = new Date();
var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
var time = ("0" + today.getHours()).slice(-2)+ ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
comentario.dateTime = date+' '+time;
comentariosArray.push(comentario);
showComments(comentariosArray);
estrellas();
document.getElementById("formcom").reset();}}

// Muestra las imagenes del producto
function showImagesGallery(array){
imageSrc = [];
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100">
        </div>
        `
        document.getElementById("productImagesGalleryInfo").innerHTML = htmlContentToAppend;
    }
    let activo = document.getElementById("productImagesGalleryInfo").getElementsByTagName("div")[0];
    activo.classList.add('active');
    
}

//Muestra las imagenes de productos relacionados
function showRelatedProducts(){

    let htmlContentToAppend = "";

    for(let i = 0; i < category.relatedProducts.length; i++){
        let imageR = productos[category.relatedProducts[i]].imgSrc;

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6" onclick="javascript:location.href='product-info.html'" style= "cursor:pointer;">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageR + `" alt="">
            </div>
        </div>
        `

        document.getElementById("relatedProductsGallery").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data;
            getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    category = resultObj.data;
        
                    let categoryNameHTML  = document.getElementById("categoryName");
                    let categoryDescriptionHTML = document.getElementById("categoryDescription");
                    let productCountHTML = document.getElementById("productCount");
                    let precioHTML = document.getElementById("precio");
                
                    categoryNameHTML.innerHTML = category.name;
                    categoryDescriptionHTML.innerHTML = category.description;
                    productCountHTML.innerHTML = category.soldCount+" Vendidos";
                    precioHTML.innerHTML = category.currency+" "+category.cost;
                    
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(com){
                        if (com.status === "ok")
                        {
                            comentariosArray = com.data;
                            showImagesGallery(category.images);
                            showRelatedProducts();
                            showComments(comentariosArray);
                            rating();
                        }
                    });
                }
            });
        }
    });  
});

//Funcion para convertir SCORE en estrellas
function estrellas(){
    
    var uno1=document.getElementsByClassName("estrella1");
    var uno;
    for (uno = 0; uno < uno1.length; uno++) {
    uno1[uno].innerHTML =`
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>`};
    var dos1=document.getElementsByClassName("estrella2");
    var dos;
    for (dos = 0; dos < dos1.length; dos++) {
    dos1[dos].innerHTML =`
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>`};
    var tres1=document.getElementsByClassName("estrella3");
    var tres;
    for (tres = 0; tres < tres1.length; tres++) {
    tres1[tres].innerHTML =`
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>`};
    var cuatro1=document.getElementsByClassName("estrella4");
    var cuatro;
    for (cuatro = 0; cuatro < cuatro1.length; cuatro++) {
        cuatro1[cuatro].innerHTML =`
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star" style="margin-top: 3px;"></span>`};
    var cinco1=document.getElementsByClassName("estrella5");
    var cinco;
    for (cinco = 0; cinco < cinco1.length; cinco++){
        cinco1[cinco].innerHTML  =`
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>
    <span class="fa fa-star checked" style="margin-top: 3px;"></span>`};}
//Muestra los comentarios
function showComments(array){

    let comentarios = "";
    for(let i = 0; i < array.length; i++){
        let come = array[i];

        comentarios += `
        <div class="list-group-item-action" style="background-color:none;">
            <div class="row">
                    <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div> 
                    
                    <h6 class="mb-1" style="font-weight: bold;">`+ come.user +`</h6>
                    </div>
                        <small class="text-muted">`+ come.dateTime +`</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p style="margin-bottom: 0px;">`+come.description+`</p>
                    <div class="estrella`+come.score+`">
                    </div>
                    </div>
                    </div>
            </div>
        </div>
        `
        
        document.getElementById("cat-list-container").innerHTML = comentarios;
    }
    estrellas()
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});
