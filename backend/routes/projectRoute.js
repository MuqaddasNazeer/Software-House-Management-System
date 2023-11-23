
const express = require("express");
const router = express.Router();
const projectController = require("./../controllers/projectController");
const fileUpload = require("./../middleware/uploadFiles");

router.post('/uploadProject', fileUpload.single('file'), projectController.uploadProject);

router.get('/projectsByClient/:email', projectController.getAllProjectsByClient);
router.get('/projectsDetails/:project_Id', projectController.getProjectDetails);

router.get('/projects', projectController.getProjects);
router.get('/projectsData', projectController.getAllProjects);

router.post('/assignProject/:project_Id/:employee_Id', projectController.assignProject);

router.post('/assignRepository/:project_Id', projectController.assignRepository);

router.put('/completeProject/:project_Id', projectController.completeProject);

module.exports = router;
