var app = require('angular').module('app');

app.controller('HomeCtrl', ['$scope', require('./home/HomeCtrl')]);
