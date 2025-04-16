// Allow user to sign up.
// Allow user to sign in.
// schema refers to the structure or blueprint that defines how data is organized in your database
//Allow user to update their information (firstName, lastName, passwor
// backend/db.js
// backend/db.js

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Admin:jlnuufahkfhbakjbf@cluster0.cu0co.mongodb.net/paytm-project")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLengthg: 30


    },


    password: {

        type: String,
        required: true,
        trim: true,
        maxLength: 6

    },

    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 12
    },

    lastname: {
        type: String,
        reruired: true,
        trim: true,
        maxLength: 12
    }


})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User', userSchema);


module.exports = {
    User: User,
    	Account :  Account
};
