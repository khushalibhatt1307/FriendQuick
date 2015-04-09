'use strict';

angular.module('QF_controllers', ['ngRoute','firebase', 'ngStorage'])


//.controller('LoginCtrl', ['$scope','userSession', '$location', '$rootScope','$firebaseAuth', 'Log_in_out',
//        function($scope, userSession, $location, $rootScope, $firebaseAuth, Log_in_out) {
.controller('LoginCtrl', ['$scope', 'Log_in_out',
        function($scope, Log_in_out) {

        //$scope.facebook_login = function(home){
        //    //var ref = new Firebase("https://quickfriend.firebaseio.com");
        //
        //    var auth = Log_in_out;
        //    auth.$authWithOAuthPopup("facebook",{remember:"none"}).then(function(authData){
        //        //console.log('Loggin', authData.uid);
        //
        //    });
        //
        //
        //};

            $scope.facebook_login = Log_in_out.facebook_login;

}])

.controller('HomeCtrl', ['$scope','$rootScope','userSession','$location', '$window', 'Log_in_out', '$localStorage',
        function($scope, $rootScope, userSession, $location, $window, Log_in_out, $localStorage){
            console.log(userSession);
            console.log('session:',$window.sessionStorage);

            //if (!userSession.uid){
            //
            //    $location.path('/login');
            //}
            //$scope.name = userSession.name;


            console.log($scope.name);

            $scope.facebook_logout = Log_in_out.facebook_logout;


        }])
    
.factory('Log_in_out', ['$firebaseAuth', 'userSession', '$location',
        function ($firebaseAuth, userSession, $location) {

            var ref = new Firebase("https://quickfriend.firebaseio.com");
            var auth = $firebaseAuth(ref);

            var obj = {

                facebook_login: function(home){
                      auth.$authWithOAuthPopup('facebook',{remmenber:"none"}).then(function(authData){
                          userSession.uid = authData.uid;
                          userSession.name = authData.facebook.displayName;
                          $location.path(home);
                      });
                },


                facebook_logout: function () {
                    auth.$unauth();
                    $location.path('/login');
                }

            };

            return obj

    }])



;
