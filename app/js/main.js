require('angular');
require('angular-ui-router');

var requires = [
  'ui.router',
  'templates'
];

window.app = angular.module('app', requires);

require('./templates');
require('./controllers');

app.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  });
}]);

angular.module('app').run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    $rootScope.pageTitle = '';
    if (toState.title) {
      $rootScope.pageTitle = toState.title;
    }
  });
}]);

angular.bootstrap(document, ['app'], {
  strictDi: true
});