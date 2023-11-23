const projectModel = require("../models/projectModal");
const userModel = require("../models/userModel");
const userController = require("./userController");

async function uploadProject(req, res) {
    try {
        console.log(req.file.filename);
        console.log(req.body);
        const filename = req.file.filename; // Get the filename from the uploaded file
        const { title, deadlineDate, clientEmail } = req.body;
        // const { title, deadline } = req.body;
        const clientId = await userController.findUserIdByEmail(clientEmail);
        console.log('User ID:', clientId);

        // console.log(title);
        // console.log(deadlineDate);
        // console.log(document);
        projectModel.create({ title, postedBy: clientId, deadlineDate, document: filename, status: "Pending" })
            .then(res.status(200).json({ message: "Project posted successfully in backend" }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ message: err });
            });
        // return res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}
async function getAllProjectsByClient(req, res) {
    try {
        console.log(req.params.email);


        const clientId = await userController.findUserIdByEmail(req.params.email);
        console.log('User ID:', clientId);

        const projects = await projectModel.find({ postedBy: clientId });
        return res.json({
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error('Error getting projects by client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getProjectDetails(req, res) {
    try {
        console.log(req.params.project_Id);
        const project = await projectModel.findById(req.params.project_Id);
        return res.json({ project });
    } catch (error) {
        console.error('Error getting projects Details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllProjects(req, res) {
    try {
        const projects = await projectModel.find();
        return res.json({ projects });
    } catch (error) {
        console.error('Error getting projects:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getProjects(req, res) {
    try {
        let query = {};

        // Check for the 'status' query parameter
        if (req.query.status) {
            console.log('Status:', req.query.status);
            if (req.query.status === 'Pending') {
                console.log('Unassigned projects');
                query = { assignedTo: { $exists: false } };
            } else if (req.query.status === 'In-progress') {
                console.log('Assigned projects');
                query = { status: 'In-progress' };
            } else if (req.query.status === 'completed') {
                console.log('Completed projects');
                query = { status: 'completed' };
            }
        }

        // Fetch projects based on the query
        const projects = await projectModel.find(query)
            .populate('postedBy', 'username') // Populate the 'postedBy' field with the 'username' property
            .populate('assignedTo', 'username'); // Populate the 'assignedTo' field with the 'username' property
        console.log(projects)
        return res.json({ count: projects.length, projects: projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
async function assignProject(req, res) {
    try {
        const projectId = req.params.project_Id;
        const employeeId = req.params.employee_Id;

        // Check if the project with the given ID exists
        const existingProject = await projectModel.findById(projectId);
        if (!existingProject) {
            return res.status(400).json({ success: false, message: 'Project not found' });
        }

        // Check if the employee with the given ID exists
        const existingEmployee = await userModel.findById(employeeId);
        if (!existingEmployee) {
            return res.status(400).json({ success: false, message: 'Employee not found' });
        }

        // Assign the project to the employee
        existingProject.assignedTo = employeeId;
        existingProject.status = 'In-progress';
        await existingProject.save();

        return res.json({ success: true, message: 'Project assigned successfully' });
    }
    catch (error) {
        console.error('Error assigning project:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function assignRepository(req, res) {
    try {
        const { project_Id } = req.params;
        const { repoLink } = req.body;

        console.log('Project ID:', project_Id);
        console.log('Repository Link:', repoLink);
        // Find the project by projectId
        const project = await projectModel.findById(project_Id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update the project with the repository link
        project.repositoryLink = repoLink;

        // Save the updated project
        await project.save();

        console.log('Repository link assigned successfully');

        return res.json({ success: true, message: 'Repository Link assigned successfully' });
    } catch (error) {
        console.error('Error handling repository link:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

async function completeProject(req, res) {
    try {
        const { project_Id } = req.params;

        // Find the project by projectId
        const project = await projectModel.findById(project_Id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update the project status to 'completed'
        project.status = 'completed';

        // Save the updated project
        await project.save();
        return res.json({ success: true, message: 'Project Completed successfully' });
    }
    catch (error) {
        console.error('Error handling repository link:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}
module.exports = {
    uploadProject,
    getAllProjectsByClient,
    getProjectDetails,

    getProjects,
    getAllProjects,
    assignProject,

    assignRepository,

    completeProject
}
// title: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Assuming you have a User model
//     required: true,
//   },
//   deadlineDate: {
//     type: Date,
//     required: true,
//   },
//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Assuming you have a User model for employees
//   },
//   document: {
//     type: String, // This could be a link to a document stored on Cloudinary or a file path
//     required: true,
//   },
//   repositoryLink: {
//     type: String,
//   },



