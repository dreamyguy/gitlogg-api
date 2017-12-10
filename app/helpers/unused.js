/* jshint esversion: 6 */

// Get value of the object's first key
// ------------------------------------------------------------
exports.getValueOfFirstOrLastKey = function(obj, value, mode) {
  // do not use this if you expect your obj to change!
  // this was done this way because the obj was already sorted by unix timestamps
  var v;
  var last = obj.length - 1;
  if (mode == 'first') {
    v = obj[0][value];
  } else if (mode == 'last') {
    v = obj[last][value];
  } else {
    console.log('You have to specify a mode! first | last');
  }
  return v;
};
// var firstAuthor = getValueOfFirstOrLastKey(data, 'author_email', 'first');

// Order object by key
// ------------------------------------------------------------
exports.sortObjByKey = function(obj, key) {
  var objUnordered = obj;
  var objOrdered = {};
  Object.keys(objUnordered).sort().forEach(function(key) {
    objOrdered[key] = objUnordered[key];
  });
  return objOrdered;
};

// Objects used to be compared to while sorting
// ------------------------------------------------------------
exports.sorterWeekday = {
  'Mon': 1,
  'Tue': 2,
  'Wed': 3,
  'Thu': 4,
  'Fri': 5,
  'Sat': 6,
  'Sun': 7
};
exports.sorterMonthName = {
  'Jan': 1,
  'Feb': 2,
  'Mar': 3,
  'Apr': 4,
  'May': 5,
  'Jun': 6,
  'Jul': 7,
  'Aug': 8,
  'Sep': 9,
  'Oct': 10,
  'Nov': 11,
  'Dec': 12
};

// Order object by key with the help of sorter
// ------------------------------------------------------------
exports.sortObjByKeyWithSorter = function(obj, sorter) {
  var tmp = [];
  Object.keys(obj).forEach(function(key) {
    var value = obj[key];
    var index = sorter[key];
    tmp[index] = {
      key: key,
      value: value
    };
  });
  var orderedData = {};
  tmp.forEach(function(obj) {
    orderedData[obj.key] = obj.value;
  });
  return orderedData;
};

// Group by time period - Commits by day | week | month | year
// ------------------------------------------------------------
exports.groupByTimePeriod = function (data, period) {
  var objPeriod = {};
  var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  for (var i = 0; i < data.length; i++) {
    var d = new Date(data[i].author_date_unix_timestamp * 1000);
    if (period == 'day') {
      d = Math.floor(d.getTime() / oneDay);
    } else if (period == 'week') {
      d = Math.floor(d.getTime() / (oneDay * 7));
    } else if (period == 'month') {
      d = (d.getFullYear() - 1970) * 12 + d.getMonth();
    } else if (period == 'year') {
      d = d.getFullYear();
    } else {
      console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
    }
    // define object key
    objPeriod[d] = objPeriod[d] || [];
    objPeriod[d].push(data[i]);
  }
  return objPeriod;
};

// Group by time period - Commits by day | week | month | year
// ------------------------------------------------------------
exports.groupByTime = function (data, moment) {
  var objMoment = {};
  var t = '';
  for (var i = 0; i < data.length; i++) {
    if (moment == 'hour') {
      t = data[i].time_hour;
    } else if (moment == 'minutes') {
      t = data[i].time_minutes;
    } else if (moment == 'seconds') {
      t = data[i].time_seconds;
    } else if (moment == 'gmt') {
      t = data[i].time_gmt;
    } else if (moment == 'day-week') {
      t = data[i].date_day_week;
    } else if (moment == 'month-day') {
      t = data[i].date_month_day;
    } else if (moment == 'month-name') {
      t = data[i].date_month_name;
    } else if (moment == 'month-number') {
      t = data[i].date_month_number;
    } else if (moment == 'year') {
      t = data[i].date_year;
    } else if (moment == 'iso-8601') {
      t = data[i].date_iso_8601;
    } else {
      console.log('groupByTime: You have to set a time! hour | minutes | seconds | gmt | day_week | month_day | month_name | month_number | year | iso_8601');
    }
    // define object key
    objMoment[t] = objMoment[t] || [];
    objMoment[t].push(data[i]);
  }
  return objMoment;
};

