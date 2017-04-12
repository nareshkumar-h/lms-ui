app.controller('loginController', ['$location', 'authService', function ($location,authService) {
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