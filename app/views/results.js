/**
 * Created by Khushali.
 */

angular.module('friendQuick.results', [])

    .controller('resultsController', ['$scope', '$route', '$http', 'userData', function($scope, $route, $http, userData) {

        $scope.zipCode = $route.current.params.zipCode;
        $scope.radius = $route.current.params.radius;
        $scope.interest = $route.current.params.interest;

        //var url = "http://api.geosvc.com/rest/001/" + $scope.zipCode + "/nearby?apikey=8140b794e1604694ac6006a6395f6527&d=5&pt=postalcode";
        //var url = 'http://www.zipcodeapi.com/rest/aFwqTj2BsiFtYMLkZaV6eCM6MU3JOhtYWZpQjsrMK6fJT04Sb0ZqCLwpGA8uRBtN/radius.json/' + $scope.zipCode + '/' + $scope.radius + '/mile';
        //var url = 'https://www.zipwise.com/webservices/radius.php?key=yjauvgnvb9vezic0&zip=' + $scope.zipCode + '&radius=5&format=json';
        //var url = 'https://www.zipwise.com/webservices/radius.php?key=mja67y4fgh6eq3js&zip=' + $scope.zipCode + '&radius=' + $scope.radius +'&format=json';
        var url = 'https://www.zipwise.com/webservices/radius.php?key=ocbiqg8jrlimb1rz&zip=' + $scope.zipCode + '&radius=' + $scope.radius +'&format=json';


        $http.get(url).
            success(function (data, status, header, config) {
                if(data.results.error) {
                    alert(data.results.error);
                    return;
                }
                var allAreasWithinRadius = data.results;
                /*var allZipCodesWithinRadius = [];
                for(var i=0; i<allAreasWithinRadius.length; i++) {
                    allZipCodesWithinRadius.push(allAreasWithinRadius[i].zip);
                }*/

                var usersByInterests = userData.getUserByInterests($scope.interest);
                usersByInterests.$loaded(function() {
                    var filteredUsers = [];
                    angular.forEach(usersByInterests, function (user) {
                        /*var distance = $scope.isZipCodeWithingRadius(user.Zip, allAreasWithinRadius);
                         if (distance !== -1) {
                             user.distance = distance;
                             filteredUsers.push(user);
                         }*/

                        for(var i=0; i<allAreasWithinRadius.length; i++) {
                            if(allAreasWithinRadius[i].zip === String(user.Zip)) {
                                user.distance = allAreasWithinRadius[i].distance;
                                filteredUsers.push(user);
                            }
                        }
                    });
                    //$scope.users = userData.getUserByInterests($scope.interest);
                    $scope.users = filteredUsers;
                });
            }).
            error(function (data, status, header, config) {
                alert('Error fetching zip codes within radius');
            });

        $scope.isZipCodeWithingRadius = function(zipCode, allAreasWithinRadius) {
            for(var i=0; i<allAreasWithinRadius.length; i++) {
                if(allAreasWithinRadius[i].zip === String(zipCode)) {
                    return allAreasWithinRadius[i].distance;
                } else return -1;
            }
            /*if(allZipCodesWithinRadius.indexOf(zipCode) != -1) {
                return true;
            } else {
                return false;
            }*/
        };


    }])
    .factory('userData', ['$firebaseArray', function($firebaseArray) {
        return{
            getUserByInterests:function(userInterest){
                // create a reference to the Firebase where we will store our data
                var ref = new Firebase("https://quickfriend.firebaseio.com/users");

                // create a query finding user key based on entered interest
                var query = ref.orderByChild("Interests").equalTo(userInterest);
                // the $firebaseArray service properly handles Firebase queries as well
                return $firebaseArray(query);
            }
        }
    }])

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