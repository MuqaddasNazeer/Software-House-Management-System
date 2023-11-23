const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './project_files');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});


const upload = multer({ storage })
module.exports = upload;
