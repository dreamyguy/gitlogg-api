var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  arrayByKey = require('../helpers/arrayByKey'),
  arrayMaxMin = require('../helpers/arrayMaxMin'),
  arrayAuthorsStats = require('../helpers/arrayAuthorsStats'),
  arrayGlobalStats = require('../helpers/arrayGlobalStats'),
  arrayRepositoriesStats = require('../helpers/arrayRepositoriesStats'),
  Commit = mongoose.model('Commit');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    status: 'this is home'
  });
});

router.get('/api', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    if (commits.length > 0) {
      var status = "<span style='color: green'>The database has records and we're good to go!</span>";
    } else {
      status =  "<span style='color: red'>The database has no records. Please import 'gitlogg.json'</span>";
    }
    res.render('api', {
      title: 'Gitlogg API',
      status: status
    });
  });
});

///////////////////////////////////
///// All commits /////////////////
///////////////////////////////////

// get all commits
router.get('/api/all', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});

///////////////////////////////////
///// Global Stats Operations /////
///////////////////////////////////

// get global- stats
router.get('/api/stats', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayGlobalStats(commits);
    res.json(a);
  });
});

// get repositories - stats
router.get('/api/stats/repositories', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits);
    res.json(a);
  });
});

// get authors - stats
router.get('/api/stats/authors', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits);
    res.json(a);
  });
});

///////////////////////////////////
///// Repositories Operations /////
///////////////////////////////////

// get repositories - stats simple - sorted by commits
router.get('/api/repositories/commits', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-commits');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by impact
router.get('/api/repositories/impact', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-impact');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by impact ratio
router.get('/api/repositories/impact-ratio', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-impact-ratio');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by days since last commit
router.get('/api/repositories/days-since-last-commit', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-days-since-last-commit');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by staleness
router.get('/api/repositories/staleness', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-staleness');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by days active
router.get('/api/repositories/days-active', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-days-active');
    res.json(a);
  });
});

// get repositories - stats simple - sorted by nr of contributors
router.get('/api/repositories/contributors-nr', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayRepositoriesStats(commits, 'simple-by-contributors-nr');
    res.json(a);
  });
});

///////////////////////////////////
///// Authors Operations //////////
///////////////////////////////////

///// simple stats, sorted by... //

// get authors - stats simple - sorted by commits
router.get('/api/authors/commit-count', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-commit-count');
    res.json(a);
  });
});

// get authors - stats simple - sorted by impact
router.get('/api/authors/impact', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-impact');
    res.json(a);
  });
});

// get authors - stats simple - sorted by impact ratio
router.get('/api/authors/impact-ratio', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-impact-ratio');
    res.json(a);
  });
});

// get authors - stats simple - sorted by days since last commit
router.get('/api/authors/days-since-last-commit', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-days-since-last-commit');
    res.json(a);
  });
});

// get authors - stats simple - sorted by staleness
router.get('/api/authors/staleness', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-staleness');
    res.json(a);
  });
});

// get authors - stats simple - sorted by days active
router.get('/api/authors/days-active', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-days-active');
    res.json(a);
  });
});

// get authors - stats simple - sorted by nr repossitories contributed to
router.get('/api/authors/repositories-nr', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'simple-by-repositories-nr');
    res.json(a);
  });
});

///// simple arrays, unsorted /////

// get authors - only email
router.get('/api/authors/only-email', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'author');
    res.json(a);
  });
});

// get authors - only commit count
router.get('/api/authors/only-commit-count', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'commits');
    res.json(a);
  });
});

// get authors - only impact
router.get('/api/authors/only-impact', function (req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayAuthorsStats(commits, 'impact');
    res.json(a);
  });
});

///////////////////////////////////
//// Equal Values Operations //////
///////////////////////////////////

