app.controller('reportPersonController', ['$rootScope','$location','userService', '$uibModalInstance', 'shareDataService', function ($rootScope,$location,userService, $uibModalInstance, shareDataService) {

    var self = this;
    self.managers = [];
    initController();
    function initController() {
        fetchAllManagers();
    }

    self.cancel = function () {

        $uibModalInstance.dismiss('cancel');
    }

    self.save = function (mid) {
        eid = shareDataService.getEId();
        if (eid === mid) {
            alert('You can not report to yoursef.')
        }
        else if (eid === $rootScope.globals.currentUser.object.id) {
            alert('You can not change your own reporting person. Contact some other authorized user.')
        }
        else {
            console.log('Report person save called');
            userService.UpdateTeam(eid,mid)
                .then(
                function () {
                    alert('Successfully saved')
                    initController();
                },
                function (errResponse) {
                    alert('Error while saving');
                }
                );

        }
        $uibModalInstance.close();
        
    }

    function fetchAllManagers() {
        userService.GetManagers()
            .then(
            function (d) {
                self.managers = d;
                //console.log(JSON.stringify(self.managers));
            },
            function (errResponse) {
                alert('Error while fetching Users');
            }
            );
    }

}]);