document.addEventListener("DOMContentLoaded", () => {

    let carrito = [];
    let filtroActual = "todos";
    let busquedaActual = "";
    
    const secciones = document.querySelectorAll(".pantalla");
    const enlaces = document.querySelectorAll("[data-seccion]");
    const menuPrincipal = document.getElementById("menuPrincipal");
    const listaProductos = document.getElementById("listaProductos");
    const buscador = document.getElementById("buscador");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const pestañasFiltro = document.querySelectorAll(".filter-tabs button, .category-card");

    const productos = [
        { id: 1, nombre: "Camiseta mundialista", desc: "Camiseta deportiva para apoyar a tu selección favorita.", precio: 29.99, img: "img/producto-1.jpg", categoria: "jersey" },
        { id: 2, nombre: "Balón edición 2029", desc: "Balón de colección inspirado en la temporada mundialista.", precio: 24.99, img: "img/producto-2.jpg", categoria: "balon" },
        { id: 3, nombre: "Gorra fan shop", desc: "Gorra cómoda para partidos y eventos deportivos.", precio: 14.99, img: "img/producto-3.jpg", categoria: "accesorio" },
        { id: 4, nombre: "Bufanda de aficionado", desc: "Accesorio clásico para apoyar en cada encuentro.", precio: 12.99, img: "img/producto-4.jpg", categoria: "accesorio" },
        { id: 5, nombre: "Taza mundialista", desc: "Taza temática para coleccionar o regalar.", precio: 8.99, img: "img/producto-5.jpg", categoria: "accesorio" },
        { id: 6, nombre: "Llavero oficial fan", desc: "Recuerdo pequeño y práctico para aficionados.", precio: 4.99, img: "img/producto-6.jpg", categoria: "accesorio" },
        { id: 7, nombre: "Bandera de selección", desc: "Bandera decorativa para reuniones y celebraciones.", precio: 10.99, img: "img/producto-7.jpg", categoria: "accesorio" },
        { id: 8, nombre: "Pulsera deportiva", desc: "Accesorio sencillo para llevar la pasión del fútbol.", precio: 3.99, img: "img/producto-8.jpg", categoria: "accesorio" },
        { id: 9, nombre: "Mochila deportiva", desc: "Mochila práctica para entrenos, viajes y escuela.", precio: 22.99, img: "img/producto-9.jpg", categoria: "accesorio" },
        { id: 10, nombre: "Termo deportivo", desc: "Termo para llevar bebidas a partidos y entrenamientos.", precio: 11.99, img: "img/producto-10.jpg", categoria: "accesorio" },
        { id: 11, nombre: "Sticker pack", desc: "Stickers para decorar cuadernos, laptops o botellas.", precio: 5.99, img: "img/producto-11.jpg", categoria: "accesorio" },
        { id: 12, nombre: "Combo fanático", desc: "Set con accesorios ideales para disfrutar los partidos.", precio: 39.99, img: "img/producto-12.jpg", categoria: "combo" }
    ];
    
    function mostrarSeccion(idSeccion) {
        const destino = document.getElementById(idSeccion);
        if (!destino) return;

        secciones.forEach(seccion => seccion.classList.remove("activa"));
        destino.classList.add("activa");

        document.querySelectorAll(".nav-link, .cart-button").forEach(enlace => {
            if (enlace.dataset.seccion) {
                enlace.classList.toggle("active", enlace.dataset.seccion === idSeccion);
            }
        });

        if (menuPrincipal && window.bootstrap) {
            const menu = bootstrap.Collapse.getOrCreateInstance(menuPrincipal, { toggle: false });
            menu.hide();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
 enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {
            evento.preventDefault();
            mostrarSeccion(enlace.dataset.seccion);
        });
    });
    
    function renderizarProductos() {
        if (!listaProductos) return;
        listaProductos.innerHTML = "";

        // Filtrar productos por categoría y por texto del buscador
        const productosFiltrados = productos.filter(producto => {
            const cumpleFiltro = filtroActual === "todos" || producto.categoria === filtroActual;
            const cumpleBusqueda = producto.nombre.toLowerCase().includes(busquedaActual) || 
                                   producto.desc.toLowerCase().includes(busquedaActual);
            return cumpleFiltro && cumpleBusqueda;
        });

        if (productosFiltrados.length === 0) {
            listaProductos.innerHTML = `<p class="text-center col-12 text-muted my-5">No se encontraron productos que coincidan con tu búsqueda.</p>`;
            return;
        }

        productosFiltrados.forEach(producto => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "col-md-4 col-lg-3";
            tarjeta.innerHTML = `
                <section class="card h-100 product-card">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                    <section class="card-body d-flex flex-column">
                        <h5>${producto.nombre}</h5>
                        <p>${producto.desc}</p>
                        <p class="fw-bold text-success mt-auto">$${producto.precio.toFixed(2)}</p>
                        <button class="btn btn-primary w-100 btn-agregar-carrito" data-id="${producto.id}">
                            Agregar al carrito
                        </button>
                    </section>
                </section>
            `;
            listaProductos.appendChild(tarjeta);
        });
    }

    // Manejo de eventos para filtros de categorías
    pestañasFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            filtroActual = boton.dataset.filtro;

            // Actualizar clase activa visualmente en los botones de la sección productos
            document.querySelectorAll(".filter-tabs button").forEach(b => {
                b.classList.toggle("active", b.dataset.filtro === filtroActual);
            });

            // Si se hace clic desde el inicio, redirigir automáticamente a la sección de productos
            if (boton.classList.contains("category-card")) {
                mostrarSeccion("productos");
            }

            renderizarProductos();
        });
    });

    // Manejo del buscador superior
    if (buscador) {
        buscador.addEventListener("input", evento => {
            busquedaActual = evento.target.value.toLowerCase().trim();
            // Redirige al catálogo automáticamente si empieza a buscar estando en otra sección
            const seccionActiva = document.querySelector(".pantalla.activa");
            if (seccionActiva && seccionActiva.id !== "productos" && seccionActiva.id !== "inicio") {
                mostrarSeccion("productos");
            }
            renderizarProductos();
        });
    }

    // --- LÓGICA DEL CARRITO DE COMPRAS ---
    function actualizarInterfazCarrito() {
        // 1. Actualizar el badge numérico superior
        if (contadorCarrito) {
            contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        }

        // 2. Renderizar lista interna del carrito
        if (!listaCarrito || !totalCarrito) return;
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = `<p class="text-center text-muted py-4">Tu carrito está vacío.</p>`;
            totalCarrito.textContent = "$0.00";
            return;
        }

        let sumaTotal = 0;

        carrito.forEach(item => {
            const costeItem = item.precio * item.cantidad;
            sumaTotal += costeItem;

            const fila = document.createElement("section");
            fila.className = "d-flex justify-content-between align-items-center border-bottom py-3";
            fila.innerHTML = `
                <div>
                    <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                    <small class="text-muted">$${item.precio.toFixed(2)} x ${item.cantidad}</small>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="fw-bold text-success">$${costeItem.toFixed(2)}</span>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar-item" data-id="${item.id}">&times;</button>
                </div>
            `;
            listaCarrito.appendChild(fila);
        });

        totalCarrito.textContent = `$${sumaTotal.toFixed(2)}`;
    }

    // Escuchador global de clics para capturar botones dinámicos (Agregar/Eliminar del carrito)
    document.addEventListener("click", evento => {
        // Evento: Agregar Producto
        if (evento.target.classList.contains("btn-agregar-carrito")) {
            const idProducto = parseInt(evento.target.dataset.id);
            const productoSeleccionado = productos.find(p => p.id === idProducto);

            if (productoSeleccionado) {
                const itemExistente = carrito.find(item => item.id === idProducto);
                if (itemExistente) {
                    itemExistente.cantidad++;
                } else {
                    carrito.push({ ...productoSeleccionado, cantidad: 1 });
                }

                // Efecto visual temporal en el botón
                const botonOriginal = evento.target;
                botonOriginal.textContent = "¡Agregado!";
                botonOriginal.classList.replace("btn-primary", "btn-success");

                setTimeout(() => {
                    botonOriginal.textContent = "Agregar al carrito";
                    botonOriginal.classList.replace("btn-success", "btn-primary");
                }, 1200);

                actualizarInterfazCarrito();
            }
        }

        // Evento: Eliminar Producto del Carrito
        if (evento.target.classList.contains("btn-eliminar-item")) {
            const idProducto = parseInt(evento.target.dataset.id);
            carrito = carrito.filter(item => item.id !== idProducto);
            actualizarInterfazCarrito();
        }
    });

    // --- FORMULARIO DE CONTACTO ---
    const formulario = document.getElementById("formContacto");
    const mensajeFormulario = document.getElementById("mensajeFormulario");

    if (formulario) {
        formulario.addEventListener("submit", evento => {
            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (nombre === "" || correo === "" || mensaje === "") {
                alert("Por favor, completa todos los campos antes de enviar.");
                return;
            }

            if (mensajeFormulario) {
                mensajeFormulario.innerHTML = `
                    <section class="alert alert-success mb-0 animate__animated animate__fadeIn">
                        ¡Gracias ${nombre}! Hemos recibido tu consulta exitosamente. Te responderemos pronto.
                    </section>
                `;
            }
            formulario.reset();
        });
    }

    // --- INICIALIZACIÓN ---
    renderizarProductos();
    actualizarInterfazCarrito();
});
