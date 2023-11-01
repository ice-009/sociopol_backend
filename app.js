// const express = require('express');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const Upload = require('express-fileupload');
// const fileUpload = require('express-fileupload');

// const mongoose = require('mongoose');
// const apiRoutes = require('./routes');
// const connectDatabase = require('./config/db')
// const multer = require('multer');
// const dotenv = require('dotenv')
// const path = require('path')
// const hbs = require('hbs')
// const bodyParser = require('body-parser')
// const cookieParser = require("cookie-parser");
// const process = require('process')


// // Support parsing of URL-encoded forms
// // app.use(express.json()); 
// const app = express()
// app.use(express.json())
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet())
// // app.use(express.json)
// // app.use(cors)
// app.use(fileUpload())

// app.use(morgan('dev'))
// app.use(multer({dest:'./images'}).single('image'))
// app.use(bodyParser.json()); // Use body-parser for JSON parsing
// app.use(bodyParser.urlencoded({ extended: true })); 

// // const templatePath = path.join(__dirname,"../templates")
// const partialPath = path.join(__dirname,"./partials")



// // app.set('view engine', 'html');
// app.set('view engine', 'hbs');
// //custom view path
// // app.set("views",templatePath)
// //partial path


// hbs.registerPartials(partialPath)

// // app.use(express.json())
// app.set('trust proxy', true)
// mongoose.set('strictQuery', true)
// app.use('/api/v1',apiRoutes);

// app.use(express.static(path.join('public')));


// dotenv.config({path:".env"});

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server is up at port ${port}`);
//   connectDatabase();
// }); 



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
const partialPath = path.join(__dirname,"./partials")



// app.set('view engine', 'html');
app.set('view engine', 'hbs');
//custom view path
// app.set("views",templatePath)
//partial path


hbs.registerPartials(partialPath)

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
