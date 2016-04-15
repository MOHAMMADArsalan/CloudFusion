angular
      .module("app.editFranchises",[])

      .controller("EditFranchisesController",["HttpService","$stateParams",EditFranchisesController]);

      function EditFranchisesController(HttpService,$stateParams) {
        var _self = this;
      // _self.id = $stateParams.id;
        //Get All Franchises
      //   HttpService.GetApi("/router/getOneFranchises/" + _self.id)
      //                   .then(function(res){
      //                         // console.log(res.data)
      //                   _self.AllFranchice = res.data;
      //                   },function(err){
      //                        console.log(err);
      // });
      }
