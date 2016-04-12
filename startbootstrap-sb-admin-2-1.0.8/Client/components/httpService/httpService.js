angular
      .module("CloudFusionControllerApp")

      .service("HttpService",["$http", "$q", HttpService]);

      function HttpService($http, $q){
            var _self = this;
      _self.AuthUser = function() {
            return isLoggedIn;
      }
       _self.PostApi = function(url,body) {

             var deffered = $q.defer();

             $http.post(url,body).then(function(response){
                   deffered.resolve(response);
             },function(err){
                   deffered.reject(err);
             });

             return deffered.promise;
      };
       _self.GetApi = function(url) {
             var token = localStorage.getItem("token");
             var deffered = $q.defer();
             _self.url = url + "?token=" + token;
             $http.get(_self.url).then(function(response){
                   deffered.resolve(response);
             },function(err){
                   deffered.reject(err);
             });

             return deffered.promise;
      };
}
