var fs = require('fs')
fs.readdir("./", function(err, files) {
    for (var x in files) {
        var y = files[x];
        console.log(x, y, y.substr(-4));
        if (y.substr(-4) === ".css") {
            fs.rename(y, "highlight-" + y, function(err) {})
        }
    }
})