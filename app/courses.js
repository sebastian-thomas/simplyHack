(function(){

	var app = angular.module('course', []);

	app.controller('CoursesController',['$http',function($http){
		var userc = this;
		userc.courses = [];
		$http.get('engine/index.php/user/courses')
			.success(function(data){
				userc.courses = data;
			})
			.error(function(){
				console.log("Error");
			});
	}]);

})();