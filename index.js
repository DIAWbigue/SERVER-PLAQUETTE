const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');

// require("dotenv").config({
//  path: path.join(__dirname, "../.env")
// });

require("dotenv").config()





const PORT = process.env.PORT || 3000;
const DB = process.env.DBLINK

//CONNEXION TO DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('successfully connected to db'))
.catch((err) => console.log(`connexion to db failed: ${err}`))

//MIDDLEWARE
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
