// Variable global para almacenar los productos añadidos
let carrito = [];

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

  // Actualizar clases activas en los enlaces de navegación
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
   2. FILTROS DEL CATÁLOGO (HTML ESTÁTICO)
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

// Botones de filtro principales en la sección de Productos
document.querySelectorAll('.filter-tabs button').forEach(boton => {
  boton.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const filtro = e.target.getAttribute('data-filtro');
    filtrarProductos(filtro);
  });
});

// Botones de Categorías Rápidas en la pantalla de Inicio
document.querySelectorAll('[data-filtro-rapido]').forEach(boton => {
  boton.addEventListener('click', (e) => {
    const filtro = e.currentTarget.getAttribute('data-filtro-rapido');
    
    // Ir a tienda
    irASeccion('productos');
    
    // Activar el botón correcto en los tabs de la tienda
    const tabCorrespondiente = document.querySelector(`.filter-tabs button[data-filtro="${filtro}"]`);
    if (tabCorrespondiente) {
      tabCorrespondiente.click();
    }
  });
});


/* ==========================================================================
   3. BUSCADOR EN TIEMPO REAL
   ========================================================================== */
const buscador = document.getElementById('buscador');
if (buscador) {
  buscador.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const tarjetas = document.querySelectorAll('.producto-item');

    if (query !== "") {
      irASeccion('productos');
      // Limpiar los tabs activos al buscar de forma general
      document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
      document.querySelector('.filter-tabs button[data-filtro="todos"]').classList.add('active');
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
   4. LÓGICA COMPLETA DEL CARRITO DE COMPRAS
   ========================================================================== */
function actualizarInterfazCarrito() {
  const contador = document.getElementById('contadorCarrito');
  const listaHtml = document.getElementById('listaCarrito');
  const totalHtml = document.getElementById('totalCarrito');

  // Actualizar burbuja del header
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
    const tarjeta = boton.closest('.card');
    
    const nombre = tarjeta.querySelector('.card-title').textContent;
    const precioTexto = tarjeta.querySelector('.card-text').textContent;
    const precio = parseFloat(precioTexto.replace('$', ''));
    const img = tarjeta.querySelector('img').getAttribute('src');

    const existe = carrito.find(item => item.id === id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, img, cantidad: 1 });
    }
    actualizarInterfazCarrito();
  }

  if (e.target.classList.contains('btn-eliminar')) {
    const id = e.target.getAttribute('data-id');
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfazCarrito();
  }
});


/* ==========================================================================
   5. FORMULARIO DE CONTACTO
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
