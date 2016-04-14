angular.module("CloudFusionControllerApp")
      .service("MessageService",["ngProgressFactory",MessageService]);

      function MessageService(ngProgressFactory) {
            var _self = this;
            _self.progressbar = ngProgressFactory.createInstance();
      }
