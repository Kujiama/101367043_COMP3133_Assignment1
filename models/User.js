const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'username is required'],
        uniqe: true
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        uniqe: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: [true, 'password is required']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;