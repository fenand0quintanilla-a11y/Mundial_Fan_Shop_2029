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
