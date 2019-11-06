const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: { type: String, required: true},
	director: { type: String},
	company: { type: String},
	imageUrl: { type: String, required: true },
    releaseDate: { type: Date , min: [() => Date.now() + 24*60*60*1000,'Ngày phát hành phải lớn hơn ngày hiện tại!'] },
    startDate: { type: Date, max: [() => Date.now() - 24*60*60*1000,'Ngày bấm máy phải nhỏ hơn ngày hiện tại!'] }
});


module.exports = mongoose.model('Movie', movieSchema );