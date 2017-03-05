// Create array based on key value
// ------------------------------------------------------------
exports.arrayByKey = function(data, key) {
  var arr = [];
  for (var i in data) {
    if (data[i][key] === undefined) {
      data[i][key] = '0';
    }
    arr.push(data[i][key]);
  }
  return arr;
};
// var arrayImpact = arrayByKey(data, 'impact');
