angular
      .module("app.forGetPassword",[])

      .controller("ForgetPasswordController",["HttpService",ForgetPasswordController]);

      function ForgetPasswordController(HttpService) {
        var _self = this;
        _self.recoveryPass = function(email) {
             HttpService.PostApi("/router/forget",{email: email}).then(function(res){
                   console.log(res);
             },function(err){
                   console.log(err);
             })
       }
      }
