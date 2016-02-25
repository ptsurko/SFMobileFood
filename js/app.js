angular.module('mobilefood', ['rx', 'ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
      controller: 'MainController',
      controllerAs: 'ctrl',
      templateUrl: 'js/pages/main.template.html'
    });
  }])
  .run(function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHRzdXJrbyIsImEiOiJjaWs2MGF4dDIwMG1qdmRrdGJtdzZpa3pmIn0.f8CqNzi_zLf8wtQRlubAGw';
  });
