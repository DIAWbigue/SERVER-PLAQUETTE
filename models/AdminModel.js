const mongoose = require('mongoose')
const Schema = mongoose.Schema
const date = Date.now()

const AdminModel = new Schema(
    {
        createdAt: {
            type: Date,
            default: date
        },
        fullname:{
            type: {
                lastname: {type: String},
                firstname: {type: String},
            }
        },
        username: {type: String},
        // old: {type: Number},
        
        email: {
            type: String,
        },
        password: {type: String},
        role: {
            type: String,
            default: 'ROLE_ADMIN'
        }
    },
    {
        collection: 'admins'
    }
)

module.exports = Admin = mongoose.model('Admin', AdminModel)