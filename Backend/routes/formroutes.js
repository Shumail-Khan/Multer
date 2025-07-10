let router = require('express').Router();
let upload = require('../middlewares/file');
const { createEntry, getEntries, deleteEntry, updateEntry, getSingleEntry } = require('../controllers/formcontroller');

// Define routes for form operations
router.post('/create', upload.single('file'), createEntry);
router.get('/forms', getEntries);
router.put('/update/:id', upload.single('file'), updateEntry)
router.delete('/remove/:id', deleteEntry);
router.get('/single/:id', getSingleEntry);


module.exports = router;