// Create object array based on key and its value
// ------------------------------------------------------------
exports.arrayByKeyAndValue = function(data, key, val) {
  var arr = [];
  for (var i in data) {
    if (data[i][key] == val) {
      arr.push(data[i]);
    }
  }
  return arr;
};
// var weekMonday = arrayByKeyAndValue(datasrc, 'date_day_week', 'Mon');

// Create array based on values
// ------------------------------------------------------------
exports.arrayOfValues = function(data) {
  var arr = [];
  for (var i in data) {
    arr.push(data[i]);
  }
  return arr;
};

// Create array based on keys
// ------------------------------------------------------------
exports.arrayOfKeys = function(data) {
  var arr = [];
  for (var i in data.keys()) {
    arr.push(data[i]);
  }
  return arr;
};

// Create object array based on key
// ------------------------------------------------------------
exports.objByKey = function(data, key) {
  var obj = {};
  for (var i in data) {
    if (!obj.hasOwnProperty(data[i][key])) {
      obj[data[i][key]] = [];
    }
    obj[data[i][key]].push(data[i]);
  }
  return obj;
};
// var objRepository = objByKey(datasrc, 'repository');

// Create object array based on author
// ------------------------------------------------------------
exports.objByAuthors = function(data, author) {
  var obj = {};
  for (var i in data) {
    var a = data[i][author].match(/[^@]*/);
    if (!obj.hasOwnProperty(data[i][author])) {
      obj[data[i][author]] = [];
    }
    obj[data[i][author]].push(data[i]);
  }
  return obj;
};
// var objByAuthorsVar = objByAuthors(datasrc, 'author_email');

// Create array based on key value filtered by a value smaller than
// ------------------------------------------------------------
exports.arrayByKeyFilteredSmallerThan = function(data, key, value) {
  var arr = [];
  value = parseInt(value);
  for (var i in data) {
    if (data[i][key] < value) {
      arr.push(data[i][key]);
    }
  }
  return arr;
};
// var arrayImpactFilteredSmallerThan = arrayByKeyFilteredSmallerThan(data, 'impact', '1000');

// Create array based on key value, sorted
// ------------------------------------------------------------
exports.arrayByKeySorted = function(data, key) {
  var arr = [];
  for (var i in data) {
    arr.push(data[i][key]);
  }
  arr.sort(function(a, b) {
    return a - b;
  });
  return arr;
};

// Return number of items in an object's value
// ------------------------------------------------------------
exports.itemsValuesSum = function(obj) {
  var arr = [];
  for (var i in obj) {
    var sum = 0; // because sum is reset on each loop
    for (var y = 0; y < obj[i].length; y++) {
      sum += 1;
    }
    arr.push(sum);
  }
  return arr;
};
// var arrayTotalValue = itemsValueSum(data);

// Return average value based on number of items in an object
// ------------------------------------------------------------
exports.itemsAverage = function(data) {
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += parseInt(data[i]);
  }
  var avg = sum/data.length;
  return avg;
};

// Create array based on key values added to themselves
// ------------------------------------------------------------
exports.sumArray = function(data) {
  var sum = 0;
  var arr = [];
  for (var i in data) {
    sum += parseInt(data[i]);
    arr.push(sum);
    //console.log(sum);
  }
  return arr;
};
// var arrayImpactSum = sumArray(arrayImpact);

// Create array with year changes
// ------------------------------------------------------------
exports.arrayYearChanges = function(data, year) {
  var arr = [];
  for (var i in data) {
    var currentYear = data[i][year];
    var previousYear;
    if (previousYear != currentYear) {
      arr.push(data[i][year]);
    } else {
      arr.push('');
    }
    previousYear = data[i][year];
  }
  return arr;
};
// var arrayYearChangesVar = arrayYearChanges(data, 'date_year');

