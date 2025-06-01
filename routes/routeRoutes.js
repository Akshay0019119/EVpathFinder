const express = require('express');
const { getRouteWithChargers } = require('../controllers/routeController');

const router = express.Router();

// Define GET route at /routes (not /routes/routes)
router.get('/routes', getRouteWithChargers);

module.exports = router;
