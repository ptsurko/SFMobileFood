angular.module('mobilefood')
  .component('searchBox', {
    bindings: {
      onSearch: '&',
      query: '@'
    },
    templateUrl: '/js/components/searchbox.template.html'
  });
