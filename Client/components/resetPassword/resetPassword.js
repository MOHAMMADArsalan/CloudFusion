angular
      .module("app.resetPassword",[])

      .controller("ResetPasswordController",["HttpService",ResetPasswordController]);

      function ResetPasswordController(HttpService) {
            var _self = this;

            _self.resetPassword = function(pass) {
                  HttpService.PostApi("/router/passwordReset",pass).then(function(res){
                  console.log(res);
            },function(err){
                  console.log(err)
            })
            }
      }
