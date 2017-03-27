
var app = angular.module('lmsApp', ['ngResource', 'datatables', 'ui.router', 'ngCookies']);

app.run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && true){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
  });

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/login');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('holidaymaster', {
            url: '/holidaymaster',
            templateUrl: 'holidays.html',
            controller: 'holidayController as ctrl',
            authenticate: false
        })


        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            authenticate: true


        })


        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            authenticate: false
        })
        
     
}]);
