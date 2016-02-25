
function Filter() {
  this.query = {
    value: '',
    predicate: function(facility, filter) {
      return facility.description.indexOf(filter.query.value) >= 0;
    }
  };
  this.type = {
    value: [],
    predicate: function(facility, filter) {
      return filter.type.value.indexOf(facility.type) >= 0;
    }
  };
}
