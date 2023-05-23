const { User, Thought } = require("../models");

module.exports = {
// Retrieve all users
getUsers(req, res) {
User.find()
.select("-__v")
.then((users) => {
const userObj = {
users,
};
return res.json(userObj);
})
.catch((err) => {
console.log(err);
return res.status(500).json(err);
});
},

// Retrieve a single user by its _id and populate thought and friend data
getSingleUser(req, res) {
User.findOne({ _id: req.params.userId })
.select("-__v")
.populate("thoughts")
.populate("friends")
.then((user) =>
!user
? res.status(404).json({ error: "User not found with that ID" })
: res.json(user)
)
.catch((err) => res.status(500).json(err));
},

// Create a new user
createUser(req, res) {
User.create(req.body)
.then((user) => res.json(user))
.catch((err) => res.status(500).json(err));
},

// Update a user by its _id
updateUser(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $set: req.body },
{ runValidators: true, new: true }
)
.then((user) =>
!user
? res.status(404).json({ error: "User not found with this ID" })
: res.json(user)
)
.catch((err) => res.status(500).json(err));
},

// Remove a user by its _id and associated thoughts
deleteUser(req, res) {
User.findOneAndDelete({ _id: req.params.userId })
.then((user) =>
!user
? res.status(404).json({ error: "User not found with that ID" })
: Thought.deleteMany({ _id: { $in: user.thoughts } })
)
.then(() => res.json({ message: "User and associated thoughts deleted!" }))
.catch((err) => res.status(500).json(err));
},

// Add a new friend to a user's friend list
addFriend(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $addToSet: { friends: req.body } },
{ runValidators: true, new: true }
)
.then((user) =>
!user
? res.status(404).json({ error: "User not found with that ID" })
: res.json(user)
)
.catch((err) => res.status(500).json(err));
},

// Remove a friend from a user's friend list
deleteFriend(req, res) {
User.findOneAndUpdate(
{ _id: req.params.userId },
{ $pull: { friends: { friendId: req.params.friendId } } },
{ runValidators: true }
)
.then((user) =>
!user
? res.status(404).json({ error: "User not found with this ID" })
: res.status(200).json({ message: "Friend deleted successfully" })
)
.catch((err) => res.status(500).json(err));
},
};