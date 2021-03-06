'use strict';

var path = require('path'),
    walk = require('fs-walk');

var entry = [];

walk.walkSync('test', function(basedir, filename, stat) {
    if (stat.isFile() && path.extname(filename) === '.js') {
        entry.push(path.join(basedir, filename).replace('test', '.'));
    }
});

module.exports = {
    context: path.join(__dirname, '../../test'),
    entry: entry,
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: 'kdbxweb.test.js',
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'jshint-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        root: [path.join(__dirname, '../../lib')]
    },
    resolveLoader: {
        root: [path.join(__dirname, '../../node_modules')]
    },
    node: {
        console: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },
    externals: {
        fs: true,
        path: true
    }
};
