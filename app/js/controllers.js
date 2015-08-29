'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

	// http://stackoverflow.com/questions/25627683/error-compilenonassign-expression-undefined-used-with-directive-myfacebo
  	//$scope.username = '';
  	//$scope.myTaggedPlaces = [];
  	console.log('username - ' + $scope.username); 
  	console.log('places - ' + $scope.myTaggedPlaces); 
  }]);
