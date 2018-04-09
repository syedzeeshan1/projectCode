// (function(){
//    "use strict";
 var app = angular.module('mainApp', ['ngRoute','ngCookies']);
 app
 .config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "login.html",
        controller: "loginController"
    })
    .when("/adminDashboard", {
        templateUrl: "adminDashboard.html",
        controller: "adminDashboardController"
    })
    .when("/register",{
        templateUrl: "register.html",
        controller: "registerController"
    })
    .otherwise({
        redirectTo: "/"
    });
 });
 app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}])
.run(['$rootScope', '$location', '$cookieStore', '$http',
function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    $rootScope.$on('$locationChangeStart', function(event, next, current){
        if($location.path() == '/' && $rootScope.globals.currentUser)
        {
            $location.path('/adminDashboard');
            alert("You can log out only with the logout button!");
        }
    })

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() == '/adminDashboard' && !$rootScope.globals.currentUser) {
            $location.path('/');
        }
    });
}]);
// }());