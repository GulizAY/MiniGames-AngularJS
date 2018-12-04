function createMinesweeperBoard() {
  var minefield = {};
  minefield.rows = [];

  var fieldNumber = 9;
  var mineNumbers = [];

  var id = 0;

  for (var n = 0; n < fieldNumber; n++) {
    var mineFieldNum=Math.round((Math.random()*((fieldNumber*fieldNumber))));
    mineNumbers.push(mineFieldNum)
  }

  for (var i = 0; i < fieldNumber; i++) {
    var row = {};
    row.props = [];

    for (var j = 0; j < fieldNumber; j++) {
      var prop = {};

      prop.id = id;
      prop.isCovered = true;
      prop.colorClass = "default";

      if (mineNumbers.indexOf(id) > -1) {
        prop.hasMine = true;
      }
      else {
        prop.hasMine = false;
      }
      
      row.props.push(prop);
      id = id + 1;
    }

    minefield.rows.push(row);
  }

  return minefield;
}

angular.module('minesweeperApp')
  .component('minesweeperBoard', {
    templateUrl: 'app/components/minesweeper/board/minesweeper-board.template.html',
    controller: function gameBoardCtrl($scope) {
      this.minesweeperBoard = createMinesweeperBoard();
      this.mineClick = function(prop) {
        
        if($scope.$parent.isGameOver)
        {
          window.alert("sorry, game is over.")
          return;
        }
        
        console.log("minefield click button, id:" + prop.id)
        prop.isCovered = false;
        if(prop.hasMine)
        {
          console.log("game over!")
          prop.colorClass = "danger"
          $scope.$parent.isGameOver = true;
        }
        else
        {
          prop.colorClass = "success";
          
          //console.log("score: " + parseInt($scope.$parent.score));
          $scope.$parent.score = parseInt($scope.$parent.score) + parseInt($scope.$parent.point);
        }
      }
    }
  })