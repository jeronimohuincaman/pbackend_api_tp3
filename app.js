const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const usersRoute = require('./src/routes/users');
const productsRoute = require('./src/routes/products');

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
});

app.use('/user', usersRoute);
app.use('/products', productsRoute);



app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});

