// First, define a schema for your data by creating an object with the fields and data types that you want to store. Then, create a Model instance, passing in the schema as a parameter. Finally, use the created model to create, update, query, and delete documents in the database

import mongoose from 'mongoose';
const {Schema} = mongoose;

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
    required: true
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
