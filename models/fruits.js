import mongoose from "mongoose";

//Create a Schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});

//Create a model, made of elements comforming to the Schema
const Fruit=mongoose.model('Fruit', fruitSchema);

//Export the model 
export default Fruit;