angular.module("app.addFranchises", [])

    .controller("AddFranchisesController", ["MessageService","HttpService","$state", AddFranchisesController]);

function AddFranchisesController(MessageService,HttpService, $state) {
    var _self = this;
    _self.franchise = {};
    _self.SameAsPhysical = false;

    _self.checkSameAsPhysical = function() {
        _self.SameAsPhysical = !_self.SameAsPhysical;
    };
    _self.addFranchises = function(franchise) {
        MessageService.progressbar.start();
        HttpService.PostApi("/router/addFranchises", franchise)
            .then(function(res) {
                _self.franchise = {};
                MessageService.progressbar.complete();
                $state.go("dashboard.franchises");
            }, function(err) {
                MessageService.progressbar.complete();
                console.log(err);
            });
    };

}
