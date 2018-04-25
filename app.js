angular
    .module('app', []);

angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['$scope'];

function MainController($scope) {
    var es = new EventSource("http://localhost:8080/");

    $scope.test = '';

    es.onmessage = function (event) {
        $scope.$emit('event-start');
        console.log(event.data);
        $scope.test += event.data;
    };

    $scope.customfunction = function () {
        $scope.$emit('event-start');
    }

    $scope.$on('event-start', function (event, args) {
        console.log('I have been sent!');
    })
}