/**
 * Created by Khushali.
 */

angular.module('friendQuick.results', [])

    .controller('resultsController', ['$scope', '$route', '$http', 'userData', function($scope, $route, $http, userData) {

        $scope.zipCode = $route.current.params.zipCode;
        $scope.radius = $route.current.params.radius;

        //var url = 'http://www.zipcodeapi.com/rest/aFwqTj2BsiFtYMLkZaV6eCM6MU3JOhtYWZpQjsrMK6fJT04Sb0ZqCLwpGA8uRBtN/radius.json/' + $scope.zipCode + '/' + $scope.radius + '/mile';
        var url = 'https://www.zipwise.com/webservices/radius.php?key=yjauvgnvb9vezic0&zip=' + $scope.zipCode + '&radius=5&format=json';

        $http.get(url).
            success(function (data, status, header, config) {
                $scope.allZipCodesWithinRadius = data;
                //var data = dataService.connectFireBase();
                $scope.users = userData;

                $scope.users.$loaded(function() {
                    /*angular.forEach($scope.users, function(user) {

                        if(user.Zipcode) {
                        }
                    }*/

                    });
            }).
            error(function (data, status, header, config) {
                alert('Error fetching zip codes within radius');
            });



    }])
    .factory("userData", ["$firebaseArray",
        function($firebaseArray) {
            // create a reference to the Firebase where we will store our data
            var ref = new Firebase("https://quickfriend.firebaseio.com/users/");

            // this uses AngularFire to create the synchronized array
            return $firebaseArray(ref);
        }
    ])
    .service('dataService', ['$firebaseObject', function($firebaseObject) {
        return {
            connectFireBase: function() {
                var ref = new Firebase("https://quickfriend.firebaseio.com/");
                // download the data into a local object
                var syncObject = $firebaseObject(ref);
                return syncObject;
            },
            getAllUsers: function() {

            },
            getUserById: function(userId) {

            }
        }
    }]);