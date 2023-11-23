const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
// const validation = require("./../utils/auth_middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Role based routes for Employees and clients
//Employee Routes
router.get("/getEmployees", userController.getAllEmployees);
router.delete("/deleteEmployee/:employee_Id", userController.deleteEmployee);
router.get("/employeeDetails/:employee_Id", userController.getEmployeeDetails);

// Client Routes
router.get("/getClients", userController.getAllClients);
router.get("/clientDetails/:client_Id", userController.getClientDetails);


// router.put("/updateUser/:id", userController.updateUser);
// router.delete("/deleteUser/:id", userController.deleteUser);
// router.get("/getUsers", userController.getUsers);
// router.get("/getUsers/:id", userController.getSingleUser);
// router.get("/admin",validation.validateToken,validation.requireRoles(['admin']) ,userController.adminDashboard);



module.exports = router ;
