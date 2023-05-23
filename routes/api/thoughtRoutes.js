// Importing the required dependencies and functions
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Defining routes for different HTTP methods and associating them with corresponding controller functions

// Route: /thoughts
router.route('/')
  .get(getThoughts) // GET request to retrieve all thoughts
  .post(createThought); // POST request to create a new thought

// Route: /thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought) // GET request to retrieve a single thought by its ID
  .put(updateThought) // PUT request to update a thought by its ID
  .delete(deleteThought); // DELETE request to delete a thought by its ID

// Route: /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction); // POST request to add a reaction to a thought by its ID

// Route: /thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // DELETE request to delete a reaction from a thought by its ID

// Exporting the router module
module.exports = router;
