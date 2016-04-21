angular
  .module("CloudFusionControllerApp")

.service("AuthService", ["mainRef", "$q", "$cookieStore", "$firebaseObject",
  AuthService
]);

function AuthService(mainRef, $q, $cookieStore, $firebaseObject) {
  var _self = this;
  _self.mainRef = new Firebase(mainRef);
  _self.LoggedIn = false;
  _self.isLoggedIn = function(id) {
    if (id) {
      return _self.LoggedIn = true;
    } else {
      return _self.LoggedIn = false;
    }
  };
  // Sign Up function
  _self.signup = function(user) {
    var deffered = $q.defer();
    _self.mainRef.createUser({
      email: user.email,
      password: user.password
    }, function(err, authData) {
      if (err) {
        deffered.reject(err);
      } else {
        delete user.password;
        user.isActive = true;
        _self.mainRef.child("users").child(authData.uid).set(user)
        deffered.resolve(authData);
      }
    })
    return deffered.promise;
  }

  //login function
  _self.login = function(user) {
    var deffered = $q.defer();
    _self.mainRef.authWithPassword({
      email: user.email,
      password: user.password
    }, function(err, authData) {
      if (err) {
        deffered.reject(err);
      } else {
        $firebaseObject(_self.mainRef.child("users").child(
            authData.uid)).$loaded().then(function(resp) {
            if (resp.isActive === true) {
              deffered.resolve(authData);
            } else {
              deffered.resolve("User Does not exist");
            }
          }, function(err) {
            console.log(err);
          })
          // console.log(userObj.$id)

      }
    })
    return deffered.promise;
  }

  _self.changePassword = function(user) {
    var deffered = $q.defer();
    _self.mainRef.changePassword({
      email: user.email,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword
    }, function(err) {
      if (err === null) {
        var uid = $cookieStore.get("cloudToken");
        _self.mainRef.child("users").child(uid).update({
          password: user.newPassword
        })
        deffered.resolve("Password changed successfull");
      } else {
        deffered.reject(err);

      }
    })
    return deffered.promise;
  }
  _self.forGetPassword = function(email) {
      var deffered = $q.defer();
      _self.mainRef.resetPassword({
        email: email
      }, function(err) {
        if (err === null) {
          deffered.resolve("Password reset email sent successfully")
        } else {
          deffered.reject("Error sending password reset email")
        }
      })
      return deffered.promise;
    }
    // Not using now
  _self.deleteUser = function(id) {
    var deffered = $q.defer();
    _self.mainRef.child("users").child(id).update({
      isActive: false
    }, function(err, res) {
      if (err) {
        deffered.reject("Error removing user:", err);
      } else {
        deffered.resolve("User removed successfully")
      }
    });
    // _self.mainRef.removeUser({
    //   email: user.email,
    //   password: user.password
    // }, function(err) {
    //   if (err === null) {
    //     deffered.resolve("User removed successfully")
    //   } else {
    //     deffered.reject("Error removing user:", err)
    //   }
    // })
    return deffered.promise;
  }
}
