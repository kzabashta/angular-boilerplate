module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  });
};