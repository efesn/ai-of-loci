const express = require('express');
const router = express.Router();

// Import the controller
const lociController = require('../controllers/lociControllers')

// Define routes
router.post('/loci', lociController.generateLoci); // Update route to /loci

// Export the router
module.exports = router;
