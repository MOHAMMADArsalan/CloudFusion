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
                                            "app.editFranchises",
                                            "app.memberships",
                                            "app.addMemberships",
                                            'naif.base64',])

      .controller("CloudFusionController", [CloudFusionController]);

  function CloudFusionController() {
        var _self = this;
 }
