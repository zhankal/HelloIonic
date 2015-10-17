angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the main modal
        $scope.mainData = {};
})

.controller('SearchCtrl', function($scope, $state) {
        $scope.search = function() {
            $state.go('app.browse', {'searchText' : $scope.mainData.searchText});
        }
})

.controller('BrowseCtrl', function($scope, $stateParams, api) {
        console.log($stateParams.searchText);
        api.searchVenue($stateParams.searchText, function(data) {
            $scope.venues = data.response.venues;
        });
})

.controller('VenueCtrl', function($scope, $stateParams, api) {
        var venueId = $stateParams.venueId;
        api.getVenue(venueId, function(data) {
            $scope.venue = data.response.venue;
            if ($scope.venue.photos.groups[0]) {
                $scope.venue.thumbnail = $scope.venue.photos.groups[0].items[0].prefix + '30x30' + $scope.venue.photos.groups[0].items[0].suffix;
                $scope.venue.photo = $scope.venue.photos.groups[0].items[1].prefix + '110x110' + $scope.venue.photos.groups[0].items[1].suffix;
            }
        });
});

