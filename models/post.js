const mongoose = require('mongoose');

mongoose.model('Post', {
	title: String,
	picture: String,
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	tags: [String],
	likes: [{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});
