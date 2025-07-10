let multer = require('multer');

const handleerror = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).send(`Multer Error: ${error.message}: ${error.code}`);
    } else if (error) {
        return res.status(500).send('An error occurred while processing the file.');
    }
    next();
}

module.exports = handleerror;