
'use strict';
//angular.module('friendQuick.profile', [])
//If it is own profile edit, submit, upload photo button are enabled but if it is just view profile are buttons should be disabled.


angular.module('friendQuick.viewProfile', []).controller('viewProfileCtrl', ["$scope", "$firebaseArray",'userData', '$routeParams', function($scope, $firebaseArray, userData, $routeParams  ) {
        // .controller('addProfileCtrl', ['$scope', function($scope) {
        // $scope.addProfile = function() {
        //$scope.master = {};
    $scope.disableEdit  = true;
    var userId = $routeParams.selectedUserId;

    console.log($routeParams.selectedUserId);


    function init() {
        //Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
        //var userId ="Ashwini@gmaildotcom";
        var FirebaseURL ="https://quickfriend.firebaseio.com/";
        var root = "users/";
        var FirebaseRef = new Firebase(FirebaseURL);
        var FirebaseUsrRef  = FirebaseRef.child (root);
        //var FirebaseSync = $firebase(FirebaseUsrRef);
        var list = $firebaseArray(FirebaseUsrRef);

        $scope.list = list;
        console.log(list);
        // Note that the data will not be available immediately since retrieving it is an asynchronous operation.
        // You can use the $loaded() promise to get notified when the data has loaded.
        list.$loaded().then(function(array) {
            var userId_got = list.$getRecord(userId);
            console.log (userId_got);
            if ( userId_got != null) {
                console.log("I am in if");
                $scope.City = userId_got.City;
                $scope.Country = userId_got.Country;
                $scope.Interests = userId_got.Interests;
                $scope.State = userId_got.State  ;
                $scope.Street = userId_got.Street ;
                $scope.Zip = userId_got.Zip;
                $scope.Name = userId_got.Name;
                $scope.newProfileImageData =userId_got.imageData;
            } else {
                //console.log("I am in else");
                $scope.City = "Your City";
                $scope.Country = "Your Country";
                $scope.Interests = "Your Interests";
                $scope.State = "Your State";
                $scope.Street = "Your Street";
                $scope.Zip = "Your ZIP";
                $scope.Name = "Your Name";
                $scope.newProfileImageData =null;
            }
        });
    }
    init();
    }]);


