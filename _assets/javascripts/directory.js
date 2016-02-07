'use-strict'



var directoryApp = angular.module('directoryApp',['ngRoute','directoryControllers','firebase'],function($interpolateProvider){
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

directoryApp.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/login");
  }
});
}]);



directoryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/people', {
        templateUrl: '/partials/people.html',
        controller: 'PeopleCtrl',
        resolve: {
                    "currentAuth": ["auth", function(auth) {
                        return auth.$requireAuth();
                    }]
        }
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
        controller: 'PersonCtrl',
        resolve: {
          "currentAuth": ['auth', function(auth) {
            return auth.$requireAuth();
          }]
        }
      }).
      when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          "currentAuth" : ['auth', function(auth){
            return auth.$waitForAuth();
          }]
        }
      }).
      otherwise({
        redirectTo: '/projects'
      });

  }]);

directoryControllers = angular.module('directoryControllers', []);

directoryControllers.controller('PeopleCtrl',['$scope','data','auth', function($scope, data, auth){
  highlightActive();

  window.PEOPLE_SCOPE = $scope;
  $scope.people = data;
  $scope.orderProp = 'lName';
  

}]);

directoryControllers.controller('LoginCtrl',['$scope','auth', '$location', function($scope,auth,$location){
  $scope.authObj = auth;
  $scope.password = null;

  $scope.authorize = function(password){
    $scope.error = null;
    $scope.authObj.$authWithPassword({
      "email": "user@refugeeedtechsolutions.com",
      "password": password
    }).
    then(function(authData){
      $location.path('/people');
    }).
    catch(function(error){
      $scope.error = error;
      console.log(error);
    });
  }
}])

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



angular.module('directoryApp').factory('data',['$firebaseArray', function($firebaseArray){
  
    var ref= new Firebase("https://intense-heat-9739.firebaseio.com/participants");
  
    var peopleArr = $firebaseArray(ref);

    return peopleArr;
}]);

angular.module('directoryApp').factory('auth',['$firebaseAuth',function($firebaseAuth){
  var ref= new Firebase("https://intense-heat-9739.firebaseio.com");
  return $firebaseAuth(ref);
}]);











