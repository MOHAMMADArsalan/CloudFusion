angular
  .module("app.flight", [])

.controller("FlightController", ["MessageService", FlightController]);

function FlightController(MessageService) {
  var _self = this;
  MessageService.progressbar.start();
  document.getElementById("iframe").onload = function() {
    MessageService.progressbar.complete();
  }
}
