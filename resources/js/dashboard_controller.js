app.controller('dashboardController', ['userService', '$rootScope', '$http', '$location', function (userService, $rootScope, $http, $location) {

    var self = this;
    self.leaveDetail ={};
    $http.get('data/leaveTypes.json').then(function (response) {
        console.log(JSON.stringify(response.data));
        self.leaveTypes = response.data;
    });
    var status = null;
    $http.get(API+'leavestatus/1').then(function (response) {
        console.log(JSON.stringify(response.data));
        status = response.data;
    })
    self.user = null;

    initController();

    function initController() {
        loadCurrentUser();
        self.leaveDetail.fromDate=new Date();

    }
    self.applyLeave = function () {

        self.leaveDetail.employee = self.user;
        self.leaveDetail.appliedDate = new Date();
        self.leaveDetail.toDate = new Date();
        self.leaveDetail.toDate = addSkippingWeekends(self.leaveDetail.fromDate, Math.ceil(self.leaveDetail.noOfDays));
        self.leaveDetail.status = status;
        console.log(self.leaveDetail);
        //leaveService.save(self.leaveDetail);
        console.log('Applied');
        $location.path('/history');
    }
    self.onlyWeekDaysPredicate = function (date) {
        var day = date.getDay();
        return !(day === 0 || day === 6);
    };

    function loadCurrentUser() {
        userService.GetByUsername($rootScope.globals.currentUser.username)
            .then(function (user) {
                self.user = user;
            });
    }

    function addSkippingWeekends(dateToAdd, noOfDaysToAdd) {
        addedDate = new Date();
        while ((noOfDaysToAdd - 1) != 0) {
            addedDate.setDate(dateToAdd.getDate() + 1);

            if ((addedDate.getDay() === 0) || (addedDate.getDay() === 6)) {

                noOfDaysToAdd++;
            }
           

            noOfDaysToAdd--;
     
            dateToAdd = addedDate;
            //console.log("inside loop");

        }
        //console.log(addedDate.toString());
        return addedDate;
    }

}]);