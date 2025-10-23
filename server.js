import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config'

//Import the Fruit model from the "fruit.js" document in the "models" folder
import Fruit from './models/fruits.js';

//Create the application
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded());


//Routes
//Create a landing page
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//Render a form to create a new fruit
app.get ('/fruits/new', (req, res) =>{
    res.render ('fruits/new.ejs')
}) 


//Connections
//Connect to the Mongoose database
const myDBLink = process.env.MONGODB_URI

const connectToDB = async () => {
    try {
        await mongoose.connect(myDBLink);
        console.log('Have succesfully connected to the database')
    }
    catch (error) {
        console.log('Failed to connect to the database')
    }
}
connectToDB();

//Connect the application to the local server
app.listen(3000, (req, res) => {
    console.log('Constantino, we are listening on port 3000');
})
