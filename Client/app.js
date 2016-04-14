angular
      .module("CloudFusionControllerApp", [ "ui.router",
                                            "app.signup",
                                            "app.resetPassword",
                                            "app.franchises",
                                            "app.forGetPassword",
                                            "app.addFranchises",
                                            "app.role" ,
                                            "app.addRole",
                                            "app.login",
                                            "app.home",
                                            "app.dashboard",
                                            "app.flight",
                                            "app.user",
                                            "app.adduser",
                                            "app.editUser",
                                            "app.editFranchises",
                                            "app.FranchiseEdit",
                                            "app.memberships",
                                            "app.addMemberships",
                                            "app.Accommodation",
                                            'naif.base64',
                                            "ngCookies",
                                            "ngProgress"])

      .controller("CloudFusionController", [CloudFusionController]);

  function CloudFusionController() {
        var _self = this;
 }
