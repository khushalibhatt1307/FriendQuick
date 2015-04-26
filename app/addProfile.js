/**
 * Created by Ashwini on 4/18/2015.
 */
'use strict';

angular.module("myApp", ["ngRoute", "firebase" ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addProfile', {
            templateUrl: 'addProfile.html',
            controller: 'addProfileCtrl'
        });
    }])


.controller('addProfileCtrl', ["$scope", function($scope, $firebase) {
       // .controller('addProfileCtrl', ['$scope', function($scope) {
   // $scope.addProfile = function() {
        //$scope.master = {};
        //Initialization
        $scope.init = function() {
            //if ($routeParams.Id) {
            //if (true) {
                //get an existing object
                var ref = new Firebase("https://quickfriend.firebaseio.com/");
                var usersRef = ref.child("users/Hrishi");
                usersRef.once("value", function(snapshot) {
                    //console.log(snapshot.val());
                   // alert("Data loaded successfully.");
                    var val = snapshot.val();
                    console.log(val.Interests);
                    $scope.user.Interests = val.Interests;
                    $scope.user.Street = val.Street;
                    $scope.user.City = val.City;
                    $scope.user.State = val.State;
                    $scope.user.Country = val.Country;
                    $scope.user.Zip   = val.Zipcode;
                    $scope.user.Name = "Hrishi";
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

          //  } else {
                //create a new object
          //      $scope.master = {};
         //   }
          //  $scope.isSaving = false;
        }
        $scope.init();
         alert("Init called successfully.");
       //Update form
       $scope.update = function(user) {
           $scope.master = angular.copy(user);
           console.log($scope.user.Name);

           var ref = new Firebase("https://quickfriend.firebaseio.com/");
           var userName = $scope.user.Name;
           var root = "users/";
           var usersRef  = ref.child (root.concat(userName));
           var Interests  = $scope.user.Interests;
           var Street    = $scope.user.Street;
           var City      = $scope.user.City;
           var State      = $scope.user.State;
           var Country   = $scope.user.Country;
           var Zip   = $scope.user.Zip;
           usersRef.set({
                //userName : {
                   Interests: Interests,
                   Street  : Street,
                   City    : City,
                   State   : State,
                   Country : Country,
                   Zipcode :Zip
                   // }
               },
               function(error) {
                   if (error) {
                       //alert("Data could not be saved." + error);
                   } else {
                      // alert("Data saved successfully.");
                   }
               });
      };
        //RESET FORM FUNCTION
        $scope.resetForm = function() {
            $scope.master = {};
            $scope.user = angular.copy($scope.master);
        };
        $scope.resetForm();

        //console.log($scope.name);
        var ref = new Firebase("https://quickfriend.firebaseio.com/");
        //var usersRef = ref.child("users/");
        //var usersRef = ref.child("users/Ashwini_Nalage");
        //////////////////Record Save //////////////////////////
        //var userName = $scope.user.Name;
/*
       usersRef.set({
           // $userName : {
              // {
                Interest: "Swimming",
                Street  : " 160 Locksunart way",
                City: "Sunnyvale",
                Country: "USA",
                Zipcode:"94087"
              //  }
            },
            function(error) {
            if (error) {
                alert("Data could not be saved." + error);
            } else {
                alert("Data saved successfully.");
            }
        });  */
     // newUserRef is push ID
     /* var newUserRef =  usersRef.push({
                Chandra_Nalage: {
                    Interest: "Swimming",
                    Street  : " 160 Locksunart way",
                    City: "Sunnyvale",
                    Country: "USA",
                    Zipcode:"94087"
                }
            },
            function(error) {
                if (error) {
                    alert("Data could not be saved." + error);
                } else {
                    alert("Data saved successfully.");
                }
            });
        //get the unique ID generated by push
        var postID = newUserRef.key();
        console.log(postID); */

        /////////////////////Record update///////////////////////////
       /*var usersRef = ref.child("users/Ashwini_Nalage");
        usersRef.update({
            Zipcode:"94089"
        }); */

         /////////////////////Read Existing Records/////////////////////////////////////
        // Get a reference to our posts
        //var ref = new Firebase("https://quickfriend.firebaseio.com/");
       // Attach an asynchronous callback to read the data at our posts reference
        var usersRef = ref.child("users/Ashwini_Nalage");
        usersRef.once("value", function(snapshot) {
            console.log(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

       /* ref.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        }); */

       // var usersRef = ref.child("users");
       // var fredFirstNameRef = fredRef.child('users/Chandra_Nalage');
       // var path = fredFirstNameRef.toString();
        //ref.orderByChild("User").on("child_added", function(snapshot) {
        //   console.log(snapshot.key() + " was " + snapshot.val().City + "");
        //});

    //}
}]);


