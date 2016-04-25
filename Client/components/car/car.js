angular
      .module("app.car", [])

      .controller("CarController",["MessageService",CarController]);

      function CarController(MessageService) {
        var _self = this;
        MessageService.progressbar.start();
        document.getElementById("iframe").onload = function() {
            MessageService.progressbar.complete();
        }
    }
