app.controller('registrationController', ['userService', '$location', '$rootScope', function (userService, $location, $rootScope) {
    var self = this;
 
        self.register = register;
 
        function register() {
      
            userService.Create(self.user)
                .then(function (response) {
                    if (response.success) {
                      console.log('Registration successful');
                        $location.path('/login');
                    } else {
                       console.log('Registration Unsuccessful')
                    }
                });
        }
    

}]);