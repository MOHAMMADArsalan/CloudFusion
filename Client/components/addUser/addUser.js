angular
  .module("app.adduser", [])

.controller("AddUserController", ["DataService", "MessageService",
  "HttpService", "$state", AddUserController
]);

function AddUserController(DataService, MessageService, HttpService, $state) {
  var _self = this;
  _self.error = "";
  _self.AllFranchiceName = DataService.getFranchiseName();
  _self.emailExistError = "";
  _self.Roles  = DataService.getRoles();
  _self.addUser = function(user) {
    MessageService.progressbar.start();
    _self.emailExistError = "";
    _self.error = "";
    if (user.confirmpassword != user.password) {
      toastr.error("password does not match");
      MessageService.progressbar.complete();
    } else {
      HttpService.PostApi("/router/signup", user).then(function(res) {

        if (res.data === "Email is ALready exist") {
          MessageService.progressbar.complete();
          toastr.error("Email is already exist");
        } else {
          toastr.success("User added");
          $state.go("dashboard.user");
          _self.user = {};
          MessageService.progressbar.complete();

        }

      }, function(err) {
        toastr.error(err);
      });
    }

  };
}
