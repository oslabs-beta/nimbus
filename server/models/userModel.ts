import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// load any environment variables from a .env file 
dotenv.config();
// const { MONGO_URI } = process.env
// access mongoURI from our secure file 
const mongoURI:string = process.env.MONGO_URI!;

// check if mongoose is connected to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// extract out Schema constructor from mongoose so we can create a new instance of a Schema
const Schema = mongoose.Schema;

// Create a new instance of a User Schema
const UserSchema = new Schema({
 firstName: {
    type: String, 
    required: true
 },
 lastName: {
    type: String,
    required: true
 },
 email: {
    type: String,
    required: true,
    unique: true
 },
 password: {
    type: String, 
    required: true
 }, 
 ssid: {
   type: String,
   // Probably won't be required
   // required: true
 }
})

// create a User model constructor using the UserSchmea we defined above 
const User = mongoose.model('User', UserSchema);

// make User model constructor public to all files in our app
module.exports = User;
