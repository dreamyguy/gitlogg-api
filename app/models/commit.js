var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommitSchema = new Schema({
  repository: String,
  commit_nr: Number,
  commit_hash: String,
  author_name: String,
  author_email: String,
  author_date: String,
  author_date_relative: String,
  author_date_unix_timestamp: String,
  author_date_iso_8601: String,
  subject: String,
  subject_sanitized: String,
  stats: String,
  time_hour: Number,
  time_minutes: Number,
  time_seconds: Number,
  time_gmt: String,
  date_day_week: String,
  date_month_day: Number,
  date_month_name: String,
  date_month_number: Number,
  date_year: String,
  date_iso_8601: String,
  files_changed: Number,
  insertions: Number,
  deletions: Number,
  impact: Number
});

mongoose.model('Commit', CommitSchema);
