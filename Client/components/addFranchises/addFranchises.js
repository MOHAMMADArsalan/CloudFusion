angular.module("app.addFranchises", [])

    .controller("AddFranchisesController", ["MessageService","HttpService","$state", AddFranchisesController]);

function AddFranchisesController(MessageService,HttpService, $state) {
    var _self = this;
    _self.franchise = {};
    _self.SameAsPhysical = false;
   _self.disable = false;
    _self.checkSameAsPhysical = function() {
        _self.SameAsPhysical = !_self.SameAsPhysical;
    };
    _self.addFranchises = function(franchise) {
        _self.disable = true;
        MessageService.progressbar.start();
        HttpService.PostApi("/router/addFranchises", franchise)
            .then(function(res) {
               toastr.success('Franchise added');
                _self.franchise = {};
                MessageService.progressbar.complete();
                _self.disable = false;
                $state.go("dashboard.franchises");
            }, function(err) {
                MessageService.progressbar.complete();
                toastr.error(err);
                _self.disable = false;
            });
    };

}
