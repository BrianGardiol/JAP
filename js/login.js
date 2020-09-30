var nombreusuario = local.Storage.getItem("user")

 function check(form)
{
    if (form.userid.value.length > 0 && form.password.value.length > 0)
    {localStorage.setItem("logged","1");
    localStorage.setItem("user",form.userid.value)
    location.href = "index.html";}
    else {cv()}
}

function cv() {
    document.getElementById("campovacio").innerHTML= ""; 
    var vacio = document.createTextNode("Debe introducir usario y contraseña");
    document.getElementById("campovacio").appendChild(vacio);
    document.getElementById("campovacio").style.marginTop = "10px";
    document.getElementById("campovacio").style.fontFamily = "'Baloo Tamma 2', Regular";
    document.getElementById("campovacio").style.color = "red"
  }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
