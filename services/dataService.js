(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
        var dataService = {
            testVar: 'testvbar',

            getData: getData,
            getMoreData: getMoreData
        };
        return dataService;

        function getData() {
            return $http.get('http://localhost:3000/stuff');
        }

        function getMoreData() {
            return $http.get('http://localhost:3000/stufftwo');
        }
    }
})();
