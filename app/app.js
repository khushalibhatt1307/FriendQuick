/**
 * Created by Khushali.
 */


'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'firebase',
    'QF_controllers',
    'friendQuick.search', 'friendQuick.profile', 'friendQuick.viewProfile','friendQuick.results'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/results', {
            templateUrl: 'views/results.html',
            controller: 'resultsController'
        })
        .when('/addProfile', {
            templateUrl: 'addProfile.html',
            controller: 'addProfileCtrl'
        })
        .when('/viewProfile/:selectedUserId', {
            templateUrl: 'viewProfile.html',
            controller: 'viewProfileCtrl'
        })
        .when('/firebase_practice', {
            templateUrl: 'angularfire_practice.html',
            controller: 'angularfire_practiceCtrl'
        })
        .when('/friends', {
            templateUrl: 'views/friends.html',
            controller: 'friendsCtrl'
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
