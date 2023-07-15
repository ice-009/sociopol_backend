const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');
const connectDatabase = require('./config/db')
const dotenv = require('dotenv')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const process = require('process')

const app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(fileUpload())


// const templatePath = path.join(__dirname,"../templates")
// const partialPath = path.join(__dirname,"./partials")



// app.set('view engine', 'html');
app.set('view engine', 'hbs');
//custom view path
// app.set("views",templatePath)
//partial path


// hbs.registerPartials(partialPath)

app.use(express.json())
app.set('trust proxy', true)
mongoose.set('strictQuery', true)
app.use('/api/v1',apiRoutes);

app.use(express.static(path.join('public')));


dotenv.config({path:".env"});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  connectDatabase();
}); 

