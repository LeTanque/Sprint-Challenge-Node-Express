const express = require('express');

const ActionModel = require('./helpers/actionModel.js');
// const mappers = require('./helpers/mappers.js');
const ProjectModel = require('./helpers/projectModel.js');

const routesActions = express.Router();



// Get all actions
routesActions.get('/', async (req, res) => {    
    try {
        const action = await ActionModel.get();
        if (!action) {
            res.status(400).json( {message: "No action found by that id."} );
        }
        res.status(200).json(action);
    } 
    catch (error) {
        res.status(500).json({ error: "The action could not be retrieved." });
    }
});


// Get an action. Requires ID param. 
routesActions.get('/:id', async (req, res) => {
    
    try {
        const action = await ActionModel.get(req.params.id);
        if (!action) {
            res.status(400).json( {message: "No action found by that id."} );
        }
        res.status(200).json(action);
    } 
    catch (error) {
        res.status(500).json({ error: "The action could not be retrieved." });
    }
});


// Insert action. req.body.project_id required. req.body.description required. req.body.notes required.
routesActions.post('/', async (req, res) => {

    if (!req.body.project_id) {
        return res.status(400).json({ message: "Please include a project id." });
    }
    if (!req.body.description) {
        return res.status(400).json({ message: "Please include a description. Maximum 128 characters long." });
    }
    if (req.body.description.length > 128) {
        return res.status(400).json({ message: "Maximum description is 128 characters long. Please edit and retry." });
    }

    try {
        const action = await ActionModel.insert(req.body);
        res.status(200).json({ 
            message:"Success adding action!", 
            addedAction: action 
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error adding action" });
    }
});


// Delete action. ID parameter required.
routesActions.delete('/:id', async (req, res) => {
    
    const checkActionExists = await ActionModel.get(req.params.id);
    if (!checkActionExists) {
        return res.status(404).json({ message: "The action with ID does not exist. Cannot delete." });
    }

    try {
        const actionDelete = await ActionModel.remove(req.params.id);
        if (actionDelete > 1) {
            res.status(200).json({ 
                message: `${actionDelete} actions have been successfully deleted`, 
                deletedAction: checkActionExists 
            })
        } else {
            res.status(200).json({ 
                message: `${actionDelete} action has been successfully deleted`, 
                deletedAction: checkActionExists 
            })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting action."})
    }
});


// Update action. ID parameter required. req.body.project_id, req.body.description, req.body.notes all required. 
routesActions.put('/:id', async (req, res) => {

    if (!req.body.project_id || !req.body.description || !req.params.id) {
        return res.status(404).json({ message: "Update requires a project id, description, and action ID parameter." });
    }

    const checkProjectIDExists = await ProjectModel.get(req.body.project_id);
    if (!checkProjectIDExists) {
        return res.status(404).json({ message: "Project ID doesn't exist." })
    }

    const checkActionExists = await ActionModel.get(req.params.id);
    if (!checkActionExists) {
        return res.status(404).json({ message: "The action with ID does not exist. Cannot update." });
    }

    try {
        const updateAction = await ActionModel.update(req.params.id, req.body)
        res.status(200).json({ 
            message: "Success!", 
            updatedAction:updateAction, 
            previousAction: checkActionExists 
        })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong updating action."})
    }
})


module.exports = routesActions;

