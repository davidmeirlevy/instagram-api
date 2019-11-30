const mongoose = require('mongoose');

mongoose.model('User', {
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	birthDate: Date,
	gender: {
		type: String,
		enum: ['f', 'm']
	},
	about: String,
	created: {
		type: Date,
		default: Date.now
	}
});
