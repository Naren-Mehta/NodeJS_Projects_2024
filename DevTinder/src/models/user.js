const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    age: Number,
    emailId: {
        type: String,
        required: true,
        unique: true,  // This ensures Mongoose will create a unique index for the email field
        trim: true,
        lowercase: true, // converts email to lower case,
        trim: true, // will remove white spaces
        validate: {
            validator: v => {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    gender: String,
    photoUrl: {
        type: String,
        default: 'www.example.com',
    },
    about: {
        type: String,
        default: 'I am a cool person',
    },
    skills: {
        type: String,
        default: 'Travelling, singing'
    }

})

module.exports =  mongoose.model('User', userSchema);;