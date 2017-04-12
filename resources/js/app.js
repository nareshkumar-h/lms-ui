
var app = angular.module('lmsApp', ['ngResource', 'datatables', 'ui.router', 'ngCookies', 'ngMaterial', 'ngMessages']);

app.run(function ($rootScope, $state, authService, $cookies, $http) {
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        authService.setAuth();
    }
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !authService.isAuthenticated()) {
            // User isn’t authenticated
            $state.transitionTo("login");
            event.preventDefault();
            console.log(authService.isAuthenticated());
        }
    });
});

app.directive('access',
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var roles = attrs.access;

                if (roles === "admin") {
                    element.removeClass('hide');
                } else {
                    element.addClass('hide');
                }

            }
        };
    });


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
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
            controller: 'dashboardController as ctrl',
            authenticate: true
        })
        .state('history', {
            url: '/history',
            templateUrl: 'leavehistory.html',
            controller: 'leaveHistoryController as ctrl',
            authenticate: true
        })
        .state('employee/create', {
            url: '/employee/create',
            templateUrl: 'create.html',
            controller: 'createController as ctrl',
            authenticate: true
        })
        .state('employee/edit', {
            url: '/employee/edit',
            templateUrl: 'edit.html',
            controller: 'editController as ctrl',
            authenticate: true
        })
        .state('teams', {
            url: '/teams',
            templateUrl: 'teams.html',
            authenticate: true
        })
        .state('requests', {
            url: '/requests',
            templateUrl: 'requests.html',
            authenticate: true
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController as ctrl',
            authenticate: false
        })

}]);
