const btnContacto = document.getElementById("btnContacto");
const modalContacto = document.getElementById("modalContacto");
const cerrar = document.getElementById("cerrarModal");

if(btnContacto){

    btnContacto.addEventListener("click", (e)=>{

        e.preventDefault();
        modalContacto.style.display = "flex";

    });

}

if(cerrar){

    cerrar.addEventListener("click", ()=>{

        modalContacto.style.display = "none";

    });

}

window.addEventListener("click",(e)=>{

    if(e.target === modalContacto){

        modalContacto.style.display = "none";

    }

});

const buscador = document.getElementById("buscador");

if(buscador){

    buscador.addEventListener("keyup", () => {

        const texto = buscador.value.toLowerCase();

        document.querySelectorAll(".card").forEach(producto => {

            const nombre =
            producto
            .querySelector("h3")
            .textContent
            .toLowerCase();

            producto.style.display =
            nombre.includes(texto)
            ? ""
            : "none";

        });

    });

}
const usuarioActivo = JSON.parse(
localStorage.getItem("usuarioActivo")
);

const cuentaNav =
document.getElementById("cuentaNav");

if(cuentaNav && usuarioActivo){

    cuentaNav.textContent =
    usuarioActivo.nombre;

    cuentaNav.href =
    "../HTML/micuenta.html";

}

let carrito = [];

const botones =
document.querySelectorAll(".card button");

const lista =
document.getElementById("lista");

const totalHTML =
document.getElementById("total");

const comprar =
document.getElementById("comprar");

const contador =
document.getElementById("contadorCarrito");

const mensaje =
document.createElement("div");

mensaje.classList.add("mensaje");

const carritoFloat =
document.querySelector(".carrito-float");

if(carritoFloat){

    document.body.appendChild(mensaje);

}
botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        const card =
        boton.parentElement;

        const nombre =
        card.querySelector("h3")
        .innerText;

        const precio = Number(

            card
            .querySelector(".price")
            .innerText
            .replace("$","")
            .replace(/\./g,"")

        );

        const existe =
        carrito.find(

            item =>
            item.nombre === nombre

        );

        if(existe){

            existe.cantidad++;

        }
        else{

            carrito.push({

                nombre,
                precio,
                cantidad:1

            });

        }

        actualizar();

    });

});
function actualizar(){

    if(!lista || !totalHTML)
    return;

    lista.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item=>{

        total +=
        item.precio *
        item.cantidad;

        cantidadTotal +=
        item.cantidad;

        lista.innerHTML += `

        <div class="item">

            <div>
                ${item.cantidad} × ${item.nombre}
            </div>

            <div>
                $${(
                item.precio *
                item.cantidad
                ).toLocaleString()}
            </div>

        </div>

        `;

    });

    totalHTML.innerText =
    "$" +
    total.toLocaleString();

    if(contador){

        contador.innerText =
        cantidadTotal;

    }

}
const modalCarrito =
document.getElementById(
"modalCarrito"
);

const abrirCarrito =
document.getElementById(
"abrirCarrito"
);

const cerrarCarrito =
document.getElementById(
"cerrarCarrito"
);

if(abrirCarrito){

    abrirCarrito.addEventListener(
    "click",
    ()=>{

        modalCarrito.style.display =
        "flex";

    }
    );

}

if(cerrarCarrito){

    cerrarCarrito.addEventListener(
    "click",
    ()=>{

        modalCarrito.style.display =
        "none";

    }
    );

}

window.addEventListener(
"click",
(e)=>{

    if(
    e.target === modalCarrito
    ){

        modalCarrito.style.display =
        "none";

    }

});
// ==========================
// FACTURA
// ==========================

let metodoSeleccionado = "";

const metodosPago =
document.querySelectorAll(".metodo-pago");

const modalFactura =
document.getElementById("modalFactura");

const contenidoFactura =
document.getElementById("contenidoFactura");

const cerrarFactura =
document.getElementById("cerrarFactura");

metodosPago.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        metodosPago.forEach((b)=>{
            b.classList.remove("activo");
        });

        boton.classList.add("activo");

        metodoSeleccionado =
        boton.textContent;

    });

});

if(cerrarFactura){

    cerrarFactura.addEventListener("click",()=>{

        modalFactura.style.display="none";

    });

}

// ==========================
// COMPRAR
// ==========================

if(comprar){

    comprar.addEventListener("click",()=>{

        if(carrito.length === 0){

            mensaje.innerHTML =
            "🛒 Tu carrito está vacío";

            mensaje.classList.add("mostrar");

            return;
        }

        if(metodoSeleccionado === ""){

            mensaje.innerHTML =
            "⚠️ Selecciona un método de pago";

            mensaje.classList.add("mostrar");

            return;
        }

        let filas = "";
        let total = 0;

        carrito.forEach(item=>{

            const subtotal =
            item.precio * item.cantidad;

            total += subtotal;

            filas += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal.toLocaleString()}</td>
            </tr>
            `;

        });

        contenidoFactura.innerHTML = `

        <p><strong>Fecha:</strong>
        ${new Date().toLocaleString()}
        </p>

        <p><strong>Método de pago:</strong>
        ${metodoSeleccionado}
        </p>

        <table class="factura-tabla">

            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>

            ${filas}

        </table>

        <div class="total-factura">

            Total:
            $${total.toLocaleString()}

        </div>

        `;

        if(modalFactura){

            modalFactura.style.display =
            "flex";

        }

    });

}