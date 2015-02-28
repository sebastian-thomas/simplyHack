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

    var discuss=[{
        type:'q',
        text:"what is ng app in angular js"
    },
    {
        type:'s',
        text:"Iam awsome.!"
    }]

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
            var activebtn='q';
            this.data=discuss;

            this.liveDiscuss={
                type:activebtn,
                text:''
            };

            this.setActiveBtn=function(num){
                this.liveDiscuss.type=num;
                activebtn=num;
            };
            this.getActiveBtn=function(){
                return activebtn;
            };

            this.doSubmit=function(){
                if(activebtn==null)
                    alert('Entry must be question or statement');
                else{
                    this.data.push(this.liveDiscuss);
                    console.log(this.data);
                    activebtn='q';
                    this.liveDiscuss={
                        type:activebtn,
                        text:''
                    };
                }
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