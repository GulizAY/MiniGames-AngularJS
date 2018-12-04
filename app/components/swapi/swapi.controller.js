

angular.module('swapiApp',['ui.router'])
 .controller('swapiCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.title = 'SWAPI Get Planets';
    // $scope.datas = [];
    // initSwapi($http);

    $http({
      method: "GET",
      url: "https://swapi.co/api/planets",
      params: {}
  
    }).then(function mySuccess(response) {
        // a string, or an object, carrying the response from the server.
        console.log(response)
        //console.log(response.data)
        $scope.datas = response.data.results;
        //$scope.$parent.result = angular.fromJson(response.data.results);
        $scope.dataPlanets = response.data.results;

      }, function myError(response) {
        $scope.message = 'api get request failed!';
    });

    $scope.fetchData = function() {
      console.log("click fetchData")
      
      window.location.reload();
    }

 }])