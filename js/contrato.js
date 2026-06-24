//declarando variables
let CajaLoginRegistro=document.querySelector(".CajaLoginRegistro")
let FormularioLogin=document.querySelector(".FormularioLogin")
let FormularioRegistro=document.querySelector(".FormularioRegistro")
let CajaTraseraLogin=document.querySelector(".CajaTraseraLogin")
let CajaTraseraRegistro=document.querySelector(".CajaTraseraRegistro")


function AnchoPagina(){
    if(window.innerWidth>850){
        CajaTraseraLogin.style.display = "block";
        CajaTraseraRegistro.style.display = "block";
    }
    else{
        CajaTraseraRegistro.style.display = "block";
        CajaTraseraRegistro.style.opacity = "1";
        CajaTraseraLogin.style.display = "none"
        FormularioLogin.style.display = "block"
        FormularioRegistro.style.display = "none"
        CajaLoginRegistro.style.left = "0px"
    }
}
function InicioSesion(){
    if(window.innerWidth>850){
        FormularioRegistro.style.display = "none";
        CajaLoginRegistro.style.left = "10px";
        FormularioLogin.style.display ="block";
        CajaTraseraRegistro.style.opacity ="1";
        CajaTraseraLogin.style.opacity ="0";
    }
    else{
        FormularioRegistro.style.display = "none";
        CajaLoginRegistro.style.left = "0px";
        FormularioLogin.style.display ="block";
        CajaTraseraRegistro.style.display ="block";
        CajaTraseraLogin.style.display ="none";
    }
}
function Registro(){
    if(window.innerWidth>850){
        FormularioRegistro.style.display = "block";
        CajaLoginRegistro.style.left = "410px";
        FormularioLogin.style.display ="none";
        CajaTraseraRegistro.style.opacity ="0";
        CajaTraseraLogin.style.opacity ="1";
    }
    else{
        FormularioRegistro.style.display = "block";
        CajaLoginRegistro.style.left = "0px";
        FormularioLogin.style.display ="none";
        CajaTraseraRegistro.style.display ="none";
        CajaTraseraLogin.style.display ="block";
        CajaTraseraLogin.style.opacity ="1";
    }
    
}
document.getElementById("botonRegistrarse").addEventListener("click", Registro)
document.getElementById("botonInicioSesion").addEventListener("click", InicioSesion)
window.addEventListener("resize", AnchoPagina)
AnchoPagina()

FormularioRegistro.addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombreRegistro").value;
    const correo = document.getElementById("correoRegistro").value;
    const password = document.getElementById("contraseñaRegistro").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.correo === correo);

    if (existe) {
        alert("Este usuario ya existe");
        return;
    }

    usuarios.push({
        nombre,
        correo,
        password
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    formularioRegistro.reset();
});

FormularioLogin.addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value;
    const password = document.getElementById("contraseñaLogin").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (usuario) {
    alert("Bienvenido " + usuario.nombre);

    // opcional
    // window.location.href = "index.html";

    } else {
    // verificar si el correo existe
    const existeCorreo = usuarios.some(u => u.correo === correo);

    if (existeCorreo) {
        alert("Contraseña incorrecta");
    } else {
        alert("El usuario no está registrado");
    }
    }

    formularioLogin.reset();
});