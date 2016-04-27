angular.module("app.Accommodation", [])
  .controller("AccommodationController", ["MessageService",
    AccommodationController
  ]);

function AccommodationController(MessageService) {
  var _self = this;
  MessageService.progressbar.start();

  document.getElementById("iframe").onload = function() {
    DataService.getOneAccess().then(function(res) {
      if (res.role == "Accommodation") {
        _self.readOnly = res.readOnly;
        _self.write = res.write;
        MessageService.progressbar.complete();
      }
    })
    MessageService.progressbar.complete();

  }
}
