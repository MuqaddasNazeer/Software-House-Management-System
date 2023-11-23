
const express = require("express");
const router = express.Router();
const projectController = require("./../controllers/projectController");
const fileUpload = require("./../middleware/uploadFiles");

router.post('/uploadProject', fileUpload.single('file'), projectController.uploadProject);

router.get('/projectsByClient/:email', projectController.getAllProjectsByClient);
router.get('/projectsDetails/:project_Id', projectController.getProjectDetails);

router.get('/projects', projectController.getProjects);
router.get('/projectsData', projectController.getAllProjects);

router.post('/assignProject/:projectId/:employeeId', projectController.assignProject);

module.exports = router;
