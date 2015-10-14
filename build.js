var fs = require('fs'),
    exec = require('child_process').exec;

fs.readdir('stylus', function(err, files) {
    for(i in files) {
        if(files[i].match(/\.styl$/)) {
            doStylus(files[i]);
        }
    }
});

function doStylus(file){
    var out = file.match(/(.*)\.styl$/)[1];
    exec('node ./node_modules/stylus/bin/stylus stylus/' + file + ' -o css/' + out + '.css');
    exec('node ./node_modules/stylus/bin/stylus -c stylus/' + file + ' -o css/' + out + '.min.css');
}


