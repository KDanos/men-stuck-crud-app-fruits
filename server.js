import express, { response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config'
import methodOverride from 'method-override'

//Import the Fruit model from the "fruit.js" document in the "models" folder
import Fruit from './models/fruits.js';

//Create the application
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use (express.static('public'));
app.use (methodOverride('_method'));


//Routes
//Create a landing page
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//Render a form to create a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

//Post the new data
app.post("/fruits", async (req, res) => {
    req.body.isReadyToEat = !!req.body.isReadyToEat;
    await Fruit.create(req.body);
    res.redirect('/fruits');
})

//Create a page to list all fruits in the data base
app.get('/fruits', async (req, res)=>{
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs',{fruits:allFruits})
})

//Create a page to list all features of a single
app.get('/fruits/:fruitId', async (req,res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('fruits/show.ejs', {fruit:foundFruit});
})

//Delete a fruit-i.e. delete a document from the collection
app.delete("/fruits/:fruitId", async (req,res) =>{
    await Fruit.findByIdAndDelete (req.params.fruitId)
    res.redirect("/fruits");
})

//Updatea fruit
app.get("/fruits/:fruitId/edit", async (req,res)=>{
    const foundFruit= await Fruit.findById (req.params.fruitId);
    console.log(`i have found the fruit ${foundFruit}`);
    res.render(`fruits/edit.ejs`,{fruit:foundFruit});
});

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
