app.controller('dashboardController', ['userService', '$rootScope', function (userService, $rootScope) {

    var self = this;

    self.user = null;
    initController();

    function initController() {
        loadCurrentUser();
    }

    function loadCurrentUser() {
        userService.GetByUsername($rootScope.globals.currentUser.username)
            .then(function (user) {
                self.user = user;
            });
    }

}]);