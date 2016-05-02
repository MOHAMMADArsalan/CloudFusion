angular
  .module("CloudFusionControllerApp")

.service("AuthService", ["mainRef", "$q", "$cookieStore", "$firebaseObject",
  "HttpService",
  AuthService
]);

function AuthService(mainRef, $q, $cookieStore, $firebaseObject, HttpService) {
  var _self = this;
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
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
        var words = CryptoJS.enc.Utf8.parse(user.password);
        var base64 = CryptoJS.enc.Base64.stringify(words);
        user.password = base64;
        delete user.confirmpassword;
        if (user.isActive == true) {
          _self.mainRef.child("users").child(authData.uid).set(user,
            function(err, res) {
              if (err) {
                deffered.reject(err);

              } else {
                deffered.resolve(authData);
              }
            })
        } else {
          _self.mainRef.child("users").child(authData.uid).set(user,
            function(err, res) {
              if (err) {
                deffered.reject(err);
              } else {
                user.verifyToken = authData.uid
                HttpService.PostApi(
                  "https://cloudfussion.herokuapp.com/router/signup",
                  user).then(function(
                  res) {
                  deffered.resolve(authData);
                }, function(err) {
                  deffered.reject(err);
                })
              }
            })
        }
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
              deffered.reject("Please Verify your email!!");
            }
          }, function(err) {
            deffered.reject(err);
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
    _self.mainRef.child("users").child(id).once("value", function(
      snapshot) {

      var words = CryptoJS.enc.Base64.parse(snapshot.val().password);
      var textString = CryptoJS.enc.Utf8.stringify(words);
      // var options = {
      //   mode: CryptoJS.mode.CBC,
      //   padding: CryptoJS.pad.Pkcs7
      // };
      // console.log(snapshot.val().password)
      //
      // var decrypted = CryptoJS.AES.decrypt(snapshot.val().password,
      //   "Secret Passphrase", options);
      // console.log(decrypted)
      //
      // var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      // console.log(plaintext)
      _self.mainRef.removeUser({
        email: snapshot.val().email,
        password: textString
      }, function(err) {
        if (err === null) {

          deffered.resolve("User removed successfully")
          _self.mainRef.child("users").child(id).set(null);
        } else {
          deffered.reject("Error removing user:", err)
        }
      })
    });

    // _self.mainRef.child("users").child(id).update({
    //   isActive: false
    // }, function(err, res) {
    //   if (err) {
    //     deffered.reject("Error removing user:", err);
    //   } else {
    //     deffered.resolve("User removed successfully")
    //   }
    // });

    return deffered.promise;
  }
}
