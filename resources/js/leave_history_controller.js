app
    .controller(
    'leaveHistoryController',
    [
        'leaveService', '$http', 'userService','$rootScope',
        function (leaveService, $http, userService,$rootScope) {
            var self = this;
            self.leaveDetails = [];
            initController();
            function initController() {
                loadCurrentUser();
                fetchAllLeaveDetails();

            }

            function fetchAllLeaveDetails() {
                $http.get('http://localhost:3000/leaveDetails').then(function (response) {
                    self.leaveDetails = response.data;
                    console.log(JSON.stringify(self.leaveDetails));
                });
            };

            function loadCurrentUser() {
                userService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        self.user = user;
                    });
            }
          


        }]);