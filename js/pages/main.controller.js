
angular.module('mobilefood')
  .controller('MainController', ['$scope', 'rx', 'FacilitiesStore', function($scope, rx, FacilitiesStore) {
    var vm = this;
    vm.facilitiesGeoJson = [];
    vm.searchFacilities = function(query) {
      FacilitiesStore.filterByQuery(query);
    };
    vm.filterFacilities = function(category, item, value) {
      FacilitiesStore.filterByType(item, value);
    };

    var facilitiesStream = FacilitiesStore.facilities
        .safeApply($scope, function(facilities) {
          vm.facilitiesGeoJson = convertToGeoJSON(facilities);
        }).subscribe();
    var filterStream = FacilitiesStore.filter
        .safeApply($scope, function(filter) {
          if (vm.filter) {
            updateFilter(filter);
          } else {
            vm.filter = angular.copy(filter);
          }
        })
        .subscribe();

    function updateFilter(filter) {
      vm.filter.query = filter.query;
      vm.filter.type.forEach(function(type) {
        type.selected = type.selected;
      });
    }

    function convertToGeoJSON(facilities) {
      return facilities.map(function(fac) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [fac.long, fac.lat]
          },
          properties: {
            title: 'Mapbox SF',
            'marker-symbol': 'star',
            'marker-size': 'medium',
            'marker-color': '#3bb2d0',
            type: fac.type,
            applicant: fac.applicant,
            description: fac.description
          }
        };
      });
    }

    $scope.$on('$destroy', function() {
      facilitiesStream.dispose();
      filterStream.dispose();
    });
  }]);
