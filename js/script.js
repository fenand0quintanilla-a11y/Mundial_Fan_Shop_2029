// Variable global para almacenar los productos añadidos
let carrito = [];

const productos = [
  {
    id: "p1",
    nombre: "Camiseta El Salvador",
    categoria: "jersey",
    descripcion: "Camiseta principal para apoyar a la selección.",
    precio: 29.99,
    img: "img/camiseta-el-salvador.png"
  },
  {
    id: "p2",
    nombre: "Balón El Salvador",
    categoria: "balon",
    descripcion: "Balón con diseño especial para fanáticos.",
    precio: 24.99,
    img: "img/balon-el-salvador (1).png"
  },
  {
    id: "p3",
    nombre: "Bufanda El Salvador",
    categoria: "accesorio",
    descripcion: "Bufanda para celebrar cada partido.",
    precio: 12.99,
    img: "img/bufanda-el-salvador.png"
  },
  {
    id: "p4",
    nombre: "Gorra El Salvador",
    categoria: "accesorio",
    descripcion: "Gorra deportiva para uso diario y eventos.",
    precio: 14.99,
    img: "img/gorra-el-salvador.png"
  },
  {
    id: "p5",
    nombre: "Llavero oficial",
    categoria: "accesorio",
    descripcion: "Recuerdo pequeño para fanáticos del fútbol.",
    precio: 4.99,
    img: "img/llavero-oficial.png"
  },
  {
    id: "p6",
    nombre: "Álbum de colección",
    categoria: "accesorio",
    descripcion: "Álbum para completar y guardar recuerdos.",
    precio: 9.99,
    img: "img/album-coleccion.png"
  },
  {
    id: "p7",
    nombre: "Figuritas pack",
    categoria: "accesorio",
    descripcion: "Paquete de figuritas para colección.",
    precio: 5.99,
    img: "img/figuritas-pack.png"
  },
  {
    id: "p8",
    nombre: "Set de accesorios",
    categoria: "combo",
    descripcion: "Combo de accesorios para vivir la temporada mundialista.",
    precio: 19.99,
    img: "img/set-accesorios.png"
  },
  {
    id: "p9",
    nombre: "Poster oficial",
    categoria: "accesorio",
    descripcion: "Poster decorativo para fanáticos y coleccionistas.",
    precio: 7.99,
    img: "img/poster-oficial.png"
  },
  {
    id: "p10",
    nombre: "Poster edición especial",
    categoria: "accesorio",
    descripcion: "Poster alternativo de colección.",
    precio: 8.99,
    img: "img/poster-oficial (1).png"
  },
  {
    id: "p11",
    nombre: "Kit celebración",
    categoria: "combo",
    descripcion: "Set preparado para disfrutar los partidos.",
    precio: 27.99,
    img: "img/set-accesorios.png"
  },
  {
    id: "p12",
    nombre: "Combo fanático",
    categoria: "combo",
    descripcion: "Camiseta, balón y accesorios para verdaderos fanáticos.",
    precio: 39.99,
    img: "img/hero-el-salvador.png"
  }
];

/* ========================================================================== 
   1. NAVEGACIÓN SINGLE PAGE APPLICATION (SPA)
   ========================================================================== */
