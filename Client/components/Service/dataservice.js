angular.module("CloudFusionControllerApp")

.service("DataService", ["mainRef", "HttpService", "$firebaseArray",
  DataService
]);

function DataService(mainRef, HttpService, $firebaseArray) {

  var _self = this;
  _self.AllFranchice;
  _self.AllFranchiceName;
  _self.AllMembers;
  _self.mainRef = new Firebase(mainRef);
  _self.allUser = function() {
      _self.Users = $firebaseArray(_self.mainRef.child("users"));
      return _self.Users;
    }
    // HttpService.GetApi("/router/franchiseName")
    //   .then(function(res) {
    //     _self.AllFranchiceName = res.data;
    //     console.log(_self.AllFranchiceName)
    //   }, function(err) {
    //     console.log(err);
    //   });
    // HttpService.GetApi("/router/getRole")
    //   .then(function(res) {
    //     _self.Roles = res.data;
    //   }, function(err) {
    //     console.log(err);
    //   });
    //
    // HttpService.GetApi("/router/getmember")
    //   .then(function(res) {
    //     console.log(res.data)
    //     _self.AllMembers = res.data;
    //   }, function(err) {
    //     console.log(err);
    //   });
    // HttpService.GetApi("/router/getFranchises")
    //   .then(function(res) {
    //     _self.AllFranchice = res.data;
    //   }, function(err) {
    //     console.log(err);
    //   });
    //
    //
    //
    // _self.getFranchises = function() {
    //   return _self.AllFranchice;
    // }
    // _self.getRoles = function() {
    //   return _self.Roles;
    // }
    // _self.getFranchiseName = function() {
    //   console.log(_self.AllFranchiceName)
    //   return _self.AllFranchiceName;
    // }
    // _self.getmember = function() {
    //   return _self.AllMembers;
    // }
}
