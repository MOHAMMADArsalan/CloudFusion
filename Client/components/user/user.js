angular
    .module("app.user",[])

    .controller("UserController", ["HttpService", "$state", UserController]);

    function UserController(HttpService, $state) {
      var _self = this;
       _self.user = {};
       _self.AllUser = [];
       HttpService.GetApi("/router/getuser").then(function(res){
           if(res.data.length === 0) {
               console.log("Data not Found");
           }
           else {
               _self.AllUser = res.data;
           }
       },function(err){
           console.log(err);
       });
      _self.addUser = function(user) {
          HttpService.PostApi("/router/adduser",user)
                      .then(function(res){
                          _self.user = {};
                      },function(err){
                          console.log(err);
                      });
      };
    }
