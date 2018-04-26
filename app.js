angular
    .module('app', []);

angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', '$http'];

function MainController($scope, $http) {
    var es = new EventSource("http://localhost:8080/");

    $scope.test = '';
    $scope.output = '';

    function getData() {
        return $http.get('http://localhost:3000/stuff');
    }

    function getMoreData() {
        return $http.get('http://localhost:3000/stufftwo');
    }

    function activate() {
        return getData().then(function (resp) {
            console.log('what is the response?');
            console.log(resp);
        })
    }

    function activate2() {
        return getData().then(function (resp) {
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