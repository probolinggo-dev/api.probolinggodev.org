const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order kita ambil.'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order kita buat.'
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Detail',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Dihapus',
        orderId: req.params.orderId
    });
});

module.exports = router;