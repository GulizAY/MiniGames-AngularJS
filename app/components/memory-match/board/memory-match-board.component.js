function getImgSrc(prop)
{
  let baseSrc = 'assets/img/';
  let returnSrc = '';

  if(prop.isMatch)
  {
    returnSrc = baseSrc + 'trophy.png'
  }
  else
  {
    if(prop.isCovered)
    {
      returnSrc = baseSrc + 'emoji.jpg'
    }
    else
    {
      returnSrc = baseSrc + 'emoji/' + prop.emojiName
    }
  }

  //console.log(returnSrc)
  return returnSrc;
}

function createRandomCards($scope)
{
  var cardNumber = $scope.$parent.cardNumber * 2;

  var id = 1;

  // cards = {1:x,2:y,3:z,4:x,5:y,6:z} gibi siralanir
  var _randomCards = [];
  for (var n = 1; n <= cardNumber; n++) {
    var _card = {};
    _card.id = n;
    _card.name = $scope.$parent.cards[( n >= 11 ? n-11 : n-1)];
    _randomCards.push(_card)
  }

  var randomCards = [];
  for (var a = _randomCards, b = a.length; b--; ) {
    var randomCard = a.splice(Math.floor(Math.random() * (b + 1)), 1)[0];
    randomCards.push(randomCard);
  }

  //console.log(randomCards)
  return randomCards;
}

function createMemoryMatchBoard($scope) {
  var randomCards = createRandomCards($scope);
  
  var board = {};
  board.cards = [];

  // draw board
  var index = 0;
  for (var i = 0; i < ((randomCards.length/4)-1); i++) {
    var card = {};
    card.props = [];

    for (var j = 0; j < ((randomCards.length/4)); j++) {
      var prop = {};

      var item = randomCards[index];
      prop.id = "card"+ item.id.toString();
      prop.isCovered = true;
      prop.isMatch = false;
      prop.emojiName = item.name; 
      prop.imgSrc = getImgSrc(prop);

      card.props.push(prop);
      index = index + 1;
    }

    board.cards.push(card);
  }

  return board;
}

function changeImg(id, src)
{
  var $item = document.getElementById(id);
  //console.log($item)
  $item.getElementsByTagName('img').item(0).src = src;
}

angular.module('memoryMatchApp')
 .component('memoryMatchBoard', {
   templateUrl: 'app/components/memory-match/board/memory-match-board.template.html',
   controller: function memoryMatchBoardCtrl($scope) {
      this.memoryMatchBoard = createMemoryMatchBoard($scope);
      
      this.cardClick = function(prop) {
        if(prop.isMatch || ($scope.$parent.firstCard.id === prop.id))
          return;

        if($scope.$parent.isGameOver)
        {
          window.alert("sorry, game is over.")
          return;
        }
        
        if($scope.$parent.countMatching === $scope.$parent.cardNumber)
        {
          window.alert("Congratulations, you win :) ")
          return;
        }

        // selected card info
        //console.log("card click button, id:" + prop.id)
        prop.isCovered = false;

        // open selected card
        prop.imgSrc = getImgSrc(prop);
        changeImg(prop.id, prop.imgSrc);

        // first card select
        if($scope.$parent.firstCardSelected === false)
        {
          $scope.$parent.firstCardSelected = true;
          var _prop = prop;
          $scope.$parent.firstCard = _prop;

          return;
        }
        
        //#region: second card select

        // card match wrong
        if($scope.$parent.firstCard.emojiName !== prop.emojiName)
        {
          //console.log("eslesme hatali")
          $scope.$parent.claim -= 1;
          $scope.$parent.firstCard.isCovered = true;
          prop.isCovered = true;

          if ($scope.$parent.claim < 0)
          {
            //console.log("game over!")
            $scope.$parent.isGameOver = true;
          }
        }
        else // card match true
        {
          //console.log("eslesme basarili")
          $scope.$parent.countMatching++;
          $scope.$parent.firstCard.isMatch = true;
          prop.isMatch = true;

          $scope.$parent.score = parseInt($scope.$parent.score) + parseInt($scope.$parent.rightPoint);
        }

        var closeCard = setInterval(function() {
          $scope.$parent.firstCard.imgSrc = getImgSrc($scope.$parent.firstCard); 
          changeImg($scope.$parent.firstCard.id, $scope.$parent.firstCard.imgSrc);
  
          prop.imgSrc = getImgSrc(prop);
          changeImg(prop.id, prop.imgSrc);
  
          // set firstCard unselected
          $scope.$parent.firstCard = {};
          $scope.$parent.firstCardSelected = false;

          if($scope.$parent.countMatching === $scope.$parent.cardNumber)
          {
            $scope.$parent.message = "Congratulations, you win :) ";
            window.alert("Congratulations, you win :) ")
          }

          clearInterval(closeCard);
        }, 500);

      }
   }
 })