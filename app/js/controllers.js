'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {

  	$scope.loadNextPage = function _loadNextPage() {
  		$http.get($scope.next).then(function(response) {
  			var data = response.data;
  			$scope.myTaggedPlaces = data.data;
  			$scope.previous = data.paging.previous;
  			$scope.next = data.paging.next;
  		}, function(response) {
  			$scope.myTaggedPlaces = [];
  			$scope.previous = undefined;
  			$scope.next = undefined;
  		});
  	};

  	$scope.loadPrevPage = function _loadPrevPage() {
  		$http.get($scope.previous).then(function(response) {
  			var data = response.data;
  			$scope.myTaggedPlaces = data.data;
  			$scope.previous = data.paging.previous;
  			$scope.next = data.paging.next;
  		}, function(response) {
  			$scope.myTaggedPlaces = [];
  			$scope.previous = undefined;
  			$scope.next = undefined;
  		});
  	};
  }]);
