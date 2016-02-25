angular.module('mobilefood')
  .component('searchFilter', {
    bindings: {
      onFilterChange: '&',
      filter: '<'
    },
    templateUrl: '/js/components/searchfilter.template.html',
    controller: function() {
      // var vm = this;
      //
      // vm.changeFilter = function(category, item, selected) {
      //   debugger
      // };
    }
  });
