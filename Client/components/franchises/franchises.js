angular
      .module("app.franchises",[])

      .controller("FranchisesController",["HttpService", FranchisesController]);

      function FranchisesController(HttpService) {
        var _self =this;
        _self.AllFranchice;
        HttpService.GetApi("/router/getFranchises")
                     .then(function(res){
                     _self.AllFranchice = res.data;
                     },function(err){
                        console.log(err);
                     })
      }
