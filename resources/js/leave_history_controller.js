app
    .controller(
    'leaveHistoryController',
    [
        'leaveService', '$http', 'userService', '$rootScope', '$location','$timeout',
        function (leaveService, $http, userService, $rootScope, $location,$timeout) {
            var self = this;
            self.leaveDetails = [];
            self.cancelCheck = function (leaveDetail) {
                console.log("leave history controller " + JSON.stringify(leaveDetail));
                console.log(leaveDetail.toDate);
                var str = leaveDetail.toDate.split('/');
                console.log(str);
                var temp = new Date();
                temp.setDate(str[0]);
                temp.setMonth(str[1] - 1);
                temp.setFullYear(str[2]);
                console.log(temp.toDateString());
                today = new Date();
                console.log(temp >= today);
                /*dateIndex=new Date().getDate();
                if(dateIndex<10){dateIndex='0'+dateIndex;}
                monthIndex=new Date().getMonth()+1;
                if(monthIndex<10){monthIndex='0'+monthIndex;}
                yearIndex=new Date().getFullYear();
                console.log(dateIndex+'/'+monthIndex+'/'+yearIndex);*/
                return (leaveDetail.status.status === "APPLIED" && temp >= today);
            }
            self.cancel = function (leaveDetail) {
                leaveDetail.status.id = 4;
                leaveDetail.modifiedBy = self.user;
                leaveService.update(leaveDetail);
                fetchAllLeaveDetails();
            

            }

            function fetchAllLeaveDetails() {
                $timeout(function(){leaveService.getLeaveForEmployee(self.user.id).then(function (d) {
                    self.leaveDetails = d;
                });},500);
            }
            
                initController();
                function initController() {
                    loadCurrentUser();
                    fetchAllLeaveDetails();

                }

          

                function loadCurrentUser() {
                    self.user = $rootScope.globals.currentUser.object;
                }



            }]);