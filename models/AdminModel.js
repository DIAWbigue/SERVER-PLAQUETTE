const mongoose = require('mongoose')
const Schema = mongoose.Schema
const date = Date.now()

const AdminModel = new Schema(
    {
        createdAt: {
            type: Date,
            default: date
        },
        username: {
            type: String
        },
        email: {
            type: String,
        },
        password: {type: String},
        role: {
            type: String,
            default: 'supervisor',
            enum: ["supervisor", "admin"]
        },
        accessToken:{
            type: String
        }
    },
    {
        collection: 'admins'
    }
)

module.exports = Admin = mongoose.model('Admin', AdminModel)