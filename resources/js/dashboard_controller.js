app.controller('dashboardController', ['leaveService', 'userService', '$rootScope', '$http', '$location', function (leaveService, userService, $rootScope, $http, $location) {

    var self = this;
    self.m = false;
    self.f = false;
    self.leaveDetail = {};
    self.balance = {};
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
        if (self.user.gender === "M") {
            self.m = true;
            $http.get('data/leaveTypesM.json').then(function (response) {
                console.log(JSON.stringify(response.data));
                self.leaveTypes = response.data;
            });
        }
        else {
            self.f = true;
            $http.get('data/leaveTypesF.json').then(function (response) {
                console.log(JSON.stringify(response.data));
                self.leaveTypes = response.data;
            });
        }
        leaveService.getBalance(self.user.id).then(function (d) {
            self.balance = d;
        })
    }
    self.applyLeave = function () {


        self.leaveDetail.employee = self.user;
        self.leaveDetail.appliedDate = convertDate(new Date());
        self.leaveDetail.toDate = new Date();
        self.leaveDetail.toDate = addSkippingWeekends(self.leaveDetail.fromDate, Math.ceil(self.leaveDetail.noOfDays));
        self.leaveDetail.toDate = convertDate(self.leaveDetail.toDate);
        self.leaveDetail.fromDate = convertDate(self.leaveDetail.fromDate);
        self.leaveDetail.status = status;
        console.log(self.leaveDetail);
        leaveService.save(self.leaveDetail);
        console.log('Applied');
        $location.path('/main/history');
    }
    self.onlyWeekDaysPredicate = function (date) {
        var day = date.getDay();
        return !(day === 0 || day === 6 || isHoliday(date));
    };
    function isHoliday(date) {
        dateStr = convertDate(date);
        return (dateStr === "13/1/2017" || dateStr === "26/1/2017" || dateStr === "14/4/2017" || dateStr === "1/5/2017" || dateStr === "15/8/2017" || dateStr === "25/8/2017" || dateStr === "29/9/2017" || dateStr === "2/10/2017" || dateStr === "18/10/2017" || dateStr === "25/12/2017")

    }
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
        addedDate.setMonth(dateToAdd.getMonth());
        addedDate.setFullYear(dateToAdd.getFullYear());
        while ((noOfDaysToAdd - 1) != 0) {
            addedDate.setDate(dateToAdd.getDate() + 1);

            if ((addedDate.getDay() === 0) || (addedDate.getDay() === 6)||isHoliday(addedDate)) {

                noOfDaysToAdd++;
            }


            noOfDaysToAdd--;

            dateToAdd = addedDate;
            //console.log("inside loop");

        }
        //console.log(addedDate.toString());
        return addedDate;
    }
    function convertDate(date) {
        var monthIndex = date.getMonth();
        monthIndex += 1;
        var str = date.getDate() + '/' + monthIndex + '/' + date.getFullYear();
        return str;
    }

}]);