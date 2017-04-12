app.factory('leaveService',['$http','$q', function ($http,$q) {


	  var service = {};

    service.getLeaveForEmployee=getLeaveForEmployee;
    service.save=save;

    return service;

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
                console.error('Error while fetching the user');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
      
    }

}]);