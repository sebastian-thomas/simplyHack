(function() {

    var memebers = [{
        name: 'Me',
        avatar: 'assets/img/avatar1.png',
        teamlevel:80
    }, {
        name: 'Aslam',
        avatar: 'assets/img/avatar1.png',
        teamlevel:60
    }, {
        name: 'Seb',
        avatar: 'assets/img/avatar2.png',
        teamlevel:70
    }, {
        name: 'Ibru',
        avatar: 'assets/img/avatar3.png',
        teamlevel:60
    }];

    var discuss = [{
        type: 'q',
        username: 'Aslam',
        text: "what is ng app in angular js",
        answers: [{
            username: 'Me',
            text: 'ng-app directive defines an AngularJS application'
        }]
    }, {
        type: 's',
        username: 'Me',
        text: "Iam awsome!"
    }]

    var app = angular.module('myapp', ['course','profile', 'ngRoute', 'chart.js']);

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
        when('/course', {
            templateUrl: 'app/views/entroll.html'
        }).
        otherwise({
            redirectTo: '/public'
        });
    }]);

    app.controller('Discussion', function($scope) {
            var activebtn = 'q';
            this.answerTemp = '';
            this.data = discuss;
            this.activateAnswer;

            this.liveDiscuss = {
                type: activebtn,
                username: 'Me',
                text: '',
                answers: []
            };

            this.setActiveBtn = function(num) {
                this.liveDiscuss.type = num;
                activebtn = num;
            };
            this.getActiveBtn = function() {
                return activebtn;
            };

            this.doSubmit = function() {
                if (this.liveDiscuss.text.length > 0) {
                    this.data.push(this.liveDiscuss);
                    activebtn = 'q';
                    this.liveDiscuss = {
                        type: activebtn,
                        username: 'Me',
                        text: '',
                        answers: []
                    };
                }
            };
            this.answerEntered = function(index) {
                if (this.answerTemp.length != 0) {
                    this.activateAnswer[index] = 0;
                    this.data[index].answers.push({
                        username: 'Me',
                        text: this.answerTemp[index]
                    });
                    this.answerTemp[index] = '';
                }
            };

        })
        .controller('TeamMember', ['$scope', function($scope) {
            $scope.team = memebers;

        }])
        .controller("BarCtrl", function($scope) {

            $scope.labels = [];
            $scope.data=[[]];
            jQuery.each(memebers,function(index,data){
                $scope.labels.push(data.name);
                $scope.data[0].push(data.teamlevel)
            })

        });

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