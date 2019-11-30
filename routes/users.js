const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

function usersRoutes(app) {
	app
		.get('/api/users', (req, res) => {
			User
				.find({})
				.then(list => res.json(list).end())
		})
		.post('/api/users', (req, res) => {
			const user = new User(req.body);

			user.save()
				.then(user => res.json(user).end())
				.catch(err => res.status(400).json(err).end())
		})
		.get('/api/users/:userId', (req, res) => {
			User.findById(req.params.userId)
				.select('name birthDate gender about')
				.then(user => res.json(user).end())
				.catch(() => res.status(400).end())
		})
		.delete('/api/users/:userId', (req, res) => {
			User.findById(req.params.userId)
				.then(user => user.remove())
				.then(user => res.json(user).end())
				.catch(() => res.status(400).end())
		})
		.put('/api/users/:userId', (req, res) => {
			User.findById(req.params.userId)
				.then(user => Object.assign(user, req.body))
				.then(user => user.save())
				.then(user => res.json(user).end())
				.catch(err => {
					console.error(err);
					res.status(400).json({message: 'failed to update user'}).end()
				});
		})
		.post('/api/users/login', (req, res) => {
			User
				.findOne({
					username: req.body.username,
					password: req.body.password
				})
				.then(user => {
					if(! user) {
						res.status(403).end();
						return;
					}
					const token = jwt.sign({
						exp: 60 * 60 * 24 * 7,
						data: user._id
					}, 'hf98nvte98g4n');

					res.cookie('user', token);
					res.end();
				})
				.catch((err) => res.status(400).send(err));
		})
}

module.exports = usersRoutes;
