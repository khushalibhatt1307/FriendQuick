/**
 * Created by Khushali on 5/18/2015.
 */

angular.module('friendQuick.friends', [])

    .controller('friendsController',
        ['$scope', '$route', '$http', 'userData', '$timeout', 'userSession', 'friendsService',
            function($scope, $route, $http, userData, $timeout, userSession, friendsService) {

        $scope.getAllFriends = function() {
            var usersFB = new Firebase("https://friendquick.firebaseio.com/users");
            var friendsFB = new Firebase("https://friendquick.firebaseio.com/friends");

            friendsFB.child(userSession.uid).on('value', function (friendsSnapshot) {
                var filteredUsers = [];
                var allFriends = friendsSnapshot.val();
                friendsSnapshot.forEach(function(friend) {
                    var friendId = friend.key();
                    usersFB.child(friendId).once('value', function (user) {
                        var userId = user.key();
                        user = user.val();
                        user.id = userId;
                        if (friend.val() !== undefined && friend.val() === true) {
                            user.isFriend = true;
                            user.isBlockedFriend = false;
                            // block friend

                        } else if (friend.val() !== undefined && friend.val() === false) {
                            user.isFriend = true;
                            user.isBlockedFriend = true;
                            // unblock friend

                        } else if(friend.val() === undefined) {
                            user.isBlockedFriend = false;
                            user.isFriend = false;
                            // add friend
                        }
                        filteredUsers.push(user);
                        $timeout(function() {
                            $scope.users = filteredUsers;
                        });
                    });
                });
            });
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
        };

        $scope.getAllFriends();
    }]);
