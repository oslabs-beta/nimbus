import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const mongoURI:string = process.env.MONGO_URI!;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

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
 arn: {
   type: String, 
   required: true
 },
 region: {
   type: String, 
   required: true
 }
})

const User = mongoose.model('User', UserSchema);

export default User;
