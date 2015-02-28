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
        }])
        .controller('discussion', function() {

        })
        .controller('teamMember', ['$scope', function($scope) {
            $scope.team = memebers;

        }]).directive('header', function() {
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