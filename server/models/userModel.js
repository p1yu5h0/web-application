const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect("mongodb+srv://piyush200205:piyush200205@cluster0.7s11z7j.mongodb.net/?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true
    }, 
    password : {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName : {
        type: String, 
        required: true,
        trim: true,
        maxLength: 20
    }, 
    lastName : {
        type: String, 
        required: true,
        trim: true,
        maxLength: 20
    },
    image : {
        image: String
    }
})

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
}