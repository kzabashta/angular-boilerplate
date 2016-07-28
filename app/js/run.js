module.exports = function($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    $rootScope.pageTitle = '';
    if (toState.title) {
      $rootScope.pageTitle = toState.title;
    }
  });
};