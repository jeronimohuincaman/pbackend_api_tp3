const { Sequelize, DataTypes, Model, UUID } = require('sequelize');

const sequelize = new Sequelize('curso_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class Producto extends Model {};

Producto.init({
    idproducto: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
    }
}, {sequelize, modelName: "Producto"});

module.exports = Producto;


// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexion establecida correctamente')
//     } catch (error) {
//         console.log('No se pudo conectar...', error)
//     }
// }

// testConnection();

// const productos = [
//     {
//         id: 1,
//         nombre: "Silla de Oficina",
//         precio: 120.00,
//         categoria: "Muebles"
//     },
//     {
//         id: 2,
//         nombre: "Escritorio Ergonómico",
//         precio: 250.50,
//         categoria: "Muebles"
//     },
//     {
//         id: 3,
//         nombre: "Estantería de Madera",
//         precio: 80.75,
//         categoria: "Muebles"
//     },
//     {
//         id: 4,
//         nombre: "Computadora de Escritorio",
//         precio: 750.99,
//         categoria: "Computación"
//     },
//     {
//         id: 5,
//         nombre: "Teclado Mecánico",
//         precio: 95.00,
//         categoria: "Computación"
//     },
//     {
//         id: 6,
//         nombre: "Mouse Inalámbrico",
//         precio: 40.99,
//         categoria: "Computación"
//     },
//     {
//         id: 7,
//         nombre: "Martillo",
//         precio: 25.00,
//         categoria: "Herramientas"
//     },
//     {
//         id: 8,
//         nombre: "Taladro Eléctrico",
//         precio: 120.50,
//         categoria: "Herramientas"
//     },
//     {
//         id: 9,
//         nombre: "Caja de Herramientas",
//         precio: 60.75,
//         categoria: "Herramientas"
//     },
//     {
//         id: 10,
//         nombre: "Sierra Circular",
//         precio: 150.00,
//         categoria: "Herramientas"
//     }
// ];

// module.exports = Producto;
