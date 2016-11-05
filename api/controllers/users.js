'use strict';

const User = require('.././models/users');


module.exports = {
  createUser: createUser,
  listUsers: listUsers
};

function createUser(req, res) {
  let user = new User();
  user.name = req.swagger.params.name.value.name;

  user.save((error) => {
    if (error) {
      console.log('Error in creating a user', error);
      res.status(400).json({
        sucess: false,
        message: 'Error in creating a user'
      });
    } else {
      res.status(200).json({
        sucess: true,
        message: 'Successfully created a user'
      });
    }
  });
}

function listUsers(req, res) {

  User.find({}, 'name', (error, users) => {
    console.log('listUsers', users)
    if (error) {
      console.log('Error in creating a user', error);
      res.status(400).json({
        sucess: false,
        message: 'Error in getting users'
      });
    } else {
      res.status(200).json({
        sucess: true,
        message: 'Successfully get the all users',
        users: users
      });
    }
  })
}
