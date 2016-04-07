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
            });

      $urlRouterProvider.otherwise("/dashboard/franchises");
      });