// var arrayAuthorsStatsVarAll = arrayAuthorsStats(data);
// console.log(arrayAuthorsStatsVarAll);
// var arrayAuthorsStatsVarAuthor = arrayAuthorsStats(data, 'author');
// var arrayAuthorsStatsVarCommits = arrayAuthorsStats(data, 'commits');
// var arrayAuthorsStatsVarImpact = arrayAuthorsStats(data, 'impact');
// var arrayAuthorsStatsVarWeekdays = arrayAuthorsStats(data, 'weekdays');
// var arrayAuthorsStatsVarDaysActive = arrayAuthorsStats(data, 'daysActive');
// var arrayAuthorsStatsVarDaysSinceFirstCommit = arrayAuthorsStats(data, 'daysSinceFirstCommit');
// var arrayAuthorsStatsVarDaysSinceLastCommit = arrayAuthorsStats(data, 'daysSinceLastCommit');
// var arrayAuthorsStatsVarCommitsPerDay = arrayAuthorsStats(data, 'commitsPerDay');
// var arrayAuthorsStatsVarCommitsPerDayYear = arrayAuthorsStats(data, 'commitsPerDayYear');
// var arrayAuthorsStatsVarCommitsPerDayNr = arrayAuthorsStats(data, 'commitsPerDayNr');

// Create array - commit nr each day
// ------------------------------------------------------------
exports.arrayOfExtractedCommitNrPerDay = function(data) {
  var arr = [];
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      for (var nr in data[i]) {
        if (data[i].hasOwnProperty(nr)) {
          //console.log(data[i][nr]);
          arr.push(data[i][nr]);
        }
      }
    }
  }
  return arr;
};
// var arrayOfExtractedCommitNrPerDayVar = arrayOfExtractedCommitNrPerDay(arrayAuthorsStatsVarCommitsPerDayNr);
// var arrayCommitPerDaySum = sumArray(arrayOfExtractedCommitNrPerDayVar);

// Create array - years vs commits to be used as graph labels
// ------------------------------------------------------------
exports.arrayOfExtractedYearsCommits = function(data) {
  var arr = [];
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      for (var y in data[i]) {
        if (data[i].hasOwnProperty(y)) {
          //console.log(data[i][y]);
          var z = data[i][y].toString().slice(0,4);
          var previousYear;
          var currentYear = z;
          if (previousYear != currentYear) {
            arr.push(z);
          } else {
            arr.push('');
          }
          previousYear = z;
        }
      }
    }
  }
  return arr;
};
// var arrayOfExtractedYearsCommitsVar = arrayOfExtractedYearsCommits(arrayAuthorsStatsVarCommitsPerDayYear);

// Some jazz
// ------------------------------------------------------------
// var arrayAuthorsStatsVarDaysActiveAverage = itemsAverage(arrayAuthorsStatsVarDaysActive);
// //console.log('The average number of active days of a single committer is ' + arrayAuthorsStatsVarDaysActiveAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarDaysActiveAverage / 365 + ' years');
// var arrayAuthorsStatsVarCommitsAverage = itemsAverage(arrayAuthorsStatsVarCommits);
// //console.log('The average number of commits by a single committer is ' + arrayAuthorsStatsVarCommitsAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarCommitsAverage / arrayAuthorsStatsVarDaysActiveAverage + ' a day');
// var arrayAuthorsStatsVarImpactAverage = itemsAverage(arrayAuthorsStatsVarImpact);
// //console.log('The average impact by a single committer is ' + arrayAuthorsStatsVarImpactAverage + ' lines of code');

// var arrayAuthorsStatsAuthorAndCommits = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarCommits);
// //console.log(arrayAuthorsStatsAuthorAndCommits);
// var arrayAuthorsStatsAuthorAndImpact = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarImpact);
// //console.log(arrayAuthorsStatsAuthorAndImpact);

// Create array of objects with authors and their impact
// ------------------------------------------------------------
exports.arrayAuthorImpact = function(data, author, impact) {
  var arr = [];
  for (var i in data) {
    var a = data[i][author].match(/[^@]*/);
    arr.push('{ "author":"' + a + '", "impact":"' + data[i][impact] + '"},');
  }
  return arr;
};
// var arrayAuthorImpactVar = arrayAuthorImpact(datasrc, 'author_email', 'impact');
