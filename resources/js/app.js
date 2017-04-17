
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
        if (toState.permission && toState.permission === "type1") {
            console.log("permission called" + toState.permission);
            level = $rootScope.globals.currentUser.level;
            if (level === "Default" || level === "Level1" || level === "Level2") {
                //do nothing
            }
            else {
                event.preventDefault();
            }

        }
        if (toState.permission && toState.permission === "type2") {
            console.log("permission called" + toState.permission);
            level = $rootScope.globals.currentUser.level;
            if (level === "Level2" || level === "System") {
                //do nothing
            }
            else {
                event.preventDefault();
            }

        }
        if (toState.permission && toState.permission === "type3") {
            console.log("permission called" + toState.permission);
            level = $rootScope.globals.currentUser.level;
            if (level === "Level1" || level === "Level2") {

            }
            else {
                event.preventDefault();
            }

        }
    });
});

app.directive('access', ['$rootScope', 'authService',
    function ($rootScope, authService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var group = attrs.access;
                console.log(group);
                if (authService.isAuthenticated()) {
                    if (group === "group1") {
                        if ($rootScope.globals.currentUser.level === "Default" || $rootScope.globals.currentUser.level === "Level1" || $rootScope.globals.currentUser.level === "Level2") {
                            console.log("inside group1");
                            element.removeClass('hide');
                        }
                        else { element.addClass('hide'); }

                    }

                    if (group === "group2") {
                        if ($rootScope.globals.currentUser.level === "Level2" || $rootScope.globals.currentUser.level === "System") {
                            console.log("inside group2");
                            element.removeClass('hide');
                        }
                        else { element.addClass('hide'); }

                    }

                    if (group === "group3") {
                        if ($rootScope.globals.currentUser.level === "Level1" || $rootScope.globals.currentUser.level === "Level2") {
                            console.log("inside group2");
                            element.removeClass('hide');
                        }
                        else { element.addClass('hide'); }
                    }

                }
                else {
                    console.log("inside not authenticated");
                    element.addClass('hide');
                }

            }

        };
    }]);


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
            authenticate: true,
            permission: "type1"//type1
        })
        .state('history', {
            url: '/history',
            templateUrl: 'leavehistory.html',
            controller: 'leaveHistoryController as ctrl',
            authenticate: true,
            permission: "type1"//type1
        })
        .state('employee/create', {
            url: '/employee/create',
            templateUrl: 'create.html',
            controller: 'createController as ctrl',
            authenticate: true,
            permission: "type2"//type2
        })
        .state('employee/edit', {
            url: '/employee/edit',
            templateUrl: 'edit.html',
            controller: 'editController as ctrl',
            authenticate: true,
            permission: "type2"//type2
        })
        .state('teams', {
            url: '/teams',
            templateUrl: 'teams.html',
            controller: 'teamController as ctrl',
            authenticate: true,
            permission: "type2"//type2
        })
        .state('requests', {
            url: '/requests',
            templateUrl: 'requests.html',
            controller: 'requestsController as ctrl',
            authenticate: true,
            permission: "type3"//type3
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController as ctrl',
            authenticate: false
        })

}]);
