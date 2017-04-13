app.controller('dashboardController', ['leaveService','leaveCounter','userService', '$rootScope', '$http', '$location', function (leaveService,leaveCounter,userService, $rootScope, $http, $location) {

    var self = this;
    self.m=false;
    self.f=false;
    self.leaveDetail = {};
    $http.get('data/leaveTypes.json').then(function (response) {
        console.log(JSON.stringify(response.data));
        self.leaveTypes = response.data;
    });
    var status = null;
    $http.get(API + 'leavestatus/1').then(function (response) {
        console.log(JSON.stringify(response.data));
        status = response.data;
    })
    self.user = null;

    initController();

    function initController() {
        loadCurrentUser();
        self.leaveDetail.fromDate = new Date();
        if(self.user.gender==="M")
        {
           self.m=true;
        }
        else{
            self.f=true;
        }
        leaveCounter.count();
        leaveService.getRollLeaves(self.user.role.id).then(function(d){
            self.leaveForEmployeeRole=d;
        })
    }
    self.applyLeave = function () {

        self.leaveDetail.employee = self.user;
        self.leaveDetail.appliedDate = convertDate(new Date());
        self.leaveDetail.toDate = new Date();
        self.leaveDetail.toDate = addSkippingWeekends(self.leaveDetail.fromDate, Math.ceil(self.leaveDetail.noOfDays));
        self.leaveDetail.toDate=convertDate(self.leaveDetail.toDate);
        self.leaveDetail.fromDate=convertDate(self.leaveDetail.fromDate);
        self.leaveDetail.status = status;
        console.log(self.leaveDetail);
        leaveService.save(self.leaveDetail);
        console.log('Applied');
        $location.path('/history');
    }
    self.onlyWeekDaysPredicate = function (date) {
        var day = date.getDay();
        return !(day === 0 || day === 6);
    };

    function loadCurrentUser() {
        /* userService.GetByUsername($rootScope.globals.currentUser.username)
             .then(function (user) {
                 self.user = user;
             });*/
        self.user = $rootScope.globals.currentUser.object;
        console.log(JSON.stringify(self.user));
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
    function convertDate(date){
        var monthIndex=date.getMonth();
        monthIndex+=1;
        var str=date.getDate()+'-'+monthIndex+'-'+date.getFullYear();
        return str;
    }

}]);