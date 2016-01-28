'use-strict'

var directoryApp = angular.module('directoryApp',[],function($interpolateProvider){
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

directoryApp.controller('DirectoryCtrl',['$scope','$http', function($scope,$http){
  window.MY_SCOPE = $scope;

  var url = 'https://spreadsheets.google.com/feeds/list/1dEDs3fMT_HZ5IaHBFxIsL0lh2cGQ4FO0VodrnBR0_9k/omubos6/public/values?alt=json';
  var parse = function(entry) {
    var name = entry['gsx$name']['$t'];
    var organization = entry['gsx$organization']['$t'];
    var summary = entry['gsx$summary']['$t'];
    return {
      name: name,
      organization: organization,
      summary: summary
    };
  }
  $http.get(url)
  .success(function(response) {
    var entries = response['feed']['entry'];
    $scope.parsedEntries = [];
    for (key in entries){
      var content = entries[key];
      $scope.parsedEntries.push(parse(content));
    }
  });

  $scope.predicate = 'name';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

}]);

directoryApp.controller('PeopleCtrl',['$scope','data', function($scope, data){
  window.PEOPLE_SCOPE = $scope;
  $scope.parsedEntries = data;
}]);



angular.module('directoryApp').factory('data', function($http){
  var url = 'https://spreadsheets.google.com/feeds/list/1dEDs3fMT_HZ5IaHBFxIsL0lh2cGQ4FO0VodrnBR0_9k/omubos6/public/values?alt=json';
  var parse = function(entry) {
    var name = entry['gsx$name']['$t'];
    var organization = entry['gsx$organization']['$t'];
    var summary = entry['gsx$summary']['$t'];
    var id = entry.id;
    return {
      id: id,
      name: name,
      organization: organization,
      summary: summary
    };
  }

  function getEntries(){
    var parsedEntries = [];
    $http.get(url)
    .success(function(response) {
      var entries = response['feed']['entry'];
      var i = 1;
      for (key in entries){
        var content = entries[key];
        content.id = i;
        parsedEntries.push(parse(content));
        i ++;
      }
    });
    return parsedEntries;
  }

  return getEntries();

});














