/**
 * Created by Khushali.
 */

angular.module('friendQuick.search', [])

    .controller('searchController', ['$scope', 'geoLocationService', '$http', 'dataService', 'userData', '$location',
            function($scope, geoLocationService, $http, dataService, userData, $location) {
        $scope.setMyCurrentLocation = false;
        $scope.setMyCurrentLocationClick = function() {
            var zipCode;
            if($scope.setMyCurrentLocation) {
                geoLocationService.getZipCodeFromGeoLocation().then(function (postalCode) {
                    $scope.zipCode = postalCode;
                }, function(error) {
                    alert('Error: ' + error);
                });
            } else {
                $scope.zipCode = '';
            }
        };
        $scope.searchBtnClick = function() {
            $location.search('zipCode', $scope.zipCode);
            $location.search('radius', $scope.radius);
            $location.path('/results');
        };

    }])
    .service('geoLocationService', ['$q', function($q) {
        return {
            getZipCodeFromGeoLocation: function() {
                var deferred = $q.defer();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position)    {
                       //get zip code from latitude and longitude
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        var geocoder = new google.maps.Geocoder();
                        var postalCode;
                        var zipCodeFound = false;
                        geocoder.geocode({'latLng': latlng}, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                for (var i = 0; i < results.length && !zipCodeFound; i++) {
                                    var result = results[i];
                                    for (var j = 0; j < result.address_components.length && !zipCodeFound; j++) {
                                        var address_component = result.address_components[j];
                                        for (var k = 0; k < address_component.types.length && !zipCodeFound; k++) {
                                            var address_type = address_component.types;
                                            if(address_type[k] === 'postal_code') {
                                                postalCode = address_component.long_name;
                                                zipCodeFound = true;
                                            }
                                        }
                                    }
                                }
                                if(zipCodeFound) {
                                    deferred.resolve(postalCode);
                                } else {
                                    deferred.reject('no postal code found from geo location.');
                                }
                            } else {
                                deferred.reject('geo location is not available');
                            }
                        });
                    }, function() {
                        deferred.reject('geo location is not available');
                    });
                } else {
                    deferred.reject('geo location is not available');
                }
                return deferred.promise;
            }
        };
    }]);

