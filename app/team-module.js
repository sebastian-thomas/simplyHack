(function(){


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
        text: "I am awsome!"
    }];



	var app = angular.module('team', []);

	app.controller('Discussion', function($scope,$http) {
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
        .controller('TeamMember', ['$scope','$http', function($scope,$http) {
            
            $http.get('engine/index.php/teammem')
                        .success(function(data){
                            $scope.team = data.memebers;
                            console.log(data.memebers)
                        })
                        .error(function(){
                            console.log("Error");
            });


        }])
        .controller("BarCtrl",['$scope','$http', function($scope,$http) {
            
            $scope.options={
                responsive: false
            };
            $scope.labels = [];
            $scope.data=[[]];

            $http.get('engine/index.php/teammem')
                    .success(function(data){
                        $scope.team = data.memebers;
                        jQuery.each($scope.team,function(index,data){
                            $scope.labels.push(data.username.split(" ")[0]);
                            $scope.data[0].push(data.teamlevel)
                        });
                    })
                    .error(function(){
                        console.log("Error");
            });
        

        }]);

})();