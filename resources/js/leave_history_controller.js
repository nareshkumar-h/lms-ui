app
    .controller(
    'leaveHistoryController',
    [
        'leaveService', '$http', 'userService','$rootScope','$location',
        function (leaveService, $http, userService,$rootScope,$location) {
            var self = this;
            self.leaveDetails = [];
            self.cancelCheck=function(leaveDetail){
                console.log("leave history controller "+JSON.stringify(leaveDetail));
                console.log(leaveDetail.toDate);
                var str=leaveDetail.toDate.split('/');
                console.log(str);
                var temp=new Date();
                temp.setDate(str[0]);
                temp.setMonth(str[1]-1);
                temp.setFullYear(str[2]);
                console.log(temp.toDateString());
                today=new Date();
                console.log(temp>=today);
                /*dateIndex=new Date().getDate();
                if(dateIndex<10){dateIndex='0'+dateIndex;}
                monthIndex=new Date().getMonth()+1;
                if(monthIndex<10){monthIndex='0'+monthIndex;}
                yearIndex=new Date().getFullYear();
                console.log(dateIndex+'/'+monthIndex+'/'+yearIndex);*/
                return (leaveDetail.status.status==="APPLIED"&&temp>=today);
            }
            self.cancel=function(leaveDetail){
                console.log("cancel leave ")
                leaveDetail.status.id=4;
                leaveDetail.modifiedBy=self.user;
                leaveService.update(leaveDetail);
                fetchAllLeaveDetails();

            }
            initController();
            function initController() {
                loadCurrentUser();
                fetchAllLeaveDetails();

            }

            function fetchAllLeaveDetails() {
                leaveService.getLeaveForEmployee(self.user.id).then(function (d) {
                    self.leaveDetails = d;
                    console.log(JSON.stringify(self.leaveDetails));
                });
            };

            function loadCurrentUser() {
               self.user=$rootScope.globals.currentUser.object;
            }
          


        }]);