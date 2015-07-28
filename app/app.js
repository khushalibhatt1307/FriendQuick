/**
 * Created by Khushali.
 */


'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'firebase',
    'QF_controllers',
    'friendQuick.search', 'friendQuick.profile', 'friendQuick.viewProfile','friendQuick.blockUser','friendQuick.results',
    'friendQuick.friends'])

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

        .when('/blockUser/:selectedUserId', {
            templateUrl: 'blockUser.html',
            controller: 'blockUserCtrl'
        })
        .when('/friends', {
            templateUrl: 'views/friends.html',
            controller: 'friendsController'
        })
        .otherwise({
            redirectTo: '/login'
        });

}])
.run(function($rootScope, $location, userSession) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if (!userSession.uid) {
            // no logged user, redirect to /login
            $location.path("/login");
        }
    });
})

.value('userSession', {})

;
