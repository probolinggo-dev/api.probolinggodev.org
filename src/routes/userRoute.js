const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router
  .post('/', async (req, res) => {
    try {
      const data = await userController.create(req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  })

module.exports = router;
