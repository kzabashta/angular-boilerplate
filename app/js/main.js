require('angular');
require('angular-ui-router');

var requires = [
  'ui.router',
  'templates'
];

window.app = angular.module('app', requires)

require('./templates');
require('./controllers');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'MainController as home',
    templateUrl: 'view1.html',
    title: 'Home'
  });
}]);

angular.bootstrap(document, ['app'], {
  strictDi: true
});