(function() {

   var memebers;

    var app = angular.module('myapp', ['course','profile','team', 'ngRoute', 'chart.js']);

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
        when('/enroll', {
            templateUrl: 'app/views/enroll.html'
        }).
        otherwise({
            redirectTo: '/public'
        });
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
        }).directive('ngEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.ngEnter, {
                                'event': event
                            });
                        });

                        event.preventDefault();
                    }
                });
            };
        });;


})();