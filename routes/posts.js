const mongoose = require('mongoose');
const Post = mongoose.model('Post');

function postsRoutes(app) {
	app
		.get('/api/posts', (req, res) => {
			Post
				.find({})
				.sort('-created')
				.limit(Number(req.query.limit || 20))
				.offset(Number(req.query.offset || 0))
				.then(list => res.json(list).end())
		})
		.post('/api/posts', (req, res) => {
			const post = new Post(req.body);
			post.user = req.user._id;

			post.save()
				.then(post => res.json(post).end())
				.catch(err => res.status(400).json(err).end())
		})
		.get('/api/posts/:postId', (req, res) => {
			Post.findById(req.params.postId)
				.then(post => res.json(post).end())
				.catch(() => res.status(400).end())
		})
		.delete('/api/posts/:postId', (req, res) => {
			Post.findOne({_id: req.params.postId, user: req.user._id})
				.then(post => post.remove())
				.then(post => res.json(post).end())
				.catch(() => res.status(400).end())
		})
		.put('/api/posts/:postId', (req, res) => {
			Post.findOne({_id: req.params.postId, user: req.user._id})
				.then(post => Object.assign(post, req.body))
				.then(post => post.save())
				.then(post => res.json(post).end())
				.catch(err => {
					console.error(err);
					res.status(400).json({message: 'failed to update post'}).end()
				});
		})
}

module.exports = postsRoutes;
