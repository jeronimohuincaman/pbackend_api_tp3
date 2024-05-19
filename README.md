# Trabajo practico N° 3 - Api con NODE JS
En este proyecto se realizo un api de productos siguiendo las consignas brindadas por el profesor.

## Tabla de contenidos
1. [Instalacion y uso](#instalacion-y-uso)
2. [ABM base](#abm-base)
3. [Agrupación y conteo](#Agrupación-y-conteo)
4. [Manipulación de strings](#Manipulación-de-strings)
5. [Cálculo en colecciones](#Cálculo-en-colecciones)
6. [Ordenación y limitacion](#Ordenación-y-limitacion)

## Instalacion y uso
Para instalar y configurar este proyecto, sigue estos pasos:
```bash
# Clonar el repositorio
git clone https://github.com/jeronimohuincaman/pbackend_api_tp3.git

# Navegar al directorio del proyecto
cd pbackend_api_tp3

# Inicializa el servidor local
npm start
```

## ABM base
### Obtener todos los productos
```http
GET localhost:3001/products
```
```http
GET localhost:3001/products?nombre=a&categoria=Her
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | Nombre del producto a buscar |
| `categoria` | `string` | Nombre de la categoria del producto a buscar |
| `precioMinimo` | `number` | Precio minimo de busqueda |
| `precioMaximo` | `number` | Precio maximo de busqueda |

### Crear nuevos productos
```http
POST localhost:3001/products
```
| Parameter | Type | Description |
| :-------- | :---- | :----------- |
| `nombre` | `string` | Nombre del producto |
| `precio` | `number` | Precio del producto |
| `categoria` | `string` | Categoria del producto |

###  Agrupación y conteo
```http
GET localhost:3001/products/herramientas
```

### Manipulacion de strings
```http
POST localhost:3001/products/codificar
```
#### Enviar json
| Parameter | Type | Description |
| :-------- | :---- | :----------- |
| `idproducto` | `number` | Identificador del producto |
| `sufijo` | `string` | Sufijo del producto |

### Calculo de colecciones
```http
GET localhost:3001/products/promedio
```
```http
GET localhost:3001/products/promedio?categoria=her
```
| Parameter | Type | Description |
| :-------- | :---- | :----------- |
| `categoria` | `string` | Nombre de categoria |

### Ordenacion y limitacion
```http
GET localhost:3001/products/top
```
```http
GET localhost:3001/products/top?cantidad=2&sort=precioDesc
```
| Parameter | Type | Description |
| :-------- | :---- | :----------- |
| `cantidad` | `number` | Cantidad de items a recibir |
| `sort` | `string` | Se puede ordernar de forma ascendente `precioAsc` o de forma descendente `precioDesc` |

## Author
- [ Jeronimo ](https://github.com/jeronimohuincaman)
