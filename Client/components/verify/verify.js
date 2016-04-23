angular

  .module("app.verify", [])

.controller("VerifyController", ["$stateParams", "$firebaseObject", "$state",
  VerifyController
]);

function VerifyController($stateParams, $firebaseObject, $state) {
  var _self = this;
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  _self.token = $stateParams.token;

  if (_self.token) {
    $firebaseObject(_self.mainRef.child("users").child(_self.token)).$loaded().then(
      function(res) {
        _self.mainRef.child("users").child(_self.token).update({
          isActive: true
        })
        $state.go("login")
      },
      function(err) {
        $state.go("login")
      })
  } else {
    $state.go("login")
  }
}
