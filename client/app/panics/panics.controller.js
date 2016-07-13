'use strict';

(function(){

class PanicsComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.panics = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('panic');
    });
  }

  $onInit() {
    this.$http.get('/api/panics')
      .then(response => {
        this.panics = response.data;
        this.socket.syncUpdates('panic', this.panics);
      });
  }
  addPanic() {
    if (this.newPanic) {
      this.$http.post('/api/panics', {
        name: this.newPanic
      });
      this.newPanic = '';
    }
  }

  deletePanic(panic) {
    this.$http.delete('/api/panics/' + panic._id);
  }

}

angular.module('logappApp')
  .component('panics', {
    templateUrl: 'app/panics/panics.html',
    controller: PanicsComponent,
    // controllerAs: Panics
  });

})();
