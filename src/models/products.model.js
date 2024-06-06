const { Sequelize, DataTypes, Model, UUID } = require('sequelize');

const sequelize = new Sequelize('curso_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida con exito...')
    } catch (error) {
        console.log('No se pudo realizar la conexion a la base de datos...')
    }
}
testConnection();

class Producto extends Model { };

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
}, { sequelize, modelName: "Producto" });

module.exports = Producto;
