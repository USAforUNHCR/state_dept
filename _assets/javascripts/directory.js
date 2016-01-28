'use-strict'

var directoryApp = angular.module('directoryApp',['ngRoute','directoryControllers'],function($interpolateProvider){
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


directoryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/people', {
        templateUrl: '/partials/people.html',
        controller: 'PeopleCtrl'
      }).
      when('/orgs', {
        templateUrl: '/partials/orgs.html',
        controller: 'OrgCtrl'
      }).
      when('/projects', {
        templateUrl: '/partials/projects.html',
        controller: 'ProjCtrl'
      }).
      when('/projects/:projectId', {
        templateUrl: '/partials/project-detail.html',
        controller: 'ProjDetailCtrl'
      }).
      otherwise({
        redirectTo: '/people'
      });

  }]);

directoryControllers = angular.module('directoryControllers', []);

directoryControllers.controller('PeopleCtrl',['$scope','data', function($scope, data){
  $scope.people = data;
  $scope.orderProp = 'name';
}]);

directoryControllers.controller('OrgCtrl',['$scope','data', function($scope, data){
  $scope.orgs = data;
  $scope.orderProp = 'organization';
  $scope.reverse = false;
}]);

directoryControllers.controller('ProjCtrl',['$scope','data', function($scope, data){
  $scope.projects = data;
}]);

directoryControllers.controller('ProjDetailCtrl',['$scope','data', '$routeParams', function($scope, data, $routeParams){
  $scope.projects = data;
  $scope.projectId = $routeParams.projectId;
  $scope.project = $scope.projects[$scope.projectId];
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
      var i = 0;
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














