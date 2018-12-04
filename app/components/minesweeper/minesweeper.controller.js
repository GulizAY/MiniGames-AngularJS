function initMinesweeperGame($scope) {
  $scope.isGameOver = false;
  $scope.score = 0;
  $scope.point = 10;
}

angular.module('minesweeperApp', ['ui.router'])
 .controller('minesweeperCtrl', ['$scope',function($scope){
   $scope.title = "Minesweeper Game"
   initMinesweeperGame($scope);

   $scope.newGame = function() {
    console.log("click new game button")
    initMinesweeperGame($scope);
     window.location.reload();
   }
 }])