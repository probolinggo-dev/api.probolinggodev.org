const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        title: 'Informasi Seputar Probolinggo Dev',
        context: 'Lorem Ipsum Dolor Sit Amet Bros',
        message: 'Post Loaded'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        title: 'Informasi Baru Probolinggo Dev',
        context: 'Aku Belum Mandi Tak Tun Tuang',
        message: 'Post Sended'
    });
});

router.get('/:postId', (req, res, next) => {
    res.status(200).json({
        message: 'Post Detail',
        postId: req.params.postId
    });
});

router.delete('/:postId', (req, res, next) => {
    res.status(200).json({
        message: 'Post Dihapus',
        postId: req.params.postId
    });
});

module.exports = router;