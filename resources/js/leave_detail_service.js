app.factory('leaveService',['$resource', function ($resource) {

	var URI='http://localhost:3000/leaveDetails:id';
   return $resource(
            URI, 
            {id: '@id'},
            {
                update: {
                      method: 'PUT' // To send the HTTP Put request when calling this custom update method.
                }
                 
            }
    );
	

}]);