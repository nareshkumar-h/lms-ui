app.controller('loginController', ['$window','$location', 'authService', function ($window,$location,authService) {
    var self = this;

    self.login = login;

    (function initController() {
        // reset login status
        authService.ClearCredentials();
        
    })();

    function login() {
        console.log('Controller')
        authService.Login(self.username, self.password);
        
    }


}]);