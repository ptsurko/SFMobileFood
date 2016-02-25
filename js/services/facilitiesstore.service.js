
angular.module('mobilefood')
  .factory('FacilitiesStore', ['FoodFacilitiesService', 'SearchFilterService', 'rx', function(FoodFacilitiesService, SearchFilterService, rx) {
    var filter = {
      query: '',
      type: []
    };
    var changeFilterStream = new rx.Subject();
    var filterStream = rx.Observable.fromPromise(SearchFilterService.getFilterCategories())
        .map(function(categories) {
          filter.type = categories.type.map(function(type) {
            return {
              type: type,
              selected: true
            };
          });
          return filter;
        }).merge(changeFilterStream);

    var facilitiesStream = new rx.Subject()
        .startWith(filter)
        .merge(filterStream)
        .flatMap(function(filter) {
          var allFacilitiesPromise = FoodFacilitiesService.getAllFacilities()
              .then(function(facilities) {
                var result = facilities;
                if (filter.query) {
                  result = result.filter(function(fac) {
                    return fac.description && fac.description.indexOf(filter.query) >= 0;
                  });
                }
                if (filter.type) {
                  var selectedTypes = filter.type.reduce(function(res, type) {
                    if (type.selected) {
                      res.push(type.type);
                    }
                    return res;
                  }, []);
                  result = result.filter(function(fac) {
                    return selectedTypes.indexOf(fac.type) >= 0;
                  });
                }
                return result;
              });
          return rx.Observable.fromPromise(allFacilitiesPromise);
        });

    return {
      facilities: facilitiesStream,
      filter: filterStream,
      filterByQuery: filterByQuery,
      filterByType: filterByType
    };

    function filterByQuery(query) {
      filter.query = query;
      changeFilterStream.onNext(filter);
    }

    function filterByType(type, value) {
      filter.type.forEach(function(t) {
        if (t.type === type) {
          t.selected = value;
        }
      });
      changeFilterStream.onNext(filter);
    }
  }]);
