const Admin = require("../models/AdminModel")
const bcrypt = require('bcryptjs')
const {handleError} = require("../utils/functions")

module.exports = function(){
    /***************/
    //  CREATE
    /*************/
    //Create one
    this.createOne = async function(body){
        body.password = bcrypt.hashSync(body.password, 10)
        const newAdmin = new Admin(body);
        await newAdmin.save()
        return {success: true}
    }
    /************/
    //  READ
    /***********/
    //FIND ALL
    this.findAll = async function(){
        return Admin.find()
    }
    //FIND ONE
    this.findById = async function (id){
        return Admin.findOne({_id: id})
    }
    // Acces par role

    this.grantAccess = function(action, resource) {
      return async (req, res, next) => {
        try {
          const permission = roles.can(req.user.role)[action](resource);
          if (!permission.granted) {
            return res.status(401).json({
              error: "You don't have enough permission to perform this action"
            });
          }
        } catch (err) {
          handleError(err, res)
        }
      }
    }
    // Login
    this.login = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, admin.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        const accessToken = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "1d"
        });
        await Admin.findByIdAndUpdate(admin._id, { accessToken })
        res.status(200).json({
          data: { email: admin.email, role: admin.role },
          accessToken
        })
      } catch (err) {
        handleError(err, res)
      }
    }
} 