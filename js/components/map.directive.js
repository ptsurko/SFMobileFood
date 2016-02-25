
angular.module('mobilefood')
  .directive('map', function() {
    return {
      scope: {
        center: '@',
        zoom: '@',
        style: '@',
        facilities: '<'
      },
      link: function($scope, element, attrs) {
        var center;
        try {
          center = JSON.parse($scope.center);
        } catch (Error) {}
        var zoom = parseInt($scope.zoom, 10) || 0;

        var map = new mapboxgl.Map({
          container: element[0],
          style: $scope.style,
          center: center,
          zoom: zoom
        });

        map.on('load', function() {
          $scope.$apply(function() {
            $scope.$watch('facilities', function(newFacilities) {
              var markerSources = map.getSource('markers');
              if (markerSources) {
                markerSources.setData({
                  type: 'FeatureCollection',
                  features: newFacilities
                });
              } else {
                map.addSource('markers', {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: newFacilities
                  }
                });
                map.addLayer({
                  id: 'markers',
                  type: 'symbol',
                  source: 'markers',
                  layout: {
                    'icon-image': '{marker-symbol}-15',
                    // 'text-field': '{title}',
                    // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    // 'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                  }
                });
              }
            });
          });
        });

        $scope.$on('$destroy', function() {
          map.remove();
        });
      }
    };
  });
