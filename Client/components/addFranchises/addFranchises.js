angular

    .module("app.addFranchises", [])

    .controller("AddFranchisesController", ["HttpService", AddFranchisesController]);

function AddFranchisesController(HttpService) {
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
            }, function(err) {
                console.log(err);
            });
    };

}
