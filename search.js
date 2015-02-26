'use strict';

angular
    .module('kodomo.kideosApp.controllers.search', [])
    .controller('SearchCtrl', ['$rootScope', '$scope', '$state', '$stateParams','films', '$sce',
                function($rootScope, $scope, $state, $stateParams, response, $sce) {

        $scope.pagination = {
            current: parseInt($stateParams.page, 10),
            filmsPerPage: 8,
            totalFilms: 0,
            numberOfPages: 0,
            filmNumber: 0
        };

        $scope.searchString = $stateParams.search;

        $scope.highlight = function(text, search) {
            if (!search) {
                return $sce.trustAsHtml(text);
            }
            return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<strong>$&</strong>'));
        };

        $scope.films = response.data;
        $scope.pagination.totalFilms = response.headers('total');
        $scope.pagination.numberOfPages = Math.ceil($scope.pagination.totalFilms / $scope.pagination.filmsPerPage);


        $scope.nextPage = function(){
            if ($scope.pagination.current !== $scope.pagination.numberOfPages){
                $scope.pagination.current += 1;
                $state.go('layout.search', {search: $stateParams.search, page: $scope.pagination.current }, {reload: true});
            }
        };

        $scope.previousPage = function(){
            if ($scope.pagination.current !== 1){
                $scope.pagination.current -= 1;
                $state.go('layout.search', {search: $stateParams.search, page: $scope.pagination.current }, {reload: true});
            }
        };
    }]);

