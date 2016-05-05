angular.module("CloudFusionControllerApp")

.service("DataService", ["mainRef", "HttpService", "$firebaseArray",
  "$firebaseObject", "$cookieStore",
  "$q", DataService
]);

function DataService(mainRef, HttpService, $firebaseArray, $firebaseObject,
  $cookieStore, $q) {

  var _self = this;
  _self.AllFranchice;
  _self.AllFranchise
  _self.AllFranchiceName;
  _self.AllMembers;
  _self.role = []
  _self.roles = [];
  // _self.role = {
  //   Users: "Users"
  // }, {
  //   Flights: "Flights"
  // }, {
  //   Dashboard: "Dashboard"
  // }, {
  //   Franchises: "Franchises"
  // }, {
  //   Memberships: "Memberships"
  // }, {
  //   Accommodation: "Accommodation"
  // }, {
  //   Cars: "Cars"
  // }, {
  //   Administrator: "Administrator"
  // }
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  // Get All Users
  _self.allUser = function() {
    _self.allUsers = $firebaseArray(_self.mainRef.child("users"));

  }
  _self.allUser();
  _self.getUser = function() {
    var deffered = $q.defer();
    var uid = $cookieStore.get("cloudToken");
    _self.mainRef.child("users").child(uid).once("value", function(user) {
      if (user.val().username) {
        deffered.resolve(user.val().username);
      } else {
        deffered.resolve(user.val().firstname);
      }
    })
    return deffered.promise;
  }
  _self.getUserAccess = function() {
    var deffered = $q.defer();
    var uid = $cookieStore.get("cloudToken");
    _self.mainRef.child("users").child(uid).once("value", function(user) {
      if (user.val().roles.GroupRole) {
        deffered.resolve(user.val().roles.GroupRole);
      } else {
        deffered.resolve(user.val().roles);
      }

    })
    return deffered.promise;
  }
  _self.getOneAccess = function() {
    // var deffered = $q.defer();
    var uid = $cookieStore.get("cloudToken");
    _self.mainRef.child("users").child(uid).once("value", function(user) {
        angular.forEach(user.val().roles, function(val, i) {
          _self.role.push(val);
        });
        // deffered.resolve(role);
      })
      // return deffered.promise;
  }
  _self.getOneAccess();

  _self.Role = function() {
      return _self.role;
    }
    // return All Users
  _self.Users = function() {
      return _self.allUsers;
    }
    // Get One User against $id
  _self.getOneUser = function(id) {
    var deffered = $q.defer();
    _self.mainRef.child("users").child(id).once("value", function(snapshot) {
      deffered.resolve(snapshot.val())
    });
    return deffered.promise;
  }
  _self.updateUser = function(id, user, oldPassword, newPassword) {
    var deffered = $q.defer();
    if (oldPassword) {
      _self.mainRef.changePassword({
        email: user.email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(error) {
        if (error === null) {
          var words = CryptoJS.enc.Utf8.parse(newPassword);
          var base64 = CryptoJS.enc.Base64.stringify(words);
          user.password = base64;
          _self.mainRef.child("users").child(id).update(user, function(
            err, res) {
            if (err) {
              deffered.reject("Error to update User");
            } else {
              deffered.resolve("User Update successfully");
            }
          });
        } else {
          deffered.reject("Wrong Old Password");
        }
      });
    } else {
      var words = CryptoJS.enc.Utf8.parse(newPassword);
      var base64 = CryptoJS.enc.Base64.stringify(words);
      user.password = base64;
      _self.mainRef.child("users").child(id).update(user, function(err, res) {
        if (err) {
          deffered.reject("Error to update User");
        } else {
          deffered.resolve("User Update successfully");
        }
      });
    }

    return deffered.promise;
  }

  _self.addFranchise = function(franchise) {
      var deffered = $q.defer();
      var franchiseRef = _self.mainRef.child("Franchises").push();
      var franchiseKey = franchiseRef.key();
      var Franchises = {};
      Franchises["Franchises/" + franchiseKey] = franchise;
      Franchises["FranchiseNames/" + franchiseKey] = {
        franchiseName: franchise.franchiseName
      };
      _self.mainRef.update(Franchises, function(err, res) {
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

  // Get All Franchises Name from Firebase
  _self.getAllFranchiseName = function() {
      var deffered = $q.defer();
      $firebaseArray(_self.mainRef.child(
        "FranchiseNames")).$loaded().then(function(res) {
        deffered.resolve(res)
      }, function(err) {
        deffered.reject(res)
      });
      return deffered.promise;
    }
    // return All FranchisesName;

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
    // Add Role
  _self.addRole = function(role) {
      var deffered = $q.defer();
      _self.mainRef.child("Roles").push(role, function(err, res) {
        if (err) {
          deffered.reject(err);
        } else {
          deffered.resolve(res)
        }
      })
      return deffered.promise;
    }
    // Add group Roles
  _self.addGroupRole = function(role) {
      var deffered = $q.defer();
      _self.mainRef.child("GroupRoles").push(role, function(err, res) {
        if (err) {
          deffered.reject(err);
        } else {
          deffered.resolve(res)
        }
      })
      return deffered.promise;
    }
    // get All group Roles
  _self.getGroupRole = function(role) {
      var deffered = $q.defer();
      $firebaseArray(_self.mainRef.child("GroupRoles")).$loaded()
        .then(function(res) {
          deffered.resolve(res)
        });
      return deffered.promise;

    }
    // delete group Roles
  _self.deleteGroupRole = function(id) {
      var deffered = $q.defer();
      _self.mainRef.child("GroupRoles").child(id).set(null, function(err) {
        if (err == null) {
          deffered.resolve("Group Role Deleted");
        } else {
          deffered.reject("Error To Deleted Group Role");

        }
      })
      return deffered.promise;

    }
    // Get All Roles
  _self.allRoles = function() {
    _self.roles = $firebaseArray(_self.mainRef.child("Roles"));
  }
  _self.allRoles();

  //return All  Role
  _self.allRole = function() {
    return _self.roles;
  }
  _self.updateRole = function(id, role) {
    var deffered = $q.defer();
    _self.mainRef.child("Roles").child(id).update(role, function(err, res) {
      if (err) {
        deffered.reject(err);
      } else {
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
