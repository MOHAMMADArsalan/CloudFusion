angular
      .module("app.FranchiseEdit",[])

      .controller("FranchiseEditController",["HttpService","$stateParams","$state",FranchiseEditController]);

      function FranchiseEditController(HttpService,$stateParams,$state) {
        var _self = this;
      _self.id = $stateParams.id;
      _self.SameAsPhysical = false;
      _self.disable = false;
      _self.checkSameAsPhysical = function() {
          _self.SameAsPhysical = !_self.SameAsPhysical;
      };
        //Get All Franchises
        HttpService.GetApi("/router/getOneFranchises/" + _self.id)
                        .then(function(res){
                        _self.franchise = res.data;
                        },function(err){
                             console.log(err);
      });


      _self.EditFranchise = function(franchise) {
            _self.disable = true;
            HttpService.PostApi("/router/editFranchises",franchise)
                        .then(function(res){
                              $state.go("dashboard.franchises");
                              _self.disable = false;
                        },function(err){
                              _self.error = "Error To Edit Franchise"
                              _self.disable = false;
                        })
      }
      }
