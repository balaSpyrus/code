var mongoose = require('mongoose');
var DataSchema = mongoose.Schema;
var torrentSchema = mongoose.Schema({

	date_uploaded:String,
	date_uploaded_unix:Number,
	hash:String,
	peers:Number,
	quality:String,
	seeds:Number,
	size:String,
	size_bytes:Number,
	url:String
	
},{ _id : false });
var ytsData=new DataSchema({

	background_image:String,
	background_image_original:String,
	date_uploaded:String,
	date_uploaded_unix:Number,
	description_full:String,
	genres:[{type: String}],
	id:Number,
	imdb_code:String,
	language:String,
	large_cover_image:String,
	medium_cover_image:String,
	mpa_rating:String,
	rating:Number,
	runtime:Number,
	slug:String,
	small_cover_image:String,
	state:String,
	summary:String,
	synopsis:String,
	title:String,
	title_english:String,
	title_long:String,
	torrents:[torrentSchema],
	url:String,
	year:Number,
	yt_trailer_code:String

}, { versionKey: false });

var YtsData = mongoose.model('ytsData', ytsData,'ytsData');
module.exports=YtsData;