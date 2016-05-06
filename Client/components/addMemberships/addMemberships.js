angular
  .module("app.addMemberships", [])

.controller("AddMembershipsController", ["DataService", "MessageService",
  "HttpService", "$state", AddMembershipsController
]);

function AddMembershipsController(DataService, MessageService, HttpService,
  $state) {
  var _self = this;
  _self.TermBase = false;
  var Year = new Date();
  _self.memberships = {};
  _self.SameAsPhysical = false;
  _self.memberships.repaymentYear = Year.getFullYear();

  MessageService.progressbar.start();

  DataService.getAllFranchiseName().then(function(res) {
    _self.AllFranchiceName = res;
    MessageService.progressbar.complete();
  }, function(err) {
    toastr.error("Error to load franchiseName")
    MessageService.progressbar.complete();
  });

  _self.memberships.repaymentAmount = 99.00;
  _self.memberships.language = "English";

  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role == "Memberships") {
        _self.readOnly = val.readOnly;
        _self.write = val.write;
        MessageService.progressbar.complete();
        // _self.AccessUser = val.noAccess;
      } else if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
        MessageService.progressbar.complete();
      }
    })
  })


  // Add Members to db
  _self.addMember = function(memberships) {
    MessageService.progressbar.start();
    _self.disable = true;
    DataService.addMembership(memberships).then(function(res) {
        MessageService.progressbar.complete();
        toastr.success('Memberships added');
        $state.go("dashboard.memberships");
        _self.memberships = [];
        _self.disable = false;
      }, function(err) {
        toastr.error(err);
        MessageService.progressbar.complete();
        _self.disable = false;
      })
      // HttpService.PostApi("/router/addmember", memberships)
      //   .then(function(res) {
      //     MessageService.progressbar.complete();
      //     toastr.success('Memberships added');
      //     $state.go("dashboard.memberships");
      //     _self.memberships = [];
      //     _self.disable = false;
      //   }, function(err) {
      //     toastr.error(err);
      //     MessageService.progressbar.complete();
      //     _self.disable = false;
      //   });
  };
}
