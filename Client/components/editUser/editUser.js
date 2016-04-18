angular.module("app.editUser", [])

.controller("EditUserController", ["DataService", "MessageService",
  "HttpService", "$stateParams", "$state", EditUserController
]);

function EditUserController(DataService, MessageService, HttpService,
  $stateParams, $state) {
  var _self = this;
  _self.EditUser = {};
  _self._id = $stateParams.id;
  _self.Roles = DataService.getRoles();
  _self.AllFranchiceName = DataService.getFranchiseName();
  if (_self.AllFranchiceName) {
    _self.EditUser.franchise = _self.AllFranchiceName[0].franchiseName
  }


  _self.emailExistError = "";
  MessageService.progressbar.start();
  _self.disable = false;
  //Get All Franchises
  //   HttpService.GetApi("/router/getFranchises")
  //                   .then(function(res){
  //                   MessageService.progressbar.complete();
  //                   _self.AllFranchice = res.data;
  //                   },function(err){
  //                   MessageService.progressbar.complete();
  //                        console.log(err);
  // });
  HttpService.GetApi("/router/getOneUser/" + _self._id)
    .then(function(res) {
      console.log(res)
      MessageService.progressbar.complete();
      _self.EditUser = res.data;
      _self.EditUser.role = _self.Roles[0].name
    }, function(err) {
      MessageService.progressbar.complete();
      console.log(err);
    });

  _self.editUser = function(user, pass) {
    _self.disable = true;
    MessageService.progressbar.start();
    user.password = pass;
    HttpService.PostApi("/router/editUser", user)
      .then(function(res) {
        toastr.success("User update Successfully");
        MessageService.progressbar.complete();
        _self.disable = false;
        $state.go("dashboard.user");
      }, function(err) {
        MessageService.progressbar.complete();
        _self.disable = false;
        toastr.success("Error To update User");
      })
  }
}
