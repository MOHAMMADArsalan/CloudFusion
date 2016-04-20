angular.module("CloudFusionControllerApp")

.service("DataService", ["mainRef", "HttpService", "$firebaseArray","$firebaseObject",
  "$q",DataService
]);

function DataService(mainRef, HttpService, $firebaseArray,$firebaseObject,$q) {

  var _self = this;
  _self.AllFranchice;
  _self.AllFranchiceName;
  _self.AllMembers;
  _self.mainRef = new Firebase(mainRef);
  // Get All Users
  _self.allUser = function() {
      _self.Users = $firebaseArray(_self.mainRef.child("users"));
      return _self.Users;
    }
    // Get One User against $id
  _self.getOneUser = function(id) {
    _self.user = $firebaseObject(_self.mainRef.child("users").child(id));
    return _self.user;
  }


  _self.updateUser = function(id,user) {
    var deffered = $q.defer();
    _self.mainRef.child("users").child(id).update(user, function(err,res) {
      if(err) {
        deffered.reject("Error to update User");
      }else {
        deffered.resolve("User Update successfully");
      }
    });
    return deffered.promise;
  }

  _self.addFranchise = function(franchise) {
    var deffered = $q.defer();
   _self.mainRef.child("Franchises").push(franchise,function(err,res) {
     if(err) {
       deffered.reject(err);
     }
     else {
       deffered.resolve(res)
     }
   })
   return deffered.promise;
  }

  _self.getAllFranchise = function() {
    _self.AllFranchise = $firebaseArray(_self.mainRef.child("Franchises"));
    return _self.AllFranchise;
  }
  _self.getOneFranchise = function(id) {
    _self.Franchise = $firebaseObject(_self.mainRef.child("Franchises").child(id));
    return _self.Franchise;
  }

  _self.editFranchise = function(id,franchise) {
    var deffered = $q.defer();
    _self.mainRef.child("Franchises").child(id).update(franchise ,function(err,res) {
      if(err){
        deffered.reject("Error to update franchise");
      }
      else {
        deffered.resolve("Fanchise updated successfully");

      }
    })
    return deffered.promise;
  }
  // add membership to db
  _self.addMembership = function(membership) {
    var deffered = $q.defer();
   _self.mainRef.child("Memberships").push(membership,function(err,res) {
     if(err) {
       deffered.reject(err);
     }
     else {
       deffered.resolve(res)
     }
   })
   return deffered.promise;
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
