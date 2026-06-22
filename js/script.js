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
