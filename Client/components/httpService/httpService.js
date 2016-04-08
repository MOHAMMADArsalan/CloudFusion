angular
      .module("HolidayCorporationApp")

      .service("HttpService",["$http", "$q", HttpService]);

      function HttpService($http, $q){
            var _self = this;

       _self.PostApi = function(url,body) {

             var deffered = $q.defer();

             $http.post(url,body).then(function(response){
                   deffered.resolve(response);
             },function(err){
                   deffered.reject(err)
             });

             return deffered.promise;
      };
      }
