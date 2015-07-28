/**
 * Created by Khushali.
 */

angular.module('friendQuick.results', [])

    .controller('resultsController', ['$scope', '$route', '$http', 'userData', '$timeout', 'userSession', 'friendsService',
        function($scope, $route, $http, userData, $timeout, userSession, friendsService) {

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
                //var allAreasWithinRadius  = [{"zip":"94536","city":"Fremont","state":"CA","distance":"0.0"},{"zip":"94537","city":"Fremont","state":"CA","distance":"1.6"},{"zip":"94587","city":"Union City","state":"CA","distance":"3.9"},{"zip":"94538","city":"Fremont","state":"CA","distance":"4.0"},{"zip":"94560","city":"Newark","state":"CA","distance":"4.5"},{"zip":"94555","city":"Fremont","state":"CA","distance":"4.9"}]

                // get reference to firebase
                var fb = new Firebase("https://friendquick.firebaseio.com/users");
                var friendsFB = new Firebase("https://friendquick.firebaseio.com/friends");

                // get all user ids which interest matches
                var userIdsByInterestQuery = fb.orderByChild('interest').equalTo($scope.interest);
                var filteredUsers = [];

                userIdsByInterestQuery.on('value', function(userIdsByInterestSnapShot) {
                    userIdsByInterestSnapShot.forEach(function(userIdByInterest) {
                        var user = userIdByInterest.val();
                        user.id = userIdByInterest.key();

                        if (user.id !== userSession.uid) { // don't show current logged in user
                            friendsFB.child(userSession.uid + '/' + user.id).once('value', function (friendsSnapshot) {
                                if (friendsSnapshot.val() !== undefined && friendsSnapshot.val() === true) {
                                    user.isFriend = true;
                                    user.isBlockedFriend = false;
                                    // block friend

                                } else if (friendsSnapshot.val() !== undefined && friendsSnapshot.val() === false) {
                                    user.isFriend = true;
                                    user.isBlockedFriend = true;
                                    // unblock friend

                                } else if(friendsSnapshot.val() === undefined) {
                                    user.isBlockedFriend = false;
                                    user.isFriend = false;
                                    // add friend
                                }
                                for (var i = 0; i < allAreasWithinRadius.length; i++) {
                                    if (allAreasWithinRadius[i].zip === String(user.zip)) {
                                        user.distance = allAreasWithinRadius[i].distance;
                                    }
                                }
                                filteredUsers.push(user);
                                $timeout(function() {
                                    $scope.users = filteredUsers;
                                });

                            });

                        }
                    });
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

        $scope.addFriend = function(user) {
            friendsService.addFriend(user);
        };

        $scope.blockFriend = function(user) {
            friendsService.blockFriend(user);
        };

        $scope.unBlockFriend = function(user) {
            friendsService.unBlockFriend(user);
        };

        $scope.removeFriend = function(user) {
            friendsService.removeFriend(user);
        }

    }])

    .factory('userData', ['$firebaseArray', function($firebaseArray) {
        function extend(base) {
            var parts = Array.prototype.slice.call(arguments, 1);
            parts.forEach(function (p) {
                if (p && typeof (p) === 'object') {
                    for (var k in p) {
                        if (p.hasOwnProperty(k)) {
                            base[k] = p[k];
                        }
                    }
                }
            });
            return base;
        }
        return{
            // get all user ids of particular interest
            // for each result of user, get user o
            getUsersByInterests:function(userInterest){
                // create a reference to the Firebase where we will store our data
                var ref = new Firebase("https://friendquick.firebaseio.com/users");

                // create a query finding user key based on entered interest
                var query = ref.orderByChild("interest").equalTo(userInterest);
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