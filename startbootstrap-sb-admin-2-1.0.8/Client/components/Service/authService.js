angular
      .module("CloudFusionControllerApp")

      .service("AuthService",[AuthService]);

      function AuthService() {
                  var _self = this;
                  _self.LoggedIn = false;
            _self.isLoggedIn = function (id) {
                  if (id) {
                        return _self.LoggedIn = true;
                  }
                  else {
                        return _self.LoggedIn = false;
                  }
            };
      }
