function initMemeoryMatchGame($scope) {
  $scope.isGameOver = false;
  $scope.countMatching = 0;
  $scope.message = "";
  $scope.score = 0;
  $scope.cards = ['happy.png', 'sohappy.png', 'laugh.png', 'bored.png', 'nerd.png', 'quiet.png', 'secret.png', 'surprised.png', 'suspicious.png', 'tongue-out.png'];
  $scope.cardNumber = $scope.cards.length;
  $scope.claim = $scope.cardNumber * 2;
  $scope.rightPoint = $scope.cardNumber;

  $scope.firstCard = {};
  $scope.firstCardSelected = false;
}

angular.module('memoryMatchApp',['ui.router'])
 .controller('memoryMatchCtrl', ['$scope', function($scope) {
   $scope.title = "Memory Matching Emoji Game";
   initMemeoryMatchGame($scope);

  $scope.newGame = function() {
    console.log("click new game button")
    initMemeoryMatchGame($scope);
    window.location.reload();
  }

}])