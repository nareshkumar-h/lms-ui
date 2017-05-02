app.factory('shareDataService',[function(){

    var eid;
    var service={}

    service.setEId=setEId;
    service.getEId=getEId;

    return service;

    function setEId(id){
        eid=id;
    }

    function getEId(){
        return eid;
    }


}]);