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

function totalunidades(x)
    {if (document.getElementById(x+"unitario").textContent.includes("UYU")) {
     document.getElementById(x+"total").innerHTML = "UYU"+" "+x*document.getElementById(x).value;
     } else { document.getElementById(x+"total").innerHTML = "UYU"+" "+(x*document.getElementById(x).value)*40;}
    }

function tipoe(){
      if (document.getElementById("goldradio").checked)
      {precio = [];
        precios = [];
        for(let i = 0; i < document.getElementsByClassName("dinero").length; i++)
           {precio.push(parseInt(document.getElementsByClassName("dinero")[i].textContent.replace(/\D+/g, ' ').trim()));}
           document.getElementById("subtotal").innerHTML = "$"+" "+precio.reduce((a, b) => a + b, 0);
           document.getElementById("costoenvio").innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))/100)*15;
           document.getElementById("total"). innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))+
           (parseInt(document.getElementById("costoenvio").textContent.replace(/\D+/g, ' ').trim())));}
      else if (document.getElementById("premiumradio").checked)
      {precio = [];
        precios = [];
        for(let i = 0; i < document.getElementsByClassName("dinero").length; i++)
           {precio.push(parseInt(document.getElementsByClassName("dinero")[i].textContent.replace(/\D+/g, ' ').trim()));}
           document.getElementById("subtotal").innerHTML = "$"+" "+precio.reduce((a, b) => a + b, 0);
           document.getElementById("costoenvio").innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))/100)*7;
           document.getElementById("total"). innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))+
           (parseInt(document.getElementById("costoenvio").textContent.replace(/\D+/g, ' ').trim())));}
      else
      {precio = [];
        precios = [];
        for(let i = 0; i < document.getElementsByClassName("dinero").length; i++)
           {precio.push(parseInt(document.getElementsByClassName("dinero")[i].textContent.replace(/\D+/g, ' ').trim()));}
           document.getElementById("subtotal").innerHTML = "$"+" "+precio.reduce((a, b) => a + b, 0);
           document.getElementById("costoenvio").innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))/100)*5;
           document.getElementById("total"). innerHTML = "$"+" "+((parseInt(document.getElementById("subtotal").textContent.replace(/\D+/g, ' ').trim()))+
           (parseInt(document.getElementById("costoenvio").textContent.replace(/\D+/g, ' ').trim())));}}

function showCategoriesList()
    {let htmlContentToAppend = "";
     for(let i = 0; i < (productos.articles.length); i++)
        {let producto = productos.articles[i];
            htmlContentToAppend += `
    <div class="list-group-item" style="width:100%;text-align:inherit;padding-top: 6px;
    padding-bottom: 6px;">
    <div class="row">
      <div style="width: 150px; padding-left:14px; text-align: center">
        <img src="` + producto.src+ `" class="img-thumbnail" style="height: 50px;">
      </div>
      <div class="col" style="display: flex;justify-content:center;align-items:center;">
        <div class="d-flex w-100 justify-content-between">
          <div style="width: 326.4px">
            <h5 style="margin-bottom: none;">`+ producto.name +`</h5>
          </div>
          <div style="width: 207px; text-align: center;">
            <h5 id="`+producto.unitCost+"unitario"+`">`+producto.currency+" "+producto.unitCost+`</h5>
          </div>
          <div style="width: 207px; text-align: center; height: 32px;">
            <input onclick="totalunidades(`+producto.unitCost+`);tipoe();" onkeyup="totalunidades(`+producto.unitCost+`);tipoe();"
            style="width: 40px; text-align: center;" type="number" value=`+producto.count+` min="1" maxlength="12" id="`+producto.unitCost+`">
          </div>
          <div style="width: 207px; text-align: center;">
            <h5 class="dinero" style="text-align: center;" id="`+producto.unitCost+"total"+`"></h5>
          </div>
        </div>
      </div>
    </div>
  </div>`}
        document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
        totalunidades(12500)
        totalunidades(100)
        tipoe();
      }