function irASeccion(seccionId) {
  document.querySelectorAll('.pantalla').forEach(pantalla => {
    pantalla.classList.remove('activa');
  });

  const pantallaDestino = document.getElementById(seccionId);
  if (pantallaDestino) {
    pantallaDestino.classList.add('activa');
  }

  document.querySelectorAll('.navbar-nav .nav-link').forEach(enlace => {
    if (enlace.getAttribute('data-seccion') === seccionId) {
      enlace.classList.add('active');
    } else {
      enlace.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Escuchar clicks globales para enlaces con data-seccion
document.addEventListener('click', (e) => {
  const objetivo = e.target.closest('[data-seccion]');
  if (objetivo) {
    e.preventDefault();
    const seccionTarget = objetivo.getAttribute('data-seccion');
    irASeccion(seccionTarget);
  }
});

/* ========================================================================== 
   2. CARGAR PRODUCTOS CON IMÁGENES REALES
   ========================================================================== */
function renderizarProductos(lista = productos) {
  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  lista.forEach(producto => {
    const tarjeta = `
      <article class="col-md-4 col-lg-3 producto-item" data-categoria="${producto.categoria}">
        <section class="card h-100 product-card">
          <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
          <section class="card-body d-flex flex-column">
            <span class="product-tag">${producto.categoria}</span>
            <h5 class="card-title">${producto.nombre}</h5>
            <p>${producto.descripcion}</p>
            <p class="card-text fw-bold text-success mt-auto">$${producto.precio.toFixed(2)}</p>
            <button class="btn btn-primary w-100 btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
          </section>
        </section>
      </article>
    `;

    contenedor.insertAdjacentHTML('beforeend', tarjeta);
  });
}

renderizarProductos();

/* ========================================================================== 
   3. FILTROS DEL CATÁLOGO
   ========================================================================== */
function filtrarProductos(categoriaFiltro) {
  const tarjetas = document.querySelectorAll('.producto-item');

  tarjetas.forEach(tarjeta => {
    const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
    if (categoriaFiltro === 'todos' || categoriaTarjeta === categoriaFiltro) {
      tarjeta.style.setProperty('display', 'block', 'important');
    } else {
      tarjeta.style.setProperty('display', 'none', 'important');
    }
  });
}

// Botones de filtro principales y tarjetas rápidas
document.querySelectorAll('[data-filtro]').forEach(boton => {
  boton.addEventListener('click', (e) => {
    const filtro = e.currentTarget.getAttribute('data-filtro');

    if (e.currentTarget.closest('.filter-tabs')) {
      document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    } else {
      irASeccion('productos');
      const tabCorrespondiente = document.querySelector(`.filter-tabs button[data-filtro="${filtro}"]`);
      if (tabCorrespondiente) {
        document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
        tabCorrespondiente.classList.add('active');
      }
    }

    filtrarProductos(filtro);
  });
});

/* ========================================================================== 
   4. BUSCADOR EN TIEMPO REAL
   ========================================================================== */
const buscador = document.getElementById('buscador');
if (buscador) {
  buscador.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const tarjetas = document.querySelectorAll('.producto-item');

    if (query !== "") {
      irASeccion('productos');
      document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
      const botonTodos = document.querySelector('.filter-tabs button[data-filtro="todos"]');
      if (botonTodos) botonTodos.classList.add('active');
    }

    tarjetas.forEach(tarjeta => {
      const nombreProducto = tarjeta.querySelector('.card-title').textContent.toLowerCase();
      if (nombreProducto.includes(query)) {
        tarjeta.style.setProperty('display', 'block', 'important');
      } else {
        tarjeta.style.setProperty('display', 'none', 'important');
      }
    });
  });
}

/* ========================================================================== 
   5. LÓGICA COMPLETA DEL CARRITO DE COMPRAS
   ========================================================================== */
function actualizarInterfazCarrito() {
  const contador = document.getElementById('contadorCarrito');
  const listaHtml = document.getElementById('listaCarrito');
  const totalHtml = document.getElementById('totalCarrito');

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  if (contador) contador.textContent = totalItems;

  if (!listaHtml || !totalHtml) return;

  listaHtml.innerHTML = '';

  if (carrito.length === 0) {
    listaHtml.innerHTML = `<p class="text-muted text-center py-4">Tu carrito está completamente vacío.</p>`;
    totalHtml.textContent = "$0.00";
    return;
  }

  let subtotal = 0;

  carrito.forEach(item => {
    const costeItem = item.precio * item.cantidad;
    subtotal += costeItem;

    const filaHtml = `
      <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom bg-white p-2 rounded shadow-sm">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.img}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;" alt="${item.nombre}">
          <div>
            <h6 class="mb-0 fw-bold" style="font-size: 0.95rem;">${item.nombre}</h6>
            <small class="text-muted">$${item.precio.toFixed(2)} x ${item.cantidad}</small>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="fw-bold text-dark">$${costeItem.toFixed(2)}</span>
          <button class="btn btn-sm btn-danger btn-eliminar py-0 px-2" data-id="${item.id}">&times;</button>
        </div>
      </div>
    `;
    listaHtml.insertAdjacentHTML('beforeend', filaHtml);
  });

  totalHtml.textContent = `$${subtotal.toFixed(2)}`;
}

// Capturar el evento "Agregar al carrito" y "Eliminar"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-agregar')) {
    const boton = e.target;
    const id = boton.getAttribute('data-id');
    const producto = productos.find(item => item.id === id);
    if (!producto) return;

    const existe = carrito.find(item => item.id === id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarInterfazCarrito();
    boton.textContent = "Agregado";
    setTimeout(() => boton.textContent = "Agregar al carrito", 1000);
  }

  if (e.target.classList.contains('btn-eliminar')) {
    const id = e.target.getAttribute('data-id');
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfazCarrito();
  }
});

actualizarInterfazCarrito();

/* ========================================================================== 
   6. FORMULARIO DE CONTACTO
   ========================================================================== */
const formContacto = document.getElementById('formContacto');
if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const mensajeFormulario = document.getElementById('mensajeFormulario');

    if (mensajeFormulario) {
      mensajeFormulario.innerHTML = `
        <div class="alert alert-success" role="alert">
          ¡Gracias por escribirnos, <strong>${nombre}</strong>! Tu consulta ha sido registrada con éxito.
        </div>
      `;
      formContacto.reset();
    }
  });
}
