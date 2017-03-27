/**
 * 
 */
app.factory('holidayService',['$resource', function ($resource) {
	var URI='https://api.myjson.com/bins/18p3nb/:id';
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