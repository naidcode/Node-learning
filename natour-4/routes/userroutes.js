 const express = require('express')

 const {getAllUsers , CreateUsers , GetUsers , UpdateUsers , DeleteUsers} = require('./../controller/usercontroller')

 const Router = express.Router();
 Router.route('/').get(getAllUsers).post(CreateUsers);
Router.route('/:id').get(GetUsers).patch(UpdateUsers).delete(DeleteUsers);

module.exports = Router;


