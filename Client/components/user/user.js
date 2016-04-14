angular
    .module("app.user",[])

    .controller("UserController", ["MessageService","HttpService", "$state", UserController]);

    function UserController(MessageService,HttpService, $state) {
      var _self = this;
       _self.user = {};
       _self.AllUser = [];
       MessageService.progressbar.start();
       _self.deleteUser = function(id,index){
           MessageService.progressbar.start();
           HttpService.DeleteApi("/router/deleteUser/"+id)
                    .then(function(res){
                        MessageService.progressbar.complete();
                        _self.AllUser.splice(index,1);
                        toastr.success("User Deleted Successfully");
                    },function(err){
                        MessageService.progressbar.complete();
                        toastr.error("Error To Delete User");
                    });
       };
    //    _self.LastLogin = function(timestamp) {}
       HttpService.GetApi("/router/getuser").then(function(res){
           if(res.data.length === 0) {
               toastr.info("No Data Found");
               MessageService.progressbar.complete();

           }
           else {
               _self.AllUser = res.data;
               MessageService.progressbar.complete();

           }
       },function(err){
           console.log(err);
           MessageService.progressbar.complete();

       });
    }
