
angular.module("app.Accommodation",[])
      .controller("AccommodationController",["MessageService",AccommodationController]);

      function AccommodationController(MessageService) {
            var _self = this;
            MessageService.progressbar.start();

            document.getElementById("iframe").onload = function() {
                  MessageService.progressbar.complete();

            }
      }
