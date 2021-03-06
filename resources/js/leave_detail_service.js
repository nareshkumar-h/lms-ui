app.factory('leaveService', ['$http', '$q', function ($http, $q) {


    var service = {};

    service.getLeaveForEmployee = getLeaveForEmployee;
    service.getRollLeaves = getRollLeaves;
    service.save = save;
    service.update = update;
    service.getRequests = getRequests;
    service.getBalance = getBalance;
    return service;

    function getBalance(id) {
        var deferred = $q.defer();
        $http.get(API + 'leavedetails/balance/' + id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while fetching the balance for the employee');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
    }

    function getRequests(id) {
        var deferred = $q.defer();
        $http.get(API + 'leavedetails/manager/' + id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while fetching the leaves for the manager');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;

    }

    function getRollLeaves(id) {

        var deferred = $q.defer();
        $http.get(API + 'leaveroles/' + id)
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

    function save(leaveDetail) {
        $http.post(API + 'leavedetails', leaveDetail).then(function (response) {
            console.log(response + '');
            alert('Request Saved.')
        });
    }
    function update(leaveDetail) {
        $http.put(API + 'leavedetails', leaveDetail).then(function (response) {
            console.log(response + '');
            alert('Updated sucessfully');
        });
    }

    function getLeaveForEmployee(id) {
        var deferred = $q.defer();
        $http.get(API + 'leavedetails/' + id)
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