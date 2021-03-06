/**
 * Created by Ashwini on 4/18/2015.
 */
'use strict';

angular.module('friendQuick.profile', [])

//If it is own profile edit, submit, upload photo button are enabled but if it is just view profile are buttons should be disabled.
.controller('addProfileCtrl', ["$scope", "$rootScope", 'Log_in_out', "userSession", "$firebaseArray", function($scope, $rootScope, Log_in_out, userSession,$firebaseArray ) {
        // .controller('addProfileCtrl', ['$scope', function($scope) {
        // $scope.addProfile = function() {
        //$scope.master = {};
        $scope.visibleSubmit = true;
        $scope.visibleReset = true;
        $scope.disableEdit  = false;
        console.log (userSession.uid);
         function getPicture (onSuccess, onFail) {
            var input = document.createElement('input');
            input.type = 'file';
             console.log( "I am in getpicture function");
            input.addEventListener('change', function (evt) {

                var files = evt.target.files;

                if (files.length < 1)
                    onFail('Error loading file');

                var fileToLoad = files[0];
                var fileReader = new FileReader();

                fileReader.onload = function (fileLoadedEvent) {
                    var data = fileLoadedEvent.target.result;
                    onSuccess(data.split(',')[1]);

                }

                fileReader.readAsDataURL(fileToLoad);

            });
             input.click();
        }

        $scope.uploadFile = function() {

            $scope.newReportImageData = null;

            var onSuccess = function(imageData) {
                //console.log(imageData);
                console.log( "I am in upload function");
                $scope.newProfileImageData = "data:image/jpeg;base64," + imageData;
                $scope.$apply();
            }

            var onFail = function(message) {
                alert('Failed because: ' + message);
            }

            //getPicture(onSuccess, onFail, { quality: 25, targetWidth: 1000});
            getPicture(onSuccess, onFail, { quality: 50, targetWidth: 1000});
                //destinationType: Camera.DestinationType.DATA_URL
       // });
        };

       // $scope.uploadFile();
        //enable edits
        $scope.editProfile = function() {
            $scope.disableEdit   = false;
            $scope.visibleSubmit = true;
            $scope.visibleReset  = true;
            console.log ("I am in editProfile function");
        };
        $scope.editProfile();

        function init() {
               //Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
                var userId =userSession.uid;
                var FirebaseURL ="https://friendquick.firebaseio.com/";
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
                    $scope.visibleSubmit = false;
                    $scope.visibleReset = false;
                    $scope.disableEdit = true;
                    $scope.user.City = userId_got.city;
                    $scope.user.Country = userId_got.country;
                    $scope.user.Interests = userId_got.interest;
                    $scope.user.State = userId_got.state  ;
                    $scope.user.Street = userId_got.street ;
                    $scope.user.Zip = userId_got.zip;
                    $scope.user.Name = userId_got.name;
                    $scope.newProfileImageData =userId_got.profilePhoto;
                } else {
                    //console.log("I am in else");
                    $scope.visibleSubmit = true;
                    $scope.visibleReset = true;
                    $scope.disableEdit = false;
                    $scope.user.City = "Your City";
                    $scope.user.Country = "Your Country";
                    $scope.user.Interests = "Your Interests";
                    $scope.user.State = "Your State";
                    $scope.user.Street = "Your Street";
                    $scope.user.Zip = "Your ZIP";
                    $scope.user.Name = "Your Name";
                    $scope.newProfileImageData =null;
                }
            });
        }
        init();

       //Update form
       $scope.update = function(user) {

           $scope.master = angular.copy(user);
           console.log($scope.user.Name);

           var ref = new Firebase("https://friendquick.firebaseio.com/");
           var userId = userSession.uid;
           var root = "users/";
           var usersRef  = ref.child (root.concat(userId));
           var Interests  = $scope.user.Interests;
           var Street    = $scope.user.Street;
           var City      = $scope.user.City;
           var State     = $scope.user.State;
           var Country   = $scope.user.Country;
           var Zip       = $scope.user.Zip;
           var imageData = $scope.newProfileImageData;
           usersRef.set({
                   name     : $scope.user.Name,
                   interest : Interests,
                   street   : Street,
                   city     : City,
                   state    : State,
                   country  : Country,
                   zip      : Zip,
                   profilePhoto : imageData
               },
               function(error) {
                   if (error) {
                       alert("Data could not be saved." + error);
                   } else {
                       alert("Data saved successfully.");
                   }
               });

           $scope.visibleSubmit = false;
           $scope.visibleReset = false;
           $scope.disableEdit = true;
      };
        //RESET FORM FUNCTION
        $scope.resetForm = function() {
            $scope.master = {};
            $scope.user = angular.copy($scope.master);
        };
        $scope.resetForm();

}]);


