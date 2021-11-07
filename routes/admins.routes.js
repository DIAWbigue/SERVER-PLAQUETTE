const {handleError} = require("../utils/functions")
const AdminController = require("../controller/AdminController")
const Admin = new AdminController()

module.exports = (app) => {
    //CREATE
    app.post(`/api/admins/add`, async (req, res) => {
        const {body} = req
        try {
            const response = await Admin.createOne(body)
            res.send(response)
        } catch (err) {
            handleError(err, res)
        }
    })
    //READ
    //get all
    app.get(`/api/admins`, async (req, res) => {
        try {
            const admins = await Admin.findAll()
            res.status(200).send(admins)
        } catch (err) {
            handleError(err, res)
        }
    })
    //get by id
    app.get(`/api/admins/:id`, async (req, res) => {
        const id = req.params.id
        try {
            const admin = await Admin.findById(id)
            res.status(200).send({success: true, admin})
        } catch (err) {
            handleError(err, res)
        }
    })
}