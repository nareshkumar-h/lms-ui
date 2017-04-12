app.factory('userService', ['$timeout', '$filter', '$q', '$http', function ($timeout, $filter, $q, $http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
   // service.GetByUsername = GetByUsername;
    service.Create = Create;
   // service.Createlocal=Createlocal;
    service.Update = Update;
    service.Delete = Delete;

    return service;


    function GetAll() {

        var deferred = $q.defer();
        $http.get(API + 'employees')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
    }

    function GetById(id) {
        var deferred = $q.defer();
         $http.get(API + 'employees/'+id)
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

    /*function GetByUsername(username) {
        console.log('get- user service');
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), { username: username });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    }*/

     /*function Createlocal(user) {
         var deferred = $q.defer();
 
         // simulate api call with $timeout
         $timeout(function () {
             GetByUsername(user.username)
                 .then(function (duplicateUser) {
                     if (duplicateUser !== null) {
                         deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                     } else {
                         var users = getUsers();
 
                         // assign id
                         var lastUser = users[users.length - 1] || { id: 0 };
                         user.id = lastUser.id + 1;
 
                         // save to local storage
                         users.push(user);
                         setUsers(users);
 
                         deferred.resolve({ success: true });
                     }
                 });
         }, 1000);
 
         return deferred.promise;
     }*/
    function Create(user) {

        $http.post(API + 'employees', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
        var deferred = $q.defer();
        $http.put(API + 'employees', user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;

    }

    function Delete(id) {
        var deferred = $q.defer();
        $http.delete(API + 'employees/' + id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (errResponse) {
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
            );
        return deferred.promise;
    }

    // private functions

    function getUsers() {
        if (!localStorage.users) {
            localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
        localStorage.users = JSON.stringify(users);
    }


}]);
/*

 
        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }*/


/*
      
 
       function Delete(id) {
           return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
       }*/

// private functions

function handleSuccess(res) {
    alert('Record Saved');
}

function handleError(error) {
    alert('Error in saving records.');
}