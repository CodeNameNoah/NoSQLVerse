// Importing the necessary modules and functions
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Setting up the routes and associating them with the corresponding controller functions

// Route for getting all users and creating a new user
router.route('/').get(getUsers).post(createUser);

// Route for getting a single user, updating a user, and deleting a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Route for adding a friend to a user and deleting a friend from a user
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Exporting the router module
module.exports = router;
