angular.module("CloudFusionControllerApp")

.service("DataService", ["mainRef", "HttpService", "$firebaseArray",
  "$firebaseObject",
  "$q", DataService
]);

function DataService(mainRef, HttpService, $firebaseArray, $firebaseObject, $q) {

  var _self = this;
  _self.AllFranchice;
  _self.AllFranchise
  _self.AllFranchiceName;
  _self.AllMembers;
  _self.mainRef = new Firebase(mainRef);
  // Get All Users
  _self.allUser = function() {
    _self.allUsers = $firebaseArray(_self.mainRef.child("users"));

  }
  _self.allUser();

  // return All Users
  _self.Users = function() {
      return _self.allUsers;
    }
    // Get One User against $id
  _self.getOneUser = function(id) {
    _self.user = $firebaseObject(_self.mainRef.child("users").child(id));
  }
  _self.updateUser = function(id, user) {
    var deffered = $q.defer();
    _self.mainRef.child("users").child(id).update(user, function(err, res) {
      if (err) {
        deffered.reject("Error to update User");
      } else {
        deffered.resolve("User Update successfully");
      }
    });
    return deffered.promise;
  }

  _self.addFranchise = function(franchise) {
      var deffered = $q.defer();
      _self.mainRef.child("Franchises").push(franchise, function(err, res) {
        if (err) {
          deffered.reject(err);
        } else {
          deffered.resolve(res)
        }
      })
      return deffered.promise;
    }
    // Get All Franchises from Firebase
  _self.getAllFranchise = function() {
    _self.AllFranchise = $firebaseArray(_self.mainRef.child("Franchises"));
  }
  _self.getAllFranchise();
  // return All Franchises

  _self.Franchises = function() {
      return _self.AllFranchise;
    }
    // Get One Franchises from Firebase
  _self.getOneFranchise = function(id) {
    _self.Franchise = $firebaseObject(_self.mainRef.child("Franchises").child(
      id));
    return _self.Franchise;
  }

  _self.editFranchise = function(id, franchise) {
      var deffered = $q.defer();
      _self.mainRef.child("Franchises").child(id).update(franchise, function(
        err, res) {
        if (err) {
          deffered.reject("Error to update franchise");
        } else {
          deffered.resolve("Fanchise updated successfully");

        }
      })
      return deffered.promise;
    }
    // add membership to db
  _self.addMembership = function(membership) {
    var deffered = $q.defer();
    _self.mainRef.child("Memberships").push(membership, function(err, res) {
      if (err) {
        deffered.reject(err);
      } else {
        deffered.resolve(res)
      }
    })
    return deffered.promise;
  }

  // Get All Franchises from Firebase
  _self.getAllMemberships = function() {
    _self.AllMemberships = $firebaseArray(_self.mainRef.child("Memberships"));
  }
  _self.getAllMemberships();
  // return All Franchises

  _self.Memberships = function() {
    return _self.AllMemberships;
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
