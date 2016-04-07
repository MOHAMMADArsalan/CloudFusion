angular
      .module("HolidayCorporationApp")

      .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
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
            });

      $urlRouterProvider.otherwise("/dashboard");
      });
