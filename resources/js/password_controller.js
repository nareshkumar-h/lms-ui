app.controller('passController',['userService','$rootScope',function(userService,$rootScope){

var self = this;
initController();

function initController(){
    self.user=$rootScope.globals.currentUser.object;
}

    self.update = function () {
        if(self.newPassword===self.confirmPassword)
        {
        console.log('Password Change called');
        userService.UpdatePassword(self.user.emailId,self.oldPassword,self.newPassword)
            .then(
            function(){
                initController();
            },
            function (errResponse) {
                
            }
            );
        }
        else
        {
            alert('Passwords do not match!');
        }

    };

}]);