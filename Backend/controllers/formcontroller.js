let Form = require('../models/Form');
let fs = require('fs');
const { get } = require('http');
let path = require('path');

const createEntry = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { username, age } = req.body;
        const file = req.file;

        if (!username || !age) {

            const oldFilePath = path.join(__dirname, '../public/images', file.filename);
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error('Error deleting old file:', err);
                }})
            return res.status(400).send('Username and age are required.');
        }

        const newForm = new Form({
            username,
            age,
            file: file.filename
        });

        await newForm.save();
        res.status(201).send({ message: 'Form created successfully', form: newForm });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } 
}

const getEntries = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).send(forms);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const updateEntry = async (req, res) => {
    try{
        const {id} = req.params;
        const { username, age } = req.body;
        const file = req.file;

        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).send('Entry not found');
        }
        
        if (file && form.file) {
            // Delete the old file
            const oldFilePath = path.join(__dirname, '../public/images', form.file);
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error('Error deleting old file:', err);
                }
            })
        }
        const updatedForm = {
            username,
            age: age,
            file: file ? file.filename : form.file
        };

        const result = await Form.findByIdAndUpdate(id, updatedForm, { new: true });
        return res.status(200).send({ message: 'Entry updated successfully', form: result });
    }catch (error) {
        res.status(500).send({message:'Internal Server Error', error: error.message});
    }
}

const deleteEntry = async (req, res) => {
    try{
        const { id } = req.params;
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).send('Entry not found');
        }
        // Delete the file from the server
        const filePath = path.join(__dirname, '../public/images', form.file);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        // Delete the entry from the database
        let result = await Form.deleteOne({_id: id});
        if(result){
            return res.status(200).send({ message: 'Entry deleted successfully' });
        }
    }
    catch(error) {
        res.status(500).send({message:'Internal Server Error', error: error.message});
    }
}

const getSingleEntry = async (req, res) => {
    try{
        const {id}=req.params;
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).send('Entry not found');
        }
        res.status(200).send(form);
    }
    catch(error) {
        res.status(500).send({message:'Internal Server Error', error: error.message});
    }
}

module.exports = {createEntry, getEntries, updateEntry, deleteEntry, getSingleEntry};