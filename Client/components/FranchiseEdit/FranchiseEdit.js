angular
      .module("app.FranchiseEdit",[])

      .controller("FranchiseEditController",["mainRef","DataService","HttpService","$stateParams","$state",FranchiseEditController]);

      function FranchiseEditController(mainRef,DataService,HttpService,$stateParams,$state) {
        var _self = this;
      _self.id = $stateParams.id;
      _self.SameAsPhysical = false;
      _self.disable = false;
      _self.mainRef = new Firebase(mainRef);
      _self.checkSameAsPhysical = function() {
          _self.SameAsPhysical = !_self.SameAsPhysical;
      };

      _self.franchise = DataService.getOneFranchise(_self.id);

        //Get All Franchises
      //   HttpService.GetApi("/router/getOneFranchises/" + _self.id)
      //                   .then(function(res){
      //                   _self.franchise = res.data;
      //                   },function(err){
      //                        console.log(err);
      // });


      _self.EditFranchise = function(franchise) {
            delete franchise.$$conf;
            delete franchise.$priority;
            delete franchise.$id;
            _self.disable = true;
            DataService.editFranchise(_self.id, franchise).then(function(res){
                  toastr.success("Franchise Edited Successfully");
                  $state.go("dashboard.franchises");
                 _self.disable = false;
           },function(err) {
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
