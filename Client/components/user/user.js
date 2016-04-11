angular
    .module("app.user",[])

    .controller("UserController", ["HttpService", "$state", UserController]);

    function UserController(HttpService, $state) {
      var _self = this;
       _self.user = {};
       _self.AllUser = [];
       _self.LastLogin = function(timestamp) {
           
       }
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
    }
