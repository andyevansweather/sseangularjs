(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'dataService'];

    function MainController($scope, dataService) {
        var es = new EventSource("http://localhost:3000/stream");

        $scope.test = '';
        $scope.output = '';

        function activate() {
            console.log('what is data var?');
            console.log(dataService.testVar);
            return dataService.getData().then(function (resp) {
                console.log('what is the response?');
                console.log(resp);
            })
        }

        function activate2() {
            return dataService.getMoreData().then(function (resp) {
                console.log('what is the response?');
                console.log(resp);
            })
        }

        es.onmessage = function (event) {
            $scope.$emit('event-start');
            console.log(event.data);
            $scope.test += event.data;
        };

        $scope.customfunction = function () {
            $scope.$emit('event-start');
        }

        $scope.getMoreData = activate;
        $scope.getMoreDataTwo = activate2;

        $scope.$on('event-start', function (event, args) {
            console.log('I have been sent!');
        })
    }
})();