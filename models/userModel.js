const mongoose = require('mongoose')
const Schema = mongoose.Schema
const date = Date.now()

const UserSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: date
        },
        username: {type: String},
        // old: {type: Number},
        
        email: {
            type: String, required: true, trim: true
        },
        password: {type: String, required: true},
        role: {
          type: String,
          default: 'supervisor',
          enum: ["supervisor", "admin"]
        },
        accessToken: {
          type: String
        }
    },
    {
        collection: 'users'
    }
)

const User =  mongoose.model('user', UserSchema)

module.exports = User;