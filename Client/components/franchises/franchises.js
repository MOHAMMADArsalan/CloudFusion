angular
      .module("app.franchises",[])

      .controller("FranchisesController",["MessageService","HttpService", FranchisesController]);

      function FranchisesController(MessageService,HttpService) {
        var _self =this;
        _self.AllFranchice;
        MessageService.progressbar.start();
        HttpService.GetApi("/router/getFranchises")
                     .then(function(res){
                   MessageService.progressbar.complete();
                     _self.AllFranchice = res.data;
                     },function(err){
                        console.log(err);
                        MessageService.progressbar.complete();
                        
                     })
      }
