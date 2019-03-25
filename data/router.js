const express = require('express');

const routesProjects = require('./routesProjects.js');
const routesActions = require('./routesActions.js');

const router = express.Router();

router.use(express.json());


router.use('/projects', routesProjects);
router.use('/actions', routesActions);


module.exports = router;

