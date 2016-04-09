angular
      .module("HolidayCorporationApp")

      .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
            .state("login", {
                  url: "/login",templateUrl: "./components/login/login.html",
                  controller: "LoginController",
                  controllerAs: "login"
            })
            .state("signup", {
                  url: "/signup",
                  templateUrl: "./components/signup/signup.html",
                  controller: "SignupController",
                  controllerAs: "signup"
            })
            .state("dashboard", {
                  url: "/dashboard",
                  abstract: true,

                  templateUrl: "./components/dashboard/dashboard.html",
                  controller: "DashboardController",
                  controllerAs: "dashboard"
            })
            .state("dashboard.home", {
                  url: "/home",
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
                  views : {
                     "main": {
                           templateUrl: "./components/flight/flight.html",
                           controller: "FlightController",
                           controllerAs: "flight"
                     }
                  }
            })
            .state("dashboard.user", {
                  url: "/user",
                  views : {
                     "main": {
                           templateUrl: "./components/user/user.html",
                           controller: "UserController",
                           controllerAs: "user"
                     }
                  }
            })
            .state("dashboard.adduser", {
                  url: "/adduser",
                  views : {
                     "main": {
                           templateUrl: "./components/adduser/addUser.html",
                           controller: "AddUserController",
                           controllerAs: "adduser"
                     }
                  }
            })
            .state("dashboard.accessrole", {
                  url: "/accessrole",
                  views : {
                     "main": {
                           templateUrl: "./components/accessRole/accessRole.html",
                           controller: "AccessRoleController",
                           controllerAs: "accessRole"
                     }
                  }
            })
            .state("dashboard.franchises", {
                  url: "/franchises",
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
                  views : {
                     "main": {
                           templateUrl: "./components/addFranchises/addFranchises.html",
                           controller: "AddFranchisesController",
                           controllerAs: "addFranchises"
                     }
                  }
            })
            .state("dashboard.memberships", {
                  url: "/memberships",
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
                  views : {
                     "main": {
                           templateUrl: "./components/addMemberships/addMemberships.html",
                           controller: "AddMembershipsController",
                           controllerAs: "addMemberships"
                     }
                  }
            });

      $urlRouterProvider.otherwise("login");
      });
