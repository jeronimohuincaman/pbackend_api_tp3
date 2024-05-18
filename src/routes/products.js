const express = require('express');
const router = express.Router();

const productos = require('../models/products.model');

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

router.get('/promedio', (req, res) => {
    const { params, query } = req;
    let precios_totales = 0;
    let resultado_promedio = 0;
    let filteredProductos = [...productos];
    let respuesta = {};

    if (query.categoria) {
        filteredProductos = filteredProductos.filter(p => p.categoria.toLowerCase().includes(query.categoria.toLowerCase()));
        if (filteredProductos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos con esa categoria' });
        }
        respuesta['categoria'] = filteredProductos[0].categoria;
    }

    filteredProductos.forEach((p, i) => {
        precios_totales += p.precio;
    });

    resultado_promedio = parseFloat((precios_totales / productos.length).toFixed(2));

    respuesta[`promedio_precios`] = resultado_promedio;

    return res.status(200).json(respuesta)
});

router.get('/top', (req, res) => {
    const { query } = req;
    let filteredProductos = [...productos];
    let respuesta = {};

    if (query.sort === 'precioAsc') {
        filteredProductos = filteredProductos.sort((a, b) => a.precio - b.precio);
        respuesta[`ordenamiento`] = 'ascendente';
    } else if (query.sort === 'precioDesc') {
        filteredProductos = filteredProductos.sort((a, b) => b.precio - a.precio);
        respuesta[`ordenamiento`] = 'descendente';
    } else {
        return res.status(404).json({ message: 'No se conoce ese tipo de ordenamiento' });
    };

    if (query.cantidad > 0) {
        filteredProductos = filteredProductos.slice(0, query.cantidad);
        respuesta['limitacion'] = query.cantidad;
    } else {
        return res.status(404).json({ message: 'Debe limitar por un numero mayor a cero' });
    };

    respuesta['result'] = filteredProductos;

    return res.status(200).json(respuesta);
});

router.get('/:categoria', (req, res) => {
    const { params } = req;
    const categoriaBuscada = params.categoria;
    let filteredProducto = [...productos];
    let respuesta = {};
    let contador = 0;

    filteredProducto = productos.filter(p => p.categoria.toLowerCase().includes(categoriaBuscada.toLowerCase()));

    if (filteredProducto.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos con esa categoria' })
    } else {
        filteredProducto.forEach((p, i) => {
            contador++;
        });
        respuesta[`categoria`] = params.categoria;
        respuesta[`cantidad_productos`] = contador;
    }

    return res.status(200).json(respuesta);
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