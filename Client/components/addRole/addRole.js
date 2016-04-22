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
  MessageService.progressbar.start();
  _self.nonSelectedRoles = DataService.allRole();
  MessageService.progressbar.complete();
  // console.log(_self.nonSelectedRoles);
  // _self.selectedArray = _self.nonSelectedRoles;
  // Add One item  from non selected
  _self.addRole = function(name) {
    MessageService.progressbar.start();
    _self.roles = {
      "name": name,
      isSelected: false
    };
    DataService.addRole(_self.roles).then(function(
        res) {
        MessageService.progressbar.complete();
        toastr.success("Role added successfully");
      }, function(err) {
        MessageService.progressbar.complete();
        toastr.error("Error to added Role");
      })
      // HttpService.PostApi("/router/addRole", _self.roles).then(function(
      //   res) {
      //   MessageService.progressbar.complete();
      //   toastr.success("Role added successfully");
      // }, function(err) {
      //   MessageService.progressbar.complete();
      //   toastr.error("Error to added Role");
      // });
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
    delete _self.selectedRole.$priority;
    delete _self.selectedRole.$$conf;
    DataService.updateRole(_self.selectedRole.$id, {
        isSelected: true
      }).then(
        function(
          res) {
          MessageService.progressbar.complete();
          toastr.success("Role added successfully");
        },
        function(err) {
          MessageService.progressbar.complete();
          toastr.error("Error to added Role");
        })
      // HttpService.PostApi("/router/updateRole", _self.selectedRole).then(
      //   function(res) {
      //     toastr.success("Role selected Successfully");
      //     _self.selectedArray.push(_self.selectedRole);
      //     // _self.nonSelectedRoles.splice(_self.nonSelectedRoles.indexOf(_self.selectedRole),
      //     // 1); MessageService.progressbar.complete();
      //   },
      //   function(err) {
      //     toastr.error("Error to selected Role");
      //     MessageService.progressbar.complete();
      //   });

  };

  // move One item  from selected to non selected Array
  _self.moveNonSelectedSingleRole = function() {
    MessageService.progressbar.start();
    _self.nonselectedRole.isSelected = false;
    delete _self.nonselectedRole.$priority;
    delete _self.nonselectedRole.$$conf;
    DataService.updateRole(_self.nonselectedRole.$id, {
        isSelected: false
      }).then(
        function(
          res) {
          MessageService.progressbar.complete();
          toastr.success("Role added successfully");
        },
        function(err) {
          MessageService.progressbar.complete();
          toastr.error("Error to added Role");
        })
      // HttpService.PostApi("/router/updateRole", _self.selectedRole).then(
      //   function(res) {
      //     toastr.success("Role Unselected Successfully");
      //     // _self.nonSelectedRoles.push(_self.nonselectedRole);
      //     _self.selectedArray.splice(_self.selectedArray.indexOf(_self.nonselectedRole),
      //       1);
      //     MessageService.progressbar.complete();
      //   },
      //   function(err) {
      //     MessageService.progressbar.complete();
      //     toastr.success("Error to Unselected Role");
      //   });
  };
  // move all item  from selected to non selected Array

  _self.moveNonSelectedAllRoles = function() {
    MessageService.progressbar.start();
    angular.forEach(_self.nonSelectedRoles, function(v) {
      console.log(v)
      delete v.$priority;
      delete v.$$conf;
      DataService.updateRole(v.$id, {
        isSelected: false
      }).then(
        function(
          res) {},
        function(err) {
          MessageService.progressbar.complete();
          toastr.error("Error to added Role");
        })

    })
    MessageService.progressbar.complete();
    toastr.success("All Roles unselected Successfully")
      // HttpService.PostApi("/router/updateRole", tempArray)
      // .then(function(res) {
      //   console.log(_self.nonSelectedRoles);
      //   _self.nonSelectedRoles = _self.nonSelectedRoles.concat(
      //     tempArray);
      //   _self.selectedArray = [];
      //   MessageService.progressbar.complete();
      //   toastr.success("All Roles un selected Successfully")
      // }, function(err) {
      //   toastr.success("Error to un selected all Roles")
      //   console.log(err);
      //   MessageService.progressbar.complete();
      // })
  };
  // move all item  from non selected to selected Array

  _self.moveAllRoles = function() {
    MessageService.progressbar.start();
    angular.forEach(_self.nonSelectedRoles, function(v) {
      delete v.$priority;
      delete v.$$conf;
      DataService.updateRole(v.$id, {
        isSelected: true
      }).then(
        function(
          res) {},
        function(err) {
          MessageService.progressbar.complete();
          toastr.error("Error to added Role");
        })

    })
    MessageService.progressbar.complete();
    toastr.success("All Roles selected Successfully")
      // console.log(_self.nonSelectedRoles);
      // _self.nonSelectedRoles.forEach(function(v, i) {
      //   if (v.isSelected == true) {
      //     console.log(v);
      //     delete v;
      //   } else {
      //     v.isSelected = true;
      //     tempArray.push(v);
      //   }
      //   console.log(tempArray);
      // });
      // HttpService.PostApi("/router/updateRole", tempArray)
      //   .then(function(res) {
      //     console.log(_self.selectedArray);
      //     _self.selectedArray // = _self.selectedArray.concat(tempArray);
      //       // _self.nonSelectedRoles = [];
      //     MessageService.progressbar.complete();
      //     toastr.success("All Roles selected Successfully")
      //   }, function(err) {
      //     toastr.success("Error to selected all Roles")
      //     console.log(err);
      //     MessageService.progressbar.complete();
      //   })

  };


}
