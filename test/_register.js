require("source-map-support").install();
require('babel-register')({
    // These patterns are relative to the project directory (where the `package.json` file lives):
    ignore: [
        'test/*',
        'node_modules'
    ]
});