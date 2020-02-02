const path               = require('path');
module.exports = {
    entry: {
        lib1:       './public/lib/auction.js',
        lib2:       './public/lib/main.js',
        lib3:       './public/lib/paintings.js',
        lib4:       './public/lib/participants.js',
    },
    output: {
        path:     path.join(__dirname, '/public'),
        filename: './[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    }
};
