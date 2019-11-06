const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Movie = require('./models/movie');
const cors = require('cors');
const movieRoutes = require('./routes/movies');

mongoose.connect("mongodb+srv://manpham:mntltlye@cluster0-libyr.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/movies', movieRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT , function() {
	console.log(`Server listening on port: ${PORT}`);
});