angular
  .module("app.FranchiseEdit", [])

.controller("FranchiseEditController", ["mainRef", "MessageService",
  "DataService", "HttpService",
  "$stateParams", "$state", FranchiseEditController
]);

function FranchiseEditController(mainRef, MessageService, DataService,
  HttpService,
  $stateParams, $state) {
  var _self = this;
  _self.id = $stateParams.id;
  _self.SameAsPhysical = false;
  _self.disable = false;
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  _self.checkSameAsPhysical = function() {
    _self.SameAsPhysical = !_self.SameAsPhysical;
  };

  _self.franchise = DataService.getOneFranchise(_self.id);

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

  _self.EditFranchise = function(franchise) {
    delete franchise.$$conf;
    delete franchise.$priority;
    delete franchise.$id;
    _self.disable = true;
    DataService.editFranchise(_self.id, franchise).then(function(res) {
        toastr.success("Franchise Edited Successfully");
        $state.go("dashboard.franchises");
        _self.disable = false;
      }, function(err) {
        toastr.error("Error To Edit Franchise");
        _self.disable = false;
      })
      // HttpService.PostApi("/router/editFranchises",franchise)
      //             .then(function(res){
      //                   toastr.success("Franchise Edited Successfully");
      //                   $state.go("dashboard.franchises");
      //                   _self.disable = false;
      //             },function(err){
      //                   toastr.error("Error To Edit Franchise");
      //                   _self.disable = false;
      //             })
  }
}
