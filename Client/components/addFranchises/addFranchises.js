angular.module("app.addFranchises", [])

    .controller("AddFranchisesController", ["mainRef","DataService","MessageService","HttpService","$state", AddFranchisesController]);

function AddFranchisesController(mainRef,DataService,MessageService,HttpService, $state) {
    var _self = this;
    _self.franchise = {};
    _self.SameAsPhysical = false;
   _self.disable = false;

   _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
    _self.checkSameAsPhysical = function() {
        _self.SameAsPhysical = !_self.SameAsPhysical;
    };
    _self.addFranchises = function(franchise) {
        _self.disable = true;
        MessageService.progressbar.start();
        DataService.addFranchise(franchise).then(function(res){
           toastr.success('Franchise added');
                MessageService.progressbar.complete();
                _self.disable = false;
                _self.franchise = {};
                $state.go("dashboard.franchises");
        },function(err){
           MessageService.progressbar.complete();
               toastr.error(err);
               _self.disable = false;
        })
      //   HttpService.PostApi("/router/addFranchises", franchise)
      //       .then(function(res) {
      //          toastr.success('Franchise added');
      //           _self.franchise = {};
      //           MessageService.progressbar.complete();
      //           _self.disable = false;
      //           $state.go("dashboard.franchises");
      //       }, function(err) {
      //           MessageService.progressbar.complete();
      //           toastr.error(err);
      //           _self.disable = false;
      //       });
    };

}
