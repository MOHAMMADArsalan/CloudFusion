angular
      .module("app.addMemberships", [])

     .controller("AddMembershipsController",["MessageService","HttpService","$state", AddMembershipsController]);

    function AddMembershipsController(MessageService,HttpService, $state) {
      var _self = this;
       _self.SameAsPhysical = false;
       _self.AllFranchice;
       _self.memberships;
       //Get All Franchises
       HttpService.GetApi("/router/getFranchises")
                        .then(function(res){
                        _self.AllFranchice = res.data;
                        },function(err){
                            console.log(err);
                        });
     // Check un check Physical Address
      _self.checkSameAsPhysical = function() {
          _self.SameAsPhysical = !_self.SameAsPhysical;
      };
      // Add Members to db
      _self.addMember = function(memberships) {
          MessageService.progressbar.start();
          HttpService.PostApi("/router/addmember",memberships)
                    .then(function(res){
                         MessageService.progressbar.complete();
                         $state.go("dashboard.memberships");
                         _self.memberships = [];
                    },function(err){
                        console.log(err);
                        MessageService.progressbar.complete();
                        
                    });
      };
    }
