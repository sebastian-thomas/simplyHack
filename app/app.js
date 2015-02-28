(function() {

    var memebers = [{
        name: 'Me',
        avatar: 'assets/img/avatar1.png'
    }, {
        name: 'Aslam',
        avatar: 'assets/img/avatar1.png'
    }, {
        name: 'Seb',
        avatar: 'assets/img/avatar2.png'
    }, {
        name: 'Ibru',
        avatar: 'assets/img/avatar3.png'
    }];

    var app = angular.module('myapp', ['course','ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/public', {
                templateUrl: 'app/views/public_profile.html'
            }).
            when('/team', {
                templateUrl: 'app/views/team.html'
            }).
            when('/course', {
                templateUrl: 'app/views/courses.html'
            }).
            otherwise({
                redirectTo: '/public'
            });
        }]);

    app.controller('Discussion', function() {
            var activebtn=null;

            this.setActiveBtn=function(num){
                console.log(num+'s')
                activebtn=num;
            };
            this.getActiveBtn=function(){
                return activebtn;
            };

            this.doSubmit=function(){
                console.log('d')
                alert('d')
                if(activebtn==null)
                    alert('Entry must be question or statement');
            };

        })
        .controller('TeamMember', ['$scope', function($scope) {
            $scope.team = memebers;

        }]);

    app.directive('header', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/views/header.html'
            };
        })
        .directive("footer", function() {
            return {
                restrict: 'E',
                templateUrl: 'app/views/footer.html'
            };
        });


})();