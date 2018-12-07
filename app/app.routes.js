angular.module('routerApp',['ui.router'])
 .config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/minesweeper');
   $stateProvider
    .state('minesweeper', {
      url: '/minesweeper',
      templateUrl: 'app/components/minesweeper/minesweeper.html',
      controller: 'minesweeperCtrl'
    })
    .state('memoryMatch', {
      url: '/memory-match',
      templateUrl: 'app/components/memory-match/memory-match.html',
      controller: 'memoryMatchCtrl'
    })
    .state('swapi', {
      url: '/swapi',
      templateUrl: 'app/components/swapi/swapi.html',
      controller: 'swapiCtrl'
    })
    .state('snake', {
      url: '/snake',
      templateUrl: 'app/components/snake/snake.html',
      controller: 'snakeCtrl'
    })
 })