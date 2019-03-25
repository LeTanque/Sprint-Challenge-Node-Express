const express = require('express');

const ProjectModel = require('./helpers/projectModel.js');

const routesProjects = express.Router();




// Get all projects
routesProjects.get('/', async (req, res) => {

    try {
        const project = await ProjectModel.get();
        res.status(200).json({ 
            message: "Success!", 
            projects: project
        });
    } 
    catch (error) {
        res.status(500).json({ error: "The projects could not be retrieved." });
    }
});


// Get a project
routesProjects.get('/:id', async (req, res) => {

    try {
        const project = await ProjectModel.get(req.params.id);
        if (!project) {
            res.status(404).json({ message:"Project not found."})
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error: "The project could not be retrieved." });
    }
});


// Get project actions
routesProjects.get('/:id/actions', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Please include project id"})
    }

    try {
        const project = await ProjectModel.getProjectActions(req.params.id);
        if (project.length === 0) {
            return res.status(404).json({ message:"Project not found." })
        }
        res.status(200).json(project);
    } 
    catch (error) {
        res.status(500).json({ error: "The project actions could not be retrieved." });
    }
});


// Add project. Name and description required
routesProjects.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: "Please include name." });
    }
    if (!req.body.description) {
        return res.status(400).json({ message: "Please include description." });
    }

    try {
        const projectCreate = await ProjectModel.insert(req.body);
        res.status(201).json({ 
            message:"Successfully added project", 
            projectDetails: projectCreate 
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error adding project" });
    }

});


// Delete project. Requires id parameter. utlizes new projectmodel action. getProjectById doesn't join the project with actions; only gets the project
routesProjects.delete('/:id', async (req, res) => {
    
    const checkProjectExists = await ProjectModel.getProjectById(req.params.id);
    if (!checkProjectExists) {
        return res.status(404).json({ message: "The project with ID does not exist. Cannot delete." });
    }

    try {
        const projectDelete = await ProjectModel.remove(req.params.id);
        if (projectDelete > 1) {
            res.status(200).json({ 
                message: `${projectDelete} projects have been deleted`, 
                deletedProject: checkProjectExists 
            })
        } else {
            res.status(200).json({ 
                message: `${projectDelete} project has been deleted`, 
                deletedProject: checkProjectExists 
            })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting project!"})
    }
});


// update project name and/or description. Requires ID. Requires req.body.name and req.body.description changes
routesProjects.put('/:id', async (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ message: "Update requires a name. Cannot update." });
    }
    if (!req.body.description) {
        return res.status(400).json({ message: "Update requires a description. Cannot update." });
    }

    const checkProjectExists = await ProjectModel.getProjectById(req.params.id);
    if (!checkProjectExists) {
        return res.status(404).json({ message: "The project with ID does not exist. Cannot update." });
    }


    try {
        const projectUpdated = await ProjectModel.update(req.params.id, req.body);
        res.status(200).json({ 
            updatedProject: projectUpdated, 
            originalProject: checkProjectExists
        })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting project!"})
    }

});


module.exports = routesProjects;

