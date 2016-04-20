angular
  .module("app.adduser", [])

.controller("AddUserController", ["mainRef","DataService", "MessageService","AuthService",
  "HttpService", "$state", AddUserController
]);

function AddUserController(mainRef,DataService, MessageService, AuthService ,HttpService, $state) {
  var _self = this;
  _self.error = "";
  var mainRef = new Firebase(mainRef);
  // _self.AllFranchiceName = DataService.getFranchiseName();
  // _self.emailExistError = "";
  // _self.Roles  = DataService.getRoles();
  _self.addUser = function(user) {
    delete user.confirmpassword;
    user.franchise = "franchise01";
    user.role = "Admin";
    MessageService.progressbar.start();
    // _self.emailExistError = "";
    // _self.error = "";
    if (user.confirmpassword != user.password) {
      toastr.error("password does not match");
      MessageService.progressbar.complete();
    } else {
      AuthService.signup(user).then(function(res) {
        toastr.success("User created successfully");
        MessageService.progressbar.complete();
      },function(err ){
        toastr.error("Error to add User");
        MessageService.progressbar.complete();

      })
      // HttpService.PostApi("/router/signup", user).then(function(res) {
      //
      //   if (res.data === "Email is ALready exist") {
      //     MessageService.progressbar.complete();
      //     toastr.error("Email is already exist");
      //   } else {
      //     toastr.success("User added");
      //     $state.go("dashboard.user");
      //     _self.user = {};
      //     MessageService.progressbar.complete();
      //
      //   }
      //
      // }, function(err) {
      //   toastr.error(err);
      // });
    }

  };
}
