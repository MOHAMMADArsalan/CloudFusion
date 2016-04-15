angular.module("CloudFusionControllerApp")

      .service("DataService",["HttpService",DataService]);

      function DataService(HttpService) {

            var _self = this;
            _self.AllFranchice;
            _self.AllFranchiceName;
            _self.AllMembers;

            HttpService.GetApi("/router/franchiseName")
                           .then(function(res){
                        return  _self.AllFranchiceName = res.data;
                           },function(err){
                              console.log(err);
          });

          HttpService.GetApi("/router/getmember")
                          .then(function(res) {
                                console.log(res);
                                _self.AllMembers = res.data;
                          },function(err){
                          console.log(err);

                    });
       HttpService.GetApi("/router/getFranchises")
                       .then(function(res){
                      _self.AllFranchice = res.data;
                       },function(err){
                          console.log(err);
      });





          _self.getFranchises  = function() {
               return _self.AllFranchice;
          }
          _self.getFranchiseName  = function() {
               return _self.AllFranchiceName;
          }
          _self.getmember  = function() {
               return _self.AllMembers;
          }
      }
