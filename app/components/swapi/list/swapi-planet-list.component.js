angular.module('swapiApp')
 .component('swapiPlanetList', {
   templateUrl: 'app/components/swapi/list/swapi-planet-list.template.html',
   controller: function swapiPlanetListCtrl($scope, $http) {
     this.dataPlanets = [];

    $http({
      method: "GET",
      url: "https://swapi.co/api/planets",
      params: {}
  
    }).then(function mySuccess(response) {
        // a string, or an object, carrying the response from the server.
        console.log(response)
        //console.log(response.data)
        $scope.$parent.datas = response.data.results;
        //$scope.$parent.result = angular.fromJson(response.data.results);
        this.dataPlanets = response.data.results;

      }, function myError(response) {
        $scope.message = 'api get request failed!';
    });

    this.fetchData = function() {
      console.log("click fetchData")
      
      window.location.reload();
    }
   }
 })
  .service()