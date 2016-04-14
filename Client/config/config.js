angular
      .module("CloudFusionControllerApp")

      .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
            .state("login", {
                  url: "/login",
                  templateUrl: "./components/login/login.html",
                  controller: "LoginController",
                  controllerAs: "login"
            })
            .state("signup", {
                  url: "/signup",
                  templateUrl: "./components/signup/signup.html",
                  controller: "SignupController",
                  controllerAs: "signup"
            })
            .state("forGetPassword", {
                  url: "/forGetPassword",
                  templateUrl: "./components/forGetPassword/forGetPassword.html",
                  controller: "ForgetPasswordController",
                  controllerAs: "forGetPassword"
            })
            .state("dashboard", {
                  url: "/dashboard",
                  abstract: true,
                  resolve: {
                  user: function(AuthService,$location,$cookies,$cookieStore,$window) {

                              var token = localStorage.getItem("token");
                              if(token){
                                    return true;
                              }
                              else if(!token){
                                    var cookies = $cookieStore.get("cloudToken");
                                    if(cookies){
                                          return true;
                                    }
                              }
                        else{
                              $location.path("/login");
                        }
                  }},
                  templateUrl: "./components/dashboard/dashboard.html",
                  controller: "DashboardController",
                  controllerAs: "dashboard"
            })
            .state("dashboard.home", {
                  url: "/home",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/home/home.html",
                           controller: "HomeController",
                           controllerAs: "home"
                     }
                  }
            })
            .state("dashboard.flight", {
                  url: "/flight",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/flight/flight.html",
                           controller: "FlightController",
                           controllerAs: "flight"
                     }
                  }
            })
            .state("dashboard.Accommodation", {
                  url: "/Accommodation",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/Accommodation/Accommodation.html",
                           controller: "AccommodationController",
                           controllerAs: "Accommodation"
                     }
                  }
            })
            .state("dashboard.user", {
                  url: "/user",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/user/user.html",
                           controller: "UserController",
                           controllerAs: "user"
                     }
                  }
            })
            .state("dashboard.addUser", {
                  url: "/adduser",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/addUser/addUser.html",
                           controller: "AddUserController",
                           controllerAs: "adduser"
                     }
                  }
            })
            .state("dashboard.editUser", {
                  url: "/editUser/:id",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/editUser/editUser.html",
                           controller: "EditUserController",
                           controllerAs: "editUser"
                     }
                  }
            })
            .state("dashboard.accessrole", {
                  url: "/accessrole",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/accessRole/accessRole.html",
                           controller: "AccessRoleController",
                           controllerAs: "accessRole"
                     }
                  }
            })
            .state("dashboard.addrole", {
                  url: "/addrole",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/addRole/addRole.html",
                           controller: "AddRoleController",
                           controllerAs: "addrole"
                     }
                  }
            })
            .state("dashboard.franchises", {
                  url: "/franchises",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/franchises/franchises.html",
                           controller: "FranchisesController",
                           controllerAs: "franchises"
                     }
                  }
            })
            .state("dashboard.addFranchises", {
                  url: "/addFranchises",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/addFranchises/addFranchises.html",
                           controller: "AddFranchisesController",
                           controllerAs: "addFranchises"
                     }
                  }
            })
            .state("dashboard.editFranchises", {
                  url: "/editFranchises/:id",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/editFranchises/editFranchises.html",
                           controller: "EditFranchisesController",
                           controllerAs: "editFranchises"
                     }
                  }
            })
            .state("dashboard.FranchiseEdit", {
                  url: "/FranchiseEdit/:id",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/FranchiseEdit/FranchiseEdit.html",
                           controller: "FranchiseEditController",
                           controllerAs: "FranchiseEdit"
                     }
                  }
            })
            .state("dashboard.memberships", {
                  url: "/memberships",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/memberships/memberships.html",
                           controller: "MembershipsController",
                           controllerAs: "memberships"
                     }
                  }
            })
            .state("dashboard.addMemberships", {
                  url: "/addMemberships",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/addMemberships/addMemberships.html",
                           controller: "AddMembershipsController",
                           controllerAs: "addMemberships"
                     }
                  }
            })
            .state("dashboard.resetPassword", {
                  url: "/resetPassword",
                  loginCompulsory : true,
                  views : {
                     "main": {
                           templateUrl: "./components/resetPassword/resetPassword.html",
                           controller: "ResetPasswordController",
                           controllerAs: "resetPassword"
                     }
                  }
            });

      $urlRouterProvider.otherwise("/login");
      //$urlRouterProvider.otherwise("/dashboard/home");
      })


//       .run(function($rootScope, $state){
//
//       $rootScope.$on("$stateChangeStart", function(event, toState){
//       var LocalToken = localStorage.getItem("token");
//       if (toState.loginCompulsory && LocalToken === null) {
//           event.preventDefault();
//           $state.go("login");
//       }
//       });
// });
