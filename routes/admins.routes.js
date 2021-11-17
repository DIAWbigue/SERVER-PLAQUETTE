const {handleError} = require("../utils/functions")
const AdminController = require("../controller/AdminController")
const Admin = new AdminController()

module.exports = (app) => {
    //CREATE
    app.post(`/api/admins/add` , async (req, res) => {
        const {body} = req
        try {
            const response = await Admin.createOne(body)
            res.send(response)
        } catch (err) {
            handleError(err, res)
        }
    })
    // Login
    app.post(`/api/admin/login`, async (req, res) => {
        const {body} = req
        try {
            const response = await Admin.login(body)
            res.send(response)
        } catch (err) {
            handleError(err, res)
        }
    });
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
    //getAdmin middleware
    async function getAdmin(req, res) {
        let admin;
        try {
            admin = await Admin.findById(req.params.id);
            if (admin == null) {
                return res.status(404).json({ message: "Cannot find Admin" });
            }
        } catch (err) {
        return res.status(500).json({ message: err.message });
        }
        res.admin = admin;
    }
    
    //update by id
    app.put(`/api/admin/update/:id`, getAdmin, async (req, res) => {
        try {
          const updatedAdmin = await res.admin.set(req.body);
          res.json(updatedAdmin);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
    });
    //Delete One
    app.delete(`/api/admin/delete/:id`, getAdmin, async (req, res) => {
        try {
            await res.admin.deleteOne();
            res.json({ message: "Admin supprimé" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}