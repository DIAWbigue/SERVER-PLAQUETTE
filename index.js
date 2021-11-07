const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()

//VARIABLES
const PORT = 5000 || process.env.PORT;
const DB = process.env.DBLINK

//MIDDLEWARE
app.use(express.json())
app.use(cors())

//CONNEXION TO DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('successfully connected to db'))
.catch((err) => console.log(`connexion to db failed: ${err}`))

//ROUTES
require("./routes/admins.routes")(app)

//LISTENER
app.listen(PORT, () => console.log("Run on port : ", PORT))