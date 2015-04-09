'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'QF_controllers'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/nav', {
            templateUrl: 'nav.html',
            controller: 'HomeCtrl'
        })
        .when('/profile', {
            templateUrl: 'profile.html'
            //controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });

}])

.value('userSession', {})

//
//.run(function( $rootScope , $location){
//
//        $rootScope.$on( "$routeChangeStart", function (event, next, current) {
//                if ($rootScope.loggeduser == null){
//                    // no logged user, we should be going to #login
//                    if (next.templateUrl == 'login/login.html'){
//
//                    }else{
//                        $location.path("/login");
//                    }
//                }
//            }
//
//        );
//
//    })

;
