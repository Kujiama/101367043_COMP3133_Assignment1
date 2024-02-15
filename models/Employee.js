const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        uniqe: true
    },

    lastName: {
        type: String,
        required: [true, 'last name is required'],
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

    gender:{
        type: String,
        enum:["Male","Female","Other"],
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;