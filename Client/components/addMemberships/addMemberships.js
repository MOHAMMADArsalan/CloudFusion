angular
      .module("app.addMemberships", [])

     .controller("AddMembershipsController",["HttpService", AddMembershipsController]);

    function AddMembershipsController(HttpService) {
      var _self = this;
      _self.addMember = function(memberships) {
          console.log(memberships);
          HttpService.PostApi("/router/addmember",memberships)
                    .then(function(res){
                        console.log(res);
                    },function(err){
                        console.log(err);
                    });
      };
    }
