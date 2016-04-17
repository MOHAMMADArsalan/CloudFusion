angular
  .module("app.addRole", [])

.controller("AddRoleController", ["DataService", "MessageService",
  "HttpService",
  AddRoleController
]);

function AddRoleController(DataService, MessageService, HttpService) {
  var _self = this;
  _self.role = [];
  _self.roles = {}
  _self.nonSelectedRoles = DataService.getRoles();
  _self.selectedArray = _self.nonSelectedRoles;
  // Add One item  from non selected
  _self.addRole = function(name) {
    MessageService.progressbar.start();
    _self.roles = {
      "name": name,
      isSelected: false
    };
    HttpService.PostApi("/router/addRole", _self.roles).then(function(
      res) {
      MessageService.progressbar.complete();
      toastr.success("Role added successfully");
    }, function(err) {
      MessageService.progressbar.complete();
      toastr.error("Error to added Role");
    });
  };
  _self.selectedRoleItem = function(role) {
    _self.selectedRole = role;
  };

  // Add One item  from selected
  _self.nonselectedRoleItem = function(selectedrole) {
    _self.nonselectedRole = selectedrole;
  };

  // move One item  from non selected to selected Array
  _self.moveSingleRole = function() {
    MessageService.progressbar.start();
   _self.selectedRole.isSelected = true;
   HttpService.PostApi("/router/updateRole", _self.selectedRole).then(function(res) {
      toastr.success("Role selected Successfully");
      _self.selectedArray.push(_self.selectedRole);
      _self.nonSelectedRoles.splice(_self.nonSelectedRoles.indexOf(_self.selectedRole),
        1);
      MessageService.progressbar.complete();
    },function(err){
      toastr.error("Error to selected Role");
      MessageService.progressbar.complete();
    });

  };

  // move One item  from selected to non selected Array
  _self.moveNonSelectedSingleRole = function() {
    MessageService.progressbar.start();
    _self.nonselectedRole.isSelected = false;
    HttpService.PostApi("/router/updateRole", _self.selectedRole).then(function(res) {
        toastr.success("Role Unselected Successfully");
       _self.nonSelectedRoles.push(_self.nonselectedRole);
       _self.selectedArray.splice(_self.selectedArray.indexOf(_self.nonselectedRole),
         1);
         MessageService.progressbar.complete();
      },function(err){
       MessageService.progressbar.complete();
       toastr.success("Error to Unselected Role");
     });
  };
  // move all item  from selected to non selected Array

  _self.moveNonSelectedAllRoles = function() {
    _self.selectedArray.forEach(function(v, i) {
      _self.nonSelectedRoles.push(v);
    });
    _self.selectedArray = [];
  };
  // move all item  from non selected to selected Array

  _self.moveAllRoles = function() {
    _self.nonSelectedRoles.forEach(function(v, i) {
      console.log(v);
      _self.selectedArray.push(v);
    });
    _self.nonSelectedRoles = [];
  };


}
