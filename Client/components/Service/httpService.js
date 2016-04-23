angular
  .module("CloudFusionControllerApp")

.service("HttpService", ["$http", "$q", "$cookies", "$cookieStore", "$window",
  HttpService
]);

function HttpService($http, $q, $cookies, $cookieStore, $window) {
  var _self = this;
  _self.AllMembers = []

  _self.AuthUser = function() {
    return isLoggedIn;
  }
  _self.PostApi = function(url, body) {
    var deffered = $q.defer();
    var token = $cookieStore.get("cloudToken");
    // _self.url = url + "?token=" + token;
    $http.post(url, body).then(function(response) {
      deffered.resolve(response);
      _self.AllMembers.push(body);
    }, function(err) {
      deffered.reject(err);
    });

    return deffered.promise;
  };
  _self.DeleteApi = function(url) {

    var deffered = $q.defer();
    $http.delete(url).then(function(response) {
      deffered.resolve(response);
    }, function(err) {
      deffered.reject(err);
    });

    return deffered.promise;
  };
  _self.GetApi = function(url) {
    var token = localStorage.getItem("token");
    var deffered = $q.defer();
    _self.url = url + "?token=" + token;
    $http.get(_self.url).then(function(response) {
      deffered.resolve(response);
    }, function(err) {
      deffered.reject(err);
    });

    return deffered.promise;
  };

  _self.getMember = function() {
    return _self.AllMembers;
  }
}
