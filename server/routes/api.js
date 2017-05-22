const express = require('express');
const router = express.Router();
const User = require('src/app/models/user');

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('api works');
});

/* Get all users */
router.get('/users', (req, res) => {
	var cursor = User.find({}, function(err, users) {
		if (err) {
			throw err;
		}
		console.info(users);
		res.json(users);
	});
});

/* Create a user */
router.post('/user', (req, res) => {
	var newUser = User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password
	});
	newUser.save(function(err) {
		if (err) {
			throw err;
		}
		console.log('User created!');
	});
})
module.exports = router;