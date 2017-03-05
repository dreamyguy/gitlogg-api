// Merge two arrays of identical length
// ------------------------------------------------------------
exports.arraysMerge = function(keys, values) {
    var obj = {};
    for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
};
