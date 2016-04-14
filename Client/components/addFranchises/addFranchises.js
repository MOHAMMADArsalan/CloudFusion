angular.module("app.addFranchises", [])

    .controller("AddFranchisesController", ["HttpService","$state", AddFranchisesController]);

function AddFranchisesController(HttpService, $state) {
    var _self = this;
    _self.franchise = {};
    _self.SameAsPhysical = false;

    _self.checkSameAsPhysical = function() {
        _self.SameAsPhysical = !_self.SameAsPhysical;
    };
    _self.addFranchises = function(franchise) {
        HttpService.PostApi("/router/addFranchises", franchise)
            .then(function(res) {
                _self.franchise = {};
                $state.go("dashboard.franchises");
            }, function(err) {
                console.log(err);
            });
    };

}
