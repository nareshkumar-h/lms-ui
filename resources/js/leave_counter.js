app.factory('leaveCounter',['leaveService','$rootScope',function(leaveService,$rootScope){

var service={};
service.count=count;
return service;
function count(){
        var  leaveForEmployeeRole={};
        var leavesRemaining={};
        var leaves=[];
        var user=$rootScope.globals.currentUser.object;
        var noOfSickLeaves=0;
        var noOfCasualLeaves=0;
        var noOfPaidLeaves=0;
        var noOfPaternityLeaves=0;
        var noOfMaternityLeaves=0;
        var noOfPrivilegedLeaves=0;
        leaveService.getRollLeaves(user.role.id).then(function(d){
            leaveForEmployeeRole=d;
        })
        leaveService.getLeaveForEmployee(user.id).then(function(ld){
            leaves=ld;
        })

        for(leave in leaves)
        {
            if(leave.leaveType.type==="Casual leave"){
                noOfCasualLeaves++;
            }
            if(leave.leaveType.type==="Sick leave"){
                noOfSickLeaves++;
            }
             if(leave.leaveType.type==="Paid Leave"){
                noOfPaidLeaves++;
            }
             if(leave.leaveType.type==="Maternity Leave"){
                noOfMaternityLeaves++;
            }
             if(leave.leaveType.type==="Paternity Leave"){
                noOfPaternityLeaves++;
            }
             if(leave.leaveType.type==="Privileged Leave"){
                noOfPrivilegedLeaves++;
            }
        }

        leavesRemaining.casual=leaveForEmployeeRole.casual_leave-noOfCasualLeaves;
        leavesRemaining.sick=leaveForEmployeeRole.sick_leave-noOfSickLeaves;
        leavesRemaining.paid=leaveForEmployeeRole.paid_leave-noOfPaidLeaves;
        leavesRemaining.pat=leaveForEmployeeRole.paternity_leave-noOfPaternityLeaves;
        leavesRemaining.mat=leaveForEmployeeRole.maternity_leave-noOfMaternityLeaves;
        leavesRemaining.priv=leaveForEmployeeRole.privileged_leave-noOfPrivilegedLeaves;

        console.log('Remaining:'+JSON.stringify(leavesRemaining));
}

}]);