(function () {
    "use strict";
    //var app = angular.module('mainApp', ['ngRoute','ngCookies']);
    app.controller('registerController', function ($scope , $http, $location, $rootScope) {
        $scope.fetchroll = function(){
            $scope.rollno = '1604-';
        };
        $scope.registerStud = function(){
            $scope.dept = $scope.rollno.substring(8,11);
            if($scope.dept == "733")
            {
                $scope.dept = "CSE";
            }
            $scope.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            $scope.password = "";
            for (var i = 0; i < 5; i++)
            {
              $scope.password += $scope.possible.charAt(Math.floor(Math.random() * $scope.possible.length));
            }
            $scope.sample = {
                "name": $scope.name,
                "email": $scope.email,
                "rollno": $scope.rollno,
                "role": "Student",
                "request": "pending",
                "dept":$scope.dept,
                "password":$scope.password
            };
            console.log($scope.sample);
            $http({
                "method": "POST",
                "url" : "http://mohsin52.pythonanywhere.com/api/createUser",
                "data" : $scope.sample
            }).then(
                function(response){
                    console.log(response);
                    if(response.data.success == 200)
                    {
                        $scope.apiResponse = "Success!"
                        $('#myModal').modal('show');
                    }
              }, function myError(response) {
                $scope.apiResponse = "Error! Please try again.."
                $('#myModal').modal('show');
            });

        };
        $scope.modalClose = function() {
            $("#myModal").modal("hide");
            $location.path('#!');
        };
            

    });

}());