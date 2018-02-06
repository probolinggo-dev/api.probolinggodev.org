const express = require('express');
const app = express();
const productRoutes = require('./API/routes/products');
const orderRoutes = require('./API/routes/orders');

/**
 * Initial server up
 */
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It Works NodeJS Server for Probolinggo Dev API'
//     });
// });

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;