// Create array based on key value filtered by a value greater than
// ------------------------------------------------------------
exports.arrayByKeyFilteredGreaterThan = function(data, key, value) {
    var arr = [];
    value = parseInt(value);
    for (var i in data) {
        if (data[i][key] > value) {
          arr.push(data[i][key]);
        }
    }
    return arr;
};
// var arrayImpactFilteredGreaterThan = arrayByKeyFilteredGreaterThan(data, 'impact', '1000');
