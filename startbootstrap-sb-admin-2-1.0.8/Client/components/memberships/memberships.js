angular
      .module("app.memberships", [])

      .controller("MembershipsController",["HttpService",MembershipsController]);

      function MembershipsController(HttpService) {
        var _self = this;
        _self.AllMembers;
        HttpService.GetApi("/router/getmember")
                        .then(function(res) {
                              _self.AllMembers = res.data;
                        },function(err){
                        console.log(err);
                  });
      }
