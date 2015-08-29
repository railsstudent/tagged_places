'use strict';

/* Directives */


// https://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-2-isolate-scope
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('myFacebook', [function() {
  	return {
  		restrict: 'A',
  		scope: {
  			permissions: '@',
  			places: '=',
  			previous: '=',
  			next: '='
		},
  		link: function _link(scope, element, attributes) {

  			// https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v1.0
			// Load the SDK asynchronously
	        (function(d) {
	          var js, id = 'facebook-jssdk',
	            ref = d.getElementsByTagName('script')[0];
	          if (d.getElementById(id)) {
	            return;
	          }
	          js = d.createElement('script');
	          js.id = id;
	          js.async = true;
	          js.src = "//connect.facebook.net/en_US/all.js";
	          ref.parentNode.insertBefore(js, ref);
	        }(document));

			// Initialize FB
	        window.fbAsyncInit = function() {
         	console.log('before fb init');
	          FB.init({
	            appId: '165552340444163',
	            status: true, // check login status
	            cookie: true, // enable cookies to access the session
	            xfbml: false // parse XFBML
	          });

	          console.log('after fb init');
	      	
	          //Check FB Status
	          FB.getLoginStatus(function(response) {
	            console.log('getLoginStatus - ' + response);
	            if (response.status === 'connected') {
	            	scope.logged = true;
           			scope.loadMyInfo();
           			console.log('load my info');
	            } else {
	            	/*FB.login(function(response){
	            		console.log(response);
	            		if (response.status === 'connected') {
	            			scope.loadMyInfo();
	            		}
	            	}, {scope: scope.permissions});*/
	          		scope.logged = false;
	            }
	          });
	      	};
  		},
  		controller: function _controller($scope) {
  			$scope.loadTaggedPlaces = function _loadFriends() {
  				FB.api('/me/tagged_places', function(response) {
  					$scope.$apply(function() {
  						$scope.places = response.data;
  						$scope.next = response.paging.next;
  						$scope.previous = response.paging.previous;
  						console.log('number of tagged places - ' + 
  							$scope.places.length);
  						console.log('previous - ' + $scope.previous);
  						console.log('next - ' + $scope.next);
  					});
  				});
  			};

  			$scope.loadMyInfo = function _loadMyInfo() {
				FB.api('/me', function(meResponse) {
            		$scope.$apply(function() {
	            		$scope.username = meResponse.name;
	            		console.log('meResponse.name - ' + meResponse.name);
	            		console.log('scope.username  - ' + $scope.username );
	    		        $scope.logged = true;
	    		        $scope.loadTaggedPlaces();
	            	});
	            });
  			};

  			$scope.myLogin = function _myLogin() {
	            FB.login(function(response){
	            	console.log(response);
	            	if (response.status === 'connected') {
	            		$scope.loadMyInfo();
	            	}
	            }, {scope: $scope.permissions});
  			};
  		},
  		templateUrl : 'partials/greeting.html'
  	};
  }]);
