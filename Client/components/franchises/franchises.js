angular
      .module("app.franchises",[])

      .controller("FranchisesController",["DataService","MessageService","HttpService", FranchisesController]);

      function FranchisesController(DataService,MessageService,HttpService) {
        var _self =this;

        _self.AllFranchiseName = DataService.getFranchiseName();
        console.log(_self.AllFranchice)
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
