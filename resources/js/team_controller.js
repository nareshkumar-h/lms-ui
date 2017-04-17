app.controller('teamController',['userService',function(userService){

var self = this;
    self.employees = [];
    self.employee={};
    self.manager={};
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
     
        console.log('Team save called');
        userService.UpdateTeam(self.employee.id,self.manager.id)
            .then(
            function(){
               alert('Successfully saved')
                initController();
            },
            function (errResponse) {
                alert('Error while saving');
            }
            );


    };

}]);