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
      when('/person/:personId', {
        templateUrl: '/partials/person.html',
        controller: 'PersonCtrl'
      }).
      otherwise({
        redirectTo: '/projects'
      });

  }]);

directoryControllers = angular.module('directoryControllers', []);

directoryControllers.controller('PeopleCtrl',['$scope','data', function($scope, data){
  highlightActive();
  window.PEOPLE_SCOPE = $scope;
  $scope.people = data;
  $scope.orderProp = 'lName';
  
}]);

directoryControllers.controller('PersonCtrl',['$scope','data', '$routeParams', function($scope, data, $routeParams){
  window.PERSON_SCOPE = $scope; 
  $scope.personId = $routeParams.personId;
  $scope.people = data;
  $scope.person = $scope.people[$scope.personId];
}]);

directoryControllers.controller('OrgCtrl',['$scope','data', function($scope, data){
  $scope.orgs = data;
  $scope.orderProp = 'organization';
  $scope.reverse = false;
}]);

directoryControllers.controller('ProjCtrl',['$scope','projects', function($scope, projects){
  highlightActive();
  $scope.projects = projects;
}]);

directoryControllers.controller('ProjDetailCtrl',['$scope', '$routeParams', function($scope, $routeParams){
  $scope.projectId = $routeParams.projectId;
  $scope.partialPath = "/projects/project" + $scope.projectId + ".html";
}]);



angular.module('directoryApp').factory('data', function($http){
  var url = 'https://spreadsheets.google.com/feeds/list/1dEDs3fMT_HZ5IaHBFxIsL0lh2cGQ4FO0VodrnBR0_9k/omubos6/public/values?alt=json';
  var parse = function(entry) {
    var fName = entry['gsx$fname']['$t'];
    var lName = entry['gsx$lname']['$t'];
    var organization = entry['gsx$organization']['$t'];
    var summary = entry['gsx$summary']['$t'];
    var id = entry.id;
    return {
      id: id,
      fName: fName,
      lName: lName,
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











