(function(){

	var app = angular.module('profile', []);

	app.controller('ProfileController',['$http',function($http){

		var profile = this;
		profile.user = [];
		$http.get('engine/index.php/user')
			.success(function(data){
				profile.user= data;
			})
			.error(function(){
				console.log("Error");
			});


	}]);

	app.filter('dateToISO', function() {
	  return function(input) {
	    return new Date(input).toISOString();
	  };
	});

})();