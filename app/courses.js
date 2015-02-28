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

		userc.rangev = function(min,max){
			chapters = [];
			min++;
			for(i= min; i<=max;++i){
				chapters.push(i);
			}
			return chapters;
		};

		userc.finishChapter = function(cid,chap){
			console.log(cid);
			var postData = {
				'course' : cid
			};
			$http({
	            url: 'engine/index.php/user/incrch',
	            method: "POST",
	            data:$.param({
			      "course" : cid
			    }),
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	        }).success(function (data, status, headers, config) {
	                console.log(data);
	                document.getElementById('btn'+chap).disabled = true;
	                //console.log(headers);
	        }).error(function (data, status, headers, config) {
	                console.log(data);
	            });
		};
	}]);

})();