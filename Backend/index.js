let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let router = require('./routes/formroutes');

let app = express();
// let upload = require('./middlewares/file');
// let validateFields = require('./middlewares/validatefields');
const handleerror = require('./middlewares/error');

require('dotenv').config();


app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', router);
app.use(handleerror);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});