app.controller('requestsController', ['leaveService','$rootScope', function (leaveService,$rootScope) {

    var self = this;
    initController();
    function initController() {
        loadCurrentUser();
        fetchAllRequests();

    }
    self.checkStatus=function(leaveDetail){
        return (leaveDetail.status.status==='APPLIED')
    }
    self.approve=function(leaveDetail){
        leaveDetail.status.id=2;
        leaveDetail.modifiedBy.id=self.user.id;
        leaveService.update(leaveDetail);
        fetchAllRequests();
    }
      self.reject=function(leaveDetail){
        leaveDetail.status.id=3;
        leaveDetail.modifiedBy.id=self.user.id;
        leaveService.update(leaveDetail);
        fetchAllRequests();
    }

    function fetchAllRequests() {
        leaveService.getRequests(self.user.id).then(function (d) {
            self.empLeaveDetails = d;
            console.log(JSON.stringify(self.empLeaveDetails));
        });
    };

    function loadCurrentUser() {
        self.user = $rootScope.globals.currentUser.object;
    }


}]);