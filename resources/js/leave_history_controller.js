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
                leaveService.getLeaveForEmployee(self.user.id).then(function (d) {
                    self.leaveDetails = d;
                    console.log(JSON.stringify(self.leaveDetails));
                });
            };

            function loadCurrentUser() {
               self.user=$rootScope.globals.currentUser.object;
            }
          


        }]);