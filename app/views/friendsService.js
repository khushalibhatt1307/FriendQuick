angular.module('friendQuick.friends')

    .service('friendsService', ['userSession', function(userSession) {
        return {
            getFriend: function(userId) {

            },
            addFriend: function(user) {
                var friendUserId = user.id;
                var currentUserId = userSession.uid;
                var fb = new Firebase("https://friendquick.firebaseio.com/friends");
                var currentUserRef  = fb.child (currentUserId);
                var friendObj = {};
                friendObj[friendUserId] = true;
                currentUserRef.update(friendObj, function(error) {
                    if(error) {
                        alert('Error while adding friend: ' + error);
                    }
                });
                var friendUserRef  = fb.child (friendUserId);
                var userObj = {};
                userObj[currentUserId] = true;
                friendUserRef.update(userObj, function(error) {
                    if(error) {
                        alert('Error while adding friend: ' + error);
                    }
                });
                user.isFriend = true;
                user.isBlockedFriend = false;
            },

            blockFriend: function(user) {
                var friendUserId = user.id;
                var currentUserId = userSession.uid;
                var fb = new Firebase("https://friendquick.firebaseio.com/friends");
                var currentUserRef  = fb.child (currentUserId);
                var friendObj = {};
                friendObj[friendUserId] = false;
                currentUserRef.update(friendObj, function(error) {
                    if(error) {
                        alert('Error while blocking friend: ' + error);
                    }
                });
                user.isFriend = true;
                user.isBlockedFriend = true;
            },

            unBlockFriend: function(user) {
                var friendUserId = user.id;
                var currentUserId = userSession.uid;
                var fb = new Firebase("https://friendquick.firebaseio.com/friends");
                var currentUserRef  = fb.child (currentUserId);
                var friendObj = {};
                friendObj[friendUserId] = true;
                currentUserRef.update(friendObj, function(error) {
                    if(error) {
                        alert('Error while unblocking friend: ' + error);
                    }
                });
                user.isFriend = true;
                user.isBlockedFriend = false;
            },

            removeFriend: function(user) {
                var friendUserId = user.id;
                var currentUserId = userSession.uid;
                var allFriends = {};
                var fb = new Firebase("https://friendquick.firebaseio.com/friends");
                var currentUserRef = fb.child (currentUserId);
                currentUserRef.once('value', function(userSnapshot) {
                    allFriends = userSnapshot.val();
                    delete allFriends[friendUserId];
                    currentUserRef.set(allFriends, function(error) {
                        if(error) {
                            alert('Error while removing friend: ' + error);
                        }
                    });
                });

                var fb2 = new Firebase("https://friendquick.firebaseio.com/friends");

                var friendUserRef = fb2.child (friendUserId);
                friendUserRef.once('value', function(userSnapshot) {
                    allFriends = userSnapshot.val();
                    delete allFriends[currentUserId];
                    friendUserRef.set(allFriends, function(error) {
                        if(error) {
                            alert('Error while removing friend: ' + error);
                        }
                    });
                });
                user.isFriend = false;
                user.isBlockedFriend = false;
            }
        }
    }]);