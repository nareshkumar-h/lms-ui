app.controller('passController',['userService','$rootScope',function(userService,$rootScope){

var self = this;
initController();

function initController(){
    self.user=$rootScope.globals.currentUser.object;
}

    self.update = function () {
     
        console.log('Password Change called');
        userService.UpdatePassword(self.user.emailId,self.oldPassword,self.newPassword)
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