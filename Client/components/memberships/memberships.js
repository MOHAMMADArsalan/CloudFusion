angular
      .module("app.memberships", [])

      .controller("MembershipsController",["MessageService","HttpService",MembershipsController]);

      function MembershipsController(MessageService,HttpService) {
        var _self = this;
        _self.AllMembers;
         MessageService.progressbar.start();
        HttpService.GetApi("/router/getmember")
                        .then(function(res) {
                               MessageService.progressbar.complete();
                              _self.AllMembers = res.data;
                        },function(err){
                        console.log(err);
                        MessageService.progressbar.complete();
                        
                  });
      }
