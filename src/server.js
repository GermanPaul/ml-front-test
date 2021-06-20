const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

// controllers
const router = require('./routes/proxy');

// settings
app.set('port', parseInt(process.env.PORT) || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/api', router);
app.get('/items*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});