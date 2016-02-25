
angular.module('mobilefood')
  .factory('FoodFacilitiesService', ['$http', function($http) {
    return {
      getAllFacilities: getAllFacilities
    };

    function getAllFacilities() {
      return $http({
        url: '/food.json',
        method: 'GET'
      }).then(function(response) {
        response.data.data.forEach(function(row) {
          row[22] = parseFloat(row[22], 10);
          row[23] = parseFloat(row[23], 10);
        });
        return response.data.data.filter(function(row) {
          return !isNaN(row[22]) && !isNaN(row[23]);
        }).map(function(row) {
          return {
            lat: row[22],
            long: row[23],
            type: row[10],
            applicant: row[9],
            description: row[19]
          };
        });
      });
    }
  }]);
