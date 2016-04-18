angular
  .module("app.addMemberships", [])

.controller("AddMembershipsController", ["DataService", "MessageService",
  "HttpService", "$state", AddMembershipsController
]);

function AddMembershipsController(DataService, MessageService, HttpService,
  $state) {
  var _self = this;
  var Year = new Date();
  _self.memberships = {};
  _self.SameAsPhysical = false;
  _self.memberships.repaymentYear = Year.getFullYear();
  _self.AllFranchiceName = DataService.getFranchiseName();
  _self.memberships.repaymentAmount = 99.00;
  _self.memberships.language = "English";
  // _self.memberships.franchise = "Choose...";
  // _self.memberships.postalCountry = "Choose...";
  // _self.memberships.accountType = "Choose...";
  // _self.memberships.repaymentDay = "Choose...";
  // _self.memberships.repaymentMonth = "Choose...";
  // _self.memberships.title = "Choose...";

  // Add Members to db
  _self.addMember = function(memberships) {
    MessageService.progressbar.start();
    _self.disable = true;
    HttpService.PostApi("/router/addmember", memberships)
      .then(function(res) {
        MessageService.progressbar.complete();
        toastr.success('Memberships added');
        $state.go("dashboard.memberships");
        _self.memberships = [];
        _self.disable = false;
      }, function(err) {
        toastr.error(err);
        MessageService.progressbar.complete();
        _self.disable = false;
      });
  };
}
