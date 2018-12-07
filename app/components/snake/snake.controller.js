function initSnakeGame($scope)
{
  $scope.isGameOver = false;
  $scope.score = 0;
  $scope.point = 10;
}

angular.module('snakeApp', ['ui.router'])
 .controller('snakeCtrl', ['$scope', function($scope) {
    $scope.title = "Snake"
    $scope.newGame = function() {
      console.log("click new game button")
      initSnakeGame($scope);
       window.location.reload();
     }
 }])