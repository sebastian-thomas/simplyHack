(function(){

	var app = angular.module('course', []);

	app.controller('CoursesController',['$http',function($http){
		var userc = this;
		userc.courses = [];
		userc.unenCourses = [];
		$http.get('engine/index.php/user/courses')
			.success(function(data){
				userc.courses = data;
			})
			.error(function(){
				console.log("Error");
			});

		$http.get('engine/index.php/unenrolledcou')
			.success(function(data){
				userc.unenCourses = data;
				console.log("data");
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

		userc.enroll = function(cid){
			console.log(cid);
			$http({
	            url: 'engine/index.php/enroll',
	            method: "POST",
	            data:$.param({
			      "course" : cid
			    }),
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	        }).success(function (data, status, headers, config) {
	                console.log(data);
	                document.getElementById('enrollbtn'+cid).innerHTML = "Enrolled";
	                //console.log(headers);
	        }).error(function (data, status, headers, config) {
	                console.log(data);
	            });
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