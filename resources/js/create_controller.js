app.controller('createController', ['$http', 'userService','$uibModalInstance', function ($http, userService,$uibModalInstance) {

    var self = this;
    self.employee = {};
    $http.get(API + 'roles').then(function (response) {
        self.roles = response.data;
    });
    self.cancel=function(){
         $uibModalInstance.dismiss('cancel');
    }
    self.save = function () {
        console.log('save called');
        console.log(JSON.stringify(self.employee));
        userService.Create(self.employee);


    };

}]);