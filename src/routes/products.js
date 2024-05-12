const express = require('express');
const router = express.Router();

const productos = require('../models/products.model')

router.get('/', (req, res) => {
    let productosFiltrados = [...productos];

    const { query } = req;

    if (query.precioMinimo) {
        productosFiltrados = productosFiltrados.filter(p => p.precio >= parseFloat(query.precioMinimo));
    }

    if (query.precioMaximo) {
        productosFiltrados = productosFiltrados.filter(p => p.precio <= parseFloat(query.precioMaximo));
    }

    if (query.nombre) {
        productosFiltrados = productosFiltrados.filter(p => p.nombre.toLowerCase().includes(query.nombre.toLowerCase()));
    }

    if (query.categoria) {
        productosFiltrados = productosFiltrados.filter(p => p.categoria.toLowerCase().includes(query.categoria.toLowerCase()));
    }

    return res.status(200).json(productosFiltrados);
});

router.get('/:categoria', (req, res) => {
    const { params } = req;
    const categoriaBuscada = params.categoria;
    let productosPorCategoria = {};

    productos.forEach(p => {
        // Verifica si el producto pertenece a la categoría buscada
        if (p.categoria === categoriaBuscada) {
            // Si la categoría ya existe en el objeto, incrementa su contador
            if (categoriaBuscada in productosPorCategoria) {
                productosPorCategoria[categoriaBuscada]++;
            } else {
                // Si la categoría no existe, inicializa su contador en 1
                productosPorCategoria[categoriaBuscada] = 1;
            }
        }
    });

    return res.status(200).json(productosPorCategoria);
});

router.post('/codificar', (req, res) => {
    const { body } = req;
    let productosFiltrados = [];

    // Verifica si req.body es undefined
    if (Object.keys(body).length === 0) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
    };

    let existeProducto = productos.find((p) => p.id === body.idproducto);
    if (!existeProducto) {
        return res.status(404).json({ error: 'No se encontró el producto!' });
    } else {
        productosFiltrados = productos.map((p, i) => {
            if (!p.nombre.includes(body.sufijo)) {
                if (p.id === body.idproducto) {
                    p.nombre = `${body.sufijo}-${p.nombre}`;
                }
            }
            return p;
        });
        return res.status(201).json(productosFiltrados)
    };



});

router.post('/', (req, res) => {
    const { body } = req;

    // Verifica si req.body es undefined
    if (!body) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
    }

    nuevoProducto = { id: productos.length + 1, nombre: body.nombre, precio: body.precio, categoria: body.categoria };
    productos.push(nuevoProducto);
    return res.status(201).json(nuevoProducto);
})

module.exports = router;