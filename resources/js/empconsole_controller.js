app.controller('empConsoleController', ['$scope','$filter','$state','$http', '$rootScope','$uibModal', 'userService','shareDataService', function ($scope,$filter,$state,$http, $rootScope,$uibModal, userService,shareDataService) {

    var self = this;
    self.user = {};
    self.employees = [];

    initController();

    self.update = function (emp) {
        console.log("EM console self: " + name + " obj: " + JSON.stringify(emp));
        userService.Update(emp)
            .then(
            function () {
                console.log('Successfull updated');
                initController();
            },
            function (errResponse) {
                console.error('Error while updating User');
            }
            );
    }

self.openCreatePopup=function(){
    var modalInstance = $uibModal.open({
                  animation: 'true',
                  templateUrl: 'create_popup.html',
                  controller:'createController as ctrl'
            });
}

self.openReportPersonPopup=function(empId){
    shareDataService.setEId(empId);
    var modalInstance = $uibModal.open({
                  animation: 'true',
                  templateUrl: 'report_person_popup.html',
                  controller:'reportPersonController as ctrl'
            });
    modalInstance.result.then(function(){
     reloadState();
    })
}

    self.loadRoles = function () {
        $http.get(API + 'roles').then(function (response) {
            self.roles = response.data;
        });
    }

    self.deactivate = function (emp) {
        emp.active = false;
        self.update(emp);

    }

    self.activate = function (emp) {
        emp.active = true;
        self.update(emp);

    }


    self.checkName = function (data) {
        if (!(data.match(/^[a-zA-Z0-9. ]*$/))) {
            return "Name should contain only alpha numeric characters and spaces";
        }
    }



    self.checkMobile = function (data) {
        console.log(data.length);
        var l = data.length;
        if (l !== 10) {
            return "Mobile number should be of 10 digits";
        }

        if (isNaN(data)) {

            return "Enter a valid Mobile Number";
        }

    }
    function reloadState(){
        $state.reload();
    }

    function initController() {
        loadCurrentUser();
        fetchAllEmployees();

    }

    function fetchAllEmployees() {
        userService.GetAll2()
            .then(
            function (d) {
                self.employees = d;
                console.log(JSON.stringify(self.employees));
            },
            function (errResponse) {
                console.error('Error while fetching Users');
            }
            );
    }

    function loadCurrentUser() {
        self.user = $rootScope.globals.currentUser.object;
    }

  


}]);