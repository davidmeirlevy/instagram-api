const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('./models');

const app = express();
const port = 4000;

app.use(express.static('public'));
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(function (req, res, next) {
	const User = mongoose.model('User');

	User.findOne({
		user: req.headers.user,
		password: req.headers.password
	})
		.then(user => req.user = user)
		.then(() => next())
		.catch(() => res.status(400).end());
});

require('./routes/users')(app);
require('./routes/posts')(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));

