angular
  .module("app.franchises", [])

.controller("FranchisesController", ["DataService", "MessageService",
  "HttpService", FranchisesController
]);

function FranchisesController(DataService, MessageService, HttpService) {
  var _self = this;

  _self.AllFranchiseName = DataService.Franchises();

  // var roles = DataService.Role();
  DataService.getUserAccess().then(function(res) {
      angular.forEach(res, function(val) {
        if (val.role == "Franchises") {
          _self.readOnly = val.readOnly;
          _self.write = val.write;
          MessageService.progressbar.complete();
          // _self.AccessUser = val.noAccess;
        } else if (val.role === "Administrator") {
          _self.AccessAdministrator = true;
          MessageService.progressbar.complete();
        }
      })
    })
    // document.getElementById("franchise").onload = function() {
    //   angular.forEach(roles, function(val) {
    //     if (val.role == "Administrator") {
    //       console.log("Administrator")
    //       _self.AccessAdministrator = true;
    //       MessageService.progressbar.complete();
    //     } else if (val.role === "Franchises") {
    //       _self.readOnly = val.readOnly;
    //       _self.write = val.write;
    //       MessageService.progressbar.complete();
    //     }
    //   })
    // }

  //   HttpService.GetApi("/router/getFranchises")
  //                .then(function(res){
  //              MessageService.progressbar.complete();
  //                _self.AllFranchice = res.data;
  //                },function(err){
  //                   console.log(err);
  //                   MessageService.progressbar.complete();
  //
  //                })
}
