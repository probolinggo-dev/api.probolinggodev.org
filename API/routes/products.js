const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Router Work with GET Method'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Router Work with POST Method'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Kamu menemukan spesial ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Kamu Melewatkan ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Perbarui Produk!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Hapus Produk!'
    });
});

module.exports = router;