const mongoose = require('mongoose');

mongoose
	.connect("mongodb://heroku_4nrl7n1g:d6m1n6th9j5qin14ji2ihptmv9@ds349628.mlab.com:49628/heroku_4nrl7n1g", {useNewUrlParser: true, useUnifiedTopology: true})
	.catch(() => process.exit(1));

require('./user');
require('./post');
