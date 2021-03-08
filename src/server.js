const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

// controllers
const router = require('./routes/proxy');

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});