'use strict';

(function(){

class FoodsComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.foods = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('food');
    });
  }

  $onInit() {
    this.$http.get('/api/foods')
      .then(response => {
        this.foods = response.data;
        this.socket.syncUpdates('food', this.foods);
      });
  }
  addFood() {
    if (this.newFood) {
      this.$http.post('/api/foods', {
        name: this.newFood
      });
      this.newFood = '';
    }
  }

  deleteFood(food) {
    this.$http.delete('/api/foods/' + food._id);
  }

}

angular.module('logappApp')
  .component('foods', {
    templateUrl: 'app/foods/foods.html',
    controller: FoodsComponent,
    // controllerAs: Foods
  });

})();
