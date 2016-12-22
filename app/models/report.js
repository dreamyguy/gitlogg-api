var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReportSchema = new Schema({
  title: String,
  url: String,
  text: String
});

mongoose.model('Report', ReportSchema);
