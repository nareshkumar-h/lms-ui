app.controller('editController', ['userService', '$http', function (userService, $http) {
    var self = this;
    self.employee = {};
    self.employees = [];
    $http.get(API + 'roles').then(function (response) {
        self.roles = response.data;
    });
    initController();

    function initController() {
        console.log('init');
        userService.GetAll()
            .then(
            function (d) {
                self.employees = d;
                console.log(JSON.stringify(self.employees));
            },
            function (errResponse) {
                console.error('Error while fetching Users');
            }
            );

    };
    self.save = function () {
        self.employee.role.createdDate = null;
        self.employee.role.modifiedDate = null;
        self.employee.createdDate=null;
        self.employee.modifiedDate=null;
        console.log('save called');
        console.log(JSON.stringify(self.employee));
        userService.Update(self.employee)
            .then(
            function(){
                console.log('Successfull updated');
                initController();
            },
            function (errResponse) {
                console.error('Error while updating User');
            }
            );


    };
    self.delete =function(){
            console.log('Delete');
            userService.Delete(self.employee.id)
            .then(
             function(){
                console.log('Successfull updated');
                initController();
            },
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    };

}]);