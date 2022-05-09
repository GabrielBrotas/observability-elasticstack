const apm = require('elastic-apm-node').start({
    serviceName: 'products-svc',
  
    // Use if APM Server requires a token
    secretToken: '',
  
    // Use if APM Server uses API keys for authentication
    apiKey: '',
  
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'http://apm:8200',
    environment: "development",
    active: true,
    verifyServerCert: false
})

const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize('postgresql://root:root@postgres:5432/products');

async function init() {
    try {
        await sequelize.authenticate();

        // create tables
        sequelize.query('CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255), price INTEGER)');

        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
init();

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World v1!');
})

function randomString() {
    const length = 5;

    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

app.get('/product-save', async (req, res) => {
    try {
        const product = await sequelize.query(`INSERT INTO products (name, price) VALUES ('${randomString()}', ${Math.floor(Math.random() * 100)}) RETURNING *`);

        return res.status(200).json({
            message: 'Product created successfully',
            data: product
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Error creating product',
            error: err.message ? err.message : err
        });
    }
})

app.get('/product-list', async (req, res) => {
    try {
        const products = await sequelize.query(`SELECT * FROM products`);

        return res.status(200).json({
            message: 'Products found successfully',
            data: products
        });
    } catch(err) {
        apm.captureError(err.message ? err.message : err)

        return res.status(400).json({
            message: 'Error finding products',
            error: err.message ? err.message : err
        });
    }
})

app.get('/product-error', async (req, res) => {
    try {
        const users = await sequelize.query("SELECT * FROM users");
        
        return res.status(200).json({
            message: 'users found successfully',
            data: users
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Error finding product',
            error: err.message ? err.message : err
        });
    }
})

app.get('/error', (req, res) => {
    try {
        throw new Error('Something went wrong');

    } catch(err) {
        apm.captureError(err.message)
        res.send(err.message);
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})