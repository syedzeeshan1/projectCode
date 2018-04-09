(function () {
    "use strict";
    //var app = angular.module('mainApp', ['ngRoute','ngCookies']);
    app.controller('loginController', function ($scope , $http, $location, $rootScope, AuthenticationService) {
        $scope.error123 = '';
        $scope.fetchroll = function(){
            $scope.rollno = '1604-';
        };
        AuthenticationService.ClearCredentials();
        $scope.login = function(){
            if($scope.username == '' )
            {
                $scope.username = $scope.rollno;
            }
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                console.log(response);
                if(response.data.success == '200') {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/demo');

                }
                else if(response.data.success == '201'){
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/adminDashboard');
                } 
            });
        };

    });

}());