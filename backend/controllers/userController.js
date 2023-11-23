const userModel = require("../models/userModel");
const projectModel = require("../models/projectModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


async function registerUser(req, res) {
  try {
    // In case if any of the field is missing
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.location) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    else {
      console.log(req.body); //For checking response send in console
      const { username, email, password, location, role } = req.body;
      bcrypt.hash(password, 10)
        .then((hash) => {
          userModel.create({ username, email, password: hash, location, role })
            .then(res.status(200).json({ message: "User created successfully in backend" }))
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ message: err });
            });
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}
async function loginUser(req, res) {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    userModel.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      else {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: err });
          }
          else if (result == true) {
            var token = GenerateToken(user);
            // Set the token in a cookie

            // console.log(token);
            console.log("Logged In successfully");
            return res.status(200).json({
              message: "User logged in successfully",
              email: email,
              role: user.role,
              userid: user._id,
              token: token,
            });
          }
          else if (result == false) {
            return res.status(401).json({ message: "Invalid Credentials" });
          }
        });
      }
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ apierror: error });
  }
}

function GenerateToken(user) {
  const payload = {
    role: user.role,
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

// Seperate from frontend
const findUserIdByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      console.log(`User found with email ${email}: ${user._id}`);
      return user._id; // Return the user ID
    } else {
      console.log(`No user found with email ${email}`);
      return null; // Return null if no user is found
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error; // Handle the error as needed
  }
};

// Role based apis Employee and Client

// Client Api s

async function getAllClients(req, res) {
  try {
    const clients = await userModel.find({ role: "client" });
    if (!clients) {
      return res.status(400).json({ message: "No Clients found" });
    }
    else {
      return res.status(200).json({
        count: clients.length,
        data: clients,
      });
    }

  } catch (error) {
    console.error('Error gettting clients from db:', error);
    return res.status(500).json({ message: error });
  }
};
async function getClientDetails(req, res) {
  try {
    console.log(req.params.client_Id);
    const client = await userModel.findOne({ _id: req.params.client_Id });
    const projects = await projectModel.find({ postedBy: req.params.client_Id });
    return res.status(200).json({
      clientData: client,
      projectsData: projects,
    });

  }

  catch (error) {
    console.error('Error gettting clients details from db:', error);
    return res.status(500).json({ message: error });
  }
};

//  Employees Api s
async function getAllEmployees(req, res) {
  try {
    const employees = await userModel.find({ role: "employee" });
    if (!employees) {
      return res.status(400).json({ message: "No employees found" });
    }
    else {
      return res.status(200).json({
        count: employees.length,
        data: employees,
      });
    }

  } catch (error) {
    console.error('Error gettting employees from db:', error);
    return res.status(500).json({ message: error });
  }
};
async function deleteEmployee(req, res) {
  try {
    const employeeId = req.params.employee_Id;;
    console.log(employeeId);

    // Check if the employee with the given ID exists
    const existingEmployee = await userModel.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Perform the deletion
    await userModel.deleteOne({ _id: employeeId });

    // Respond with a success message
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
}
async function getEmployeeDetails(req, res) {
  try {
    console.log(req.params.employee_Id);
    const employee = await userModel.findOne({ _id: req.params.employee_Id });
    const projects = await projectModel.find({ assignedTo: req.params.employee_Id });
    return res.status(200).json({
      employeeData: employee,
      projectsData: projects,
    });

  }

  catch (error) {
    console.error('Error gettting employee details from db:', error);
    return res.status(500).json({ message: error });
  }
};



module.exports = {
  registerUser,
  loginUser,
  findUserIdByEmail,

  // Role based apis Employee and Client
  getAllEmployees,
  deleteEmployee,
  getEmployeeDetails,

  // Client Api
  getAllClients,
  getClientDetails


};
