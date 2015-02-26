'use strict';

angular
    .module('kodomo.kideosApp.controllers.header', [])
    .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'screenSize',
                function($rootScope, $scope, $state, screenSize) {

        $scope.placeholder =  screenSize.is('xs') ? 'Search' : 'Search all Kideos';
        $scope.searchValue = '';
        $scope.search = function(){
            $state.go('layout.search', {search: $scope.searchValue, page: 1}, {reload: true});
        };

    }]);
