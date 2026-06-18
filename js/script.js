// ==========================================
// MUNDIAL FAN SHOP 2029 - JAVASCRIPT BASE
// Responsable sugerido: Danny
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const secciones = document.querySelectorAll(".pantalla");
    const enlaces = document.querySelectorAll("[data-seccion]");
    const menuPrincipal = document.getElementById("menuPrincipal");

    function mostrarSeccion(idSeccion){
        const destino = document.getElementById(idSeccion);

        if(!destino){
            return;
        }

        secciones.forEach(seccion => seccion.classList.remove("activa"));
        destino.classList.add("activa");

        document.querySelectorAll(".nav-link").forEach(enlace => {
            enlace.classList.toggle("active", enlace.dataset.seccion === idSeccion);
        });

        if(menuPrincipal && window.bootstrap){
            const menu = bootstrap.Collapse.getOrCreateInstance(menuPrincipal, { toggle:false });
            menu.hide();
        }

        window.scrollTo({ top:0, behavior:"smooth" });
    }

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {
            evento.preventDefault();
            mostrarSeccion(enlace.dataset.seccion);
        });
    });

    const productos = [
        ["Camiseta mundialista", "Camiseta deportiva para apoyar a tu selección favorita.", "$29.99", "img/producto-1.jpg"],
        ["Balón edición 2029", "Balón de colección inspirado en la temporada mundialista.", "$24.99", "img/producto-2.jpg"],
        ["Gorra fan shop", "Gorra cómoda para partidos y eventos deportivos.", "$14.99", "img/producto-3.jpg"],
        ["Bufanda de aficionado", "Accesorio clásico para apoyar en cada encuentro.", "$12.99", "img/producto-4.jpg"],
        ["Taza mundialista", "Taza temática para coleccionar o regalar.", "$8.99", "img/producto-5.jpg"],
        ["Llavero oficial fan", "Recuerdo pequeño y práctico para aficionados.", "$4.99", "img/producto-6.jpg"],
        ["Bandera de selección", "Bandera decorativa para reuniones y celebraciones.", "$10.99", "img/producto-7.jpg"],
        ["Pulsera deportiva", "Accesorio sencillo para llevar la pasión del fútbol.", "$3.99", "img/producto-8.jpg"],
        ["Mochila deportiva", "Mochila práctica para entrenos, viajes y escuela.", "$22.99", "img/producto-9.jpg"],
        ["Termo deportivo", "Termo para llevar bebidas a partidos y entrenamientos.", "$11.99", "img/producto-10.jpg"],
        ["Sticker pack", "Stickers para decorar cuadernos, laptops o botellas.", "$5.99", "img/producto-11.jpg"],
        ["Combo fanático", "Set con accesorios ideales para disfrutar los partidos.", "$39.99", "img/producto-12.jpg"]
    ];

    const listaProductos = document.getElementById("listaProductos");

    if(listaProductos){
        productos.forEach(producto => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "col-md-4 col-lg-3";
            tarjeta.innerHTML = `
                <section class="card h-100 product-card">
                    <img src="${producto[3]}" class="card-img-top" alt="${producto[0]}">
                    <section class="card-body d-flex flex-column">
                        <h5>${producto[0]}</h5>
                        <p>${producto[1]}</p>
                        <p class="fw-bold text-success mt-auto">${producto[2]}</p>
                        <button class="btn btn-primary w-100 btn-carrito">Agregar al carrito</button>
                    </section>
                </section>
            `;
            listaProductos.appendChild(tarjeta);
        });
    }

    document.addEventListener("click", evento => {
        if(evento.target.classList.contains("btn-carrito")){
            evento.target.textContent = "Agregado";
            evento.target.classList.remove("btn-primary");
            evento.target.classList.add("btn-success");
        }
    });

    const formulario = document.getElementById("formContacto");
    const mensajeFormulario = document.getElementById("mensajeFormulario");

    if(formulario){
        formulario.addEventListener("submit", evento => {
            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if(nombre === "" || correo === "" || mensaje === ""){
                alert("Por favor, completa todos los campos antes de enviar.");
                return;
            }

            mensajeFormulario.innerHTML = `<section class="alert alert-success mb-0">Gracias ${nombre}. Hemos recibido tu consulta.</section>`;
            formulario.reset();
        });
    }
});
