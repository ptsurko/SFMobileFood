
angular.module('mobilefood')
  .factory('SearchFilterService', ['$http', 'rx', 'FoodFacilitiesService', function($http, rx, FoodFacilitiesService) {
    return {
      getFilterCategories: getFilterCategories
    };

    function getFilterCategories() {
      return FoodFacilitiesService.getAllFacilities()
        .then(function(facilities) {
          return facilities.reduce(function(result, fac) {
            if (fac.type && result.type.indexOf(fac.type) < 0) {
              result.type.push(fac.type);
            }
            return result;
          }, {
            type: []
          });
        });
    }
  }]);