// get all commits with similar 'repository'
router.get('/api/repository/:repository', function(req, res, next) {
  Commit.find({ 'repository': req.params.repository }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'commit_nr'
router.get('/api/commit_nr/:commit_nr', function(req, res, next) {
  Commit.find({ 'commit_nr': req.params.commit_nr }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'commit_hash'
router.get('/api/commit_hash/:commit_hash', function(req, res, next) {
  Commit.find({ 'commit_hash': req.params.commit_hash }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_name'
router.get('/api/author_name/:author_name', function(req, res, next) {
  Commit.find({ 'author_name': req.params.author_name }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_email'
router.get('/api/author_email/:author_email', function(req, res, next) {
  Commit.find({ 'author_email': req.params.author_email }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_date'
router.get('/api/author_date/:author_date', function(req, res, next) {
  Commit.find({ 'author_date': req.params.author_date }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_date_relative'
router.get('/api/author_date_relative/:author_date_relative', function(req, res, next) {
  Commit.find({ 'author_date_relative': req.params.author_date_relative }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_date_unix_timestamp'
router.get('/api/author_date_unix_timestamp/:author_date_unix_timestamp', function(req, res, next) {
  Commit.find({ 'author_date_unix_timestam p': req.params.author_date_unix_timestamp }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'author_date_iso_8601'
router.get('/api/author_date_iso_8601/:author_date_iso_8601', function(req, res, next) {
  Commit.find({ 'author_date_iso_8601': req.params.author_date_iso_8601 }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'subject'
router.get('/api/subject/:subject', function(req, res, next) {
  Commit.find({ 'subject': req.params.subject }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'subject_sanitized'
router.get('/api/subject_sanitized/:subject_sanitized', function(req, res, next) {
  Commit.find({ 'subject_sanitized': req.params.subject_sanitized }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'stats'
router.get('/api/stats/:stats', function(req, res, next) {
  Commit.find({ 'stats': req.params.stats }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'time_hour'
router.get('/api/time_hour/:time_hour', function(req, res, next) {
  Commit.find({ 'time_hour': req.params.time_hour }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'time_minutes'
router.get('/api/time_minutes/:time_minutes', function(req, res, next) {
  Commit.find({ 'time_minutes': req.params.time_minutes }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'time_seconds'
router.get('/api/time_seconds/:time_seconds', function(req, res, next) {
  Commit.find({ 'time_seconds': req.params.time_seconds }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'time_gmt'
router.get('/api/time_gmt/:time_gmt', function(req, res, next) {
  Commit.find({ 'time_gmt': req.params.time_gmt }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_day_week'
router.get('/api/date_day_week/:date_day_week', function(req, res, next) {
  Commit.find({ 'date_day_week': req.params.date_day_week }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_month_day'
router.get('/api/date_month_day/:date_month_day', function(req, res, next) {
  Commit.find({ 'date_month_day': req.params.date_month_day }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_month_name'
router.get('/api/date_month_name/:date_month_name', function(req, res, next) {
  Commit.find({ 'date_month_name': req.params.date_month_name }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_month_number'
router.get('/api/date_month_number/:date_month_number', function(req, res, next) {
  Commit.find({ 'date_month_number': req.params.date_month_number }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_year'
router.get('/api/date_year/:date_year', function(req, res, next) {
  Commit.find({ 'date_year': req.params.date_year }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'date_iso_8601'
router.get('/api/date_iso_8601/:date_iso_8601', function(req, res, next) {
  Commit.find({ 'date_iso_8601': req.params.date_iso_8601 }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'files_changed'
router.get('/api/files_changed/:files_changed', function(req, res, next) {
  Commit.find({ 'files_changed': req.params.files_changed }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'insertions'
router.get('/api/insertions/:insertions', function(req, res, next) {
  Commit.find({ 'insertions': req.params.insertions }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'deletions'
router.get('/api/deletions/:deletions', function(req, res, next) {
  Commit.find({ 'deletions': req.params.deletions }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});
// get all commits with similar 'impact'
router.get('/api/impact/:impact', function(req, res, next) {
  Commit.find({ 'impact': req.params.impact }, function (err, commits) {
    if (err) return next(err);
    res.json(commits);
  });
});

/////////////////////////////////////////////
///// Key Values as Array Operation /////////
/////////////////////////////////////////////

// get all values for keys and output them as a simple array
router.get('/api/key/:key', function(req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayByKey(commits, req.params.key);
    res.json(a);
  });
});

/////////////////////////////////////////////
///// Key Values - Max & Min values /////////
/////////////////////////////////////////////

// get max. value for key and output it
router.get('/api/key/:key/max', function(req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayMaxMin(
      arrayByKey(commits, req.params.key), 'max'
    );
    res.json(a);
  });
});

// get min. value for key and output it
router.get('/api/key/:key/min', function(req, res, next) {
  Commit.find(function (err, commits) {
    if (err) return next(err);
    var a = arrayMaxMin(
      arrayByKey(commits, req.params.key), 'min'
    );
    res.json(a);
  });
});

///////////////////////////////////
//// CRUD Operations - Commit /////
///////////////////////////////////

// get one commit
router.get('/api/:id', function(req, res, next) {
  Commit.findOne({ _id: req.params.id}, function(err, commit) {
    if (err) return next(err);
    res.json(commit);
  });
});

// add commit
router.post('/api', function(req, res, next) {
  var commit = new Commit(req.body);

  commit.save(function(err) {
    if (err) return next(err);
    res.send({ message: 'Commit Added' });
  });
});

// update commit
router.put('/api/:id', function(req, res, next) {
  Commit.findOne({ _id: req.params.id }, function(err, commit) {
    if (err) return next(err);

    for (prop in req.body) {
      commit[prop] = req.body[prop];
    }

    // save the commit
    commit.save(function(err) {
      if (err) return next(err);

      res.json({ message: 'Commit updated!' });
    });
  });
});

// delete commit
router.delete('/api/:id', function(req, res, next) {
  Commit.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err) return next(err);

    res.json({ message: 'Successfully deleted' });
  });
});
