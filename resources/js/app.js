
var app = angular.module('lmsApp', ['ngResource', 'datatables', 'ui.router', 'ngCookies']);

app.run(function ($rootScope, $state,authService,$cookies,$http) {
    $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            authService.setAuth();
        }
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate &&!authService.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault();
        console.log(authService.isAuthenticated()); 
      }
    });
  });
  


app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/dashboard');
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
            controller:'dashboardController as ctrl',
            authenticate: true


        })


        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController as ctrl',
            authenticate: false
        })
         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'registrationController as ctrl',
            authenticate: false
        })
        
     
}]);
