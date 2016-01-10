var mongoose = require('mongoose');

var Source = new mongoose.Schema({
    name: {type: String, unique: true},
    uri: String,
    last_update: Date,
    next_update: Date,
    update_interval: Number
});

var Gallery = new mongoose.Schema({
    source_id: Number,
    name: String,
    uri: String,
    created: Date
});

mongoose.model('Source', Source);
mongoose.model('Gallery', Gallery);
mongoose.connect('localhost:27017/kcpo');