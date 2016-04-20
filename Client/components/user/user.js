angular
  .module("app.user", [])

.controller("UserController", ["MessageService", "HttpService", "$state",
  "DataService", "AuthService", UserController
]);

function UserController(MessageService, HttpService, $state, DataService,
  AuthService) {
  var _self = this;
  _self.user = {};
  _self.AllUser = [];
  // MessageService.progressbar.start();
  _self.AllUser = DataService.allUser();

  _self.deleteUser = function(id) {
    console.log(id);
    AuthService.deleteUser(id).then(function(res) {
        console.log(res)
      }, function(err) {
        console.log(err);
      })
      // var item = _self.AllUser[index];
      // _self.AllUser.$remove(item)
      // MessageService.progressbar.start();
      // AuthService.deleteUser(user).then(function(res) {
      //
      //   }, function(err) {
      //     console.log(err);
      //   })
      // HttpService.DeleteApi("/router/deleteUser/" + id)
      //   .then(function(res) {
      //     MessageService.progressbar.complete();
      //     _self.AllUser.splice(index, 1);
      //     toastr.success("User Deleted Successfully");
      //   }, function(err) {
      //     MessageService.progressbar.complete();
      //     toastr.error("Error To Delete User");
      //   });
  };
  //    _self.LastLogin = function(timestamp) {}
  // HttpService.GetApi("/router/getuser").then(function(res) {
  //   if (res.data.length === 0) {
  //     toastr.info("No Data Found");
  //     MessageService.progressbar.complete();
  //
  //   } else {
  //     _self.AllUser = res.data;
  //     MessageService.progressbar.complete();
  //
  //   }
  // }, function(err) {
  //   console.log(err);
  //   MessageService.progressbar.complete();
  //
  // });
}
