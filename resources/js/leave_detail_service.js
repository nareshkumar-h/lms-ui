app.factory('leaveService',['$http','$q', function ($http,$q) {


	  var service = {};

    service.getLeaveForEmployee=getLeaveForEmployee;
    service.getRollLeaves=getRollLeaves;
    service.save=save;

    return service;

    function getRollLeaves(id){
        
         var deferred = $q.defer();
         $http.get(API+'leaveroles/'+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while fetching the leaves for the role');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
    }

    function save(leaveDetail){
        $http.post(API + 'leavedetails', leaveDetail).then(function(response){
            console.log(response+'');
        });
    }

        function getLeaveForEmployee(id) {
        var deferred = $q.defer();
         $http.get(API + 'leavedetails/'+id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while fetching the leaves');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
      
    }

}]);