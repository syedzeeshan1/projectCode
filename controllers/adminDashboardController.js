(function () {
    "use strict";
    //var app = angular.module('mainApp', ['ngRoute','ngCookies']);
    app.controller('adminDashboardController', function ($scope , $http, $location, $rootScope, AuthenticationService) {
        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;
        $scope.logout = function()
        {
            
                AuthenticationService.ClearCredentials();
                $location.path('/');
        };
        $http({
            "method": "GET",
            "url": "http://mohsin52.pythonanywhere.com/api/adminApprove"
        })
        .then(function(response){
            if(response.data.success)
            {
                $scope.data = response.data.success;
            }
        });

        $scope.acceptReq = function(data){
            console.log(data.dat);
            $scope.temp = {
                "id" : data.dat[0],
                "request": "approve"
            };
            $http({
                "method": "POST",
                "url" : "http://mohsin52.pythonanywhere.com/api/adminApprove",
                "data" : $scope.temp
            }).then(
                function(response){
                    console.log(response);
                    if(response.data.success == 200)
                    {
                        $scope.apiResponse = "Success!"
                        $('#myModal').modal('show');
                    }
              }, function myError(response) {
                  console.log(response);
                $scope.apiResponse = "Error! Please try again.."
                $('#myModal').modal('show');
            });
        };
        $scope.rejectReq = function(data){

            $scope.temp = {
                "id" : data.dat[0],
                "request": "reject"
            };
            $http({
                "method": "POST",
                "url" : "http://mohsin52.pythonanywhere.com/api/adminApprove",
                "data" : $scope.temp
            }).then(
                function(response){
                    console.log(response);
                    if(response.data.success == 200)
                    {
                        $scope.apiResponse = "Rejected Successfully!"
                        $('#myModal').modal('show');
                    }
              }, function myError(response) {
                  console.log(response);
                $scope.apiResponse = "Error! Please try again.."
                $('#myModal').modal('show');
            });
        };
        $scope.modalClose = function() {
            $("#myModal").modal("hide");
            $location.path('/adminDashboard');
        };
    });

}());    