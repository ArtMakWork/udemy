'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/script.js',
  output: {
    filename: 'script.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  
  
};