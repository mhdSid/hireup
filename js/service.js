
angular.module('CouchDB0', ['ngResource']).factory('ProjectCouch0', function($resource, $routeParams) 
{
  
  //name and email view
  var ProjectCouch0 = $resource(':protocol//:server/:db/:q', 
    {protocol: 'http:', server: 'localhost:5984', db:'hireapp'}, {update: {method:'PUT'} }
   ); 

  //Just for Posting
  //var ProjectCouch = $resource(':protocol//:server/:db/:q/:r', 
    //{protocol: 'http:', server: 'localhost:5984', db:'hireapp', q:'6888f27aae4a3186d2cfac001e00172a', r:'all.json'}, {update: {method:'GET'} }
   //); 



   ProjectCouch0.prototype.update = function(cb) 
   {
      //alert(this.email);
      return ProjectCouch0.update({q: this._id, rev: this._rev}, this, cb);
   };

  ProjectCouch0.prototype.destroy = function(cb) 
  {
      return ProjectCouch0.remove({q: this._id, rev: this._rev}, cb);
  };

  ProjectCouch0.prototype.get = function(cb) 
  {
      return ProjectCouch0.get({q: this._id, rev: this._rev}, cb);
       //return ProjectCouch0.get(null, cb); //for the view
  };
  
    return ProjectCouch0;

});



angular.module('CouchDB', ['ngResource']).factory('ProjectCouch', function($resource) 
{
  return $resource(':protocol//:server/:db/:d/:v', {protocol: 'http:', server: 'localhost:5984', db:'hireapp', d:'config', v:'all.json'}, {}, {
    query: { method: "GET" }
  });
});



angular.module('CouchDB1', ['ngResource']).factory('ProjectCouch1', function($resource) 
{
  return $resource(':protocol//:server/:db/:d/:v', {protocol: 'http:', server: 'localhost:5984', db:'hireapp'}, {}, 
  {  query: { method: "POST" }
  });
});



angular.module('CouchDB3', ['ngResource']).factory('viewGetter', function($resource) 
{
  
  var viewGetter= $resource(':protocol//:server/:db/:d/:v/:vv/:us', 
    {protocol: 'http:', server: 'localhost:5984', db:'hireapp', d:'_design', v:'view', vv:'_view', us:'userIDS'}, {update: {method:'PUT'} }
   ); 

  viewGetter.prototype.get = function(cb) 
  {
       return viewGetter.get(null, cb); //for the view
  };
  
    return viewGetter;

});


angular.module('CouchDB4', ['ngResource']).factory('updateUser', function($resource) 
{
  return $resource(':protocol//:server/:db/:id', {protocol: 'http:', server: 'localhost:5984', db:'hireapp'}, {}, 
  {  query: { method: "PUT" }
  });

});



