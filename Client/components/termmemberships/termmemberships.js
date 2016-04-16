angular.module("app.term", [])

.controller("TermMembershipController", [TermMembershipController]);

function TermMembershipController() {
  var _self = this;
  _self.memberships = {};
  _self.memberships.membershipsYears = "Choose...";
  _self.memberships.depositOneDay = "Choose...";
  _self.memberships.depositTwoDay = "Choose...";
  _self.memberships.depositOneMembershipsYears = "Choose...";
  _self.memberships.depositTwoMembershipsYears = "Choose...";
  _self.memberships.paymentMethod = "Choose...";
  _self.memberships.creditCardType = "Choose...";
  _self.memberships.expiryMonth = "Choose...";
  _self.memberships.limitType = "Choose...";
  _self.memberships.duration = "Choose...";
  _self.memberships.membershipsFee = 0.00;
  _self.memberships.total = 0.00;

  // Get current Year
  var date = new Date();

  _self.memberships.depositTwoYear = date.getFullYear();
  _self.memberships.expiryYear = date.getFullYear();
  _self.memberships.depositOneYear = date.getFullYear();

